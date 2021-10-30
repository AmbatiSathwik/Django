import React, { useState, useEffect } from 'react';
import {Redirect }from 'react-router-dom';
import { cartEmpty } from './helper/CartHelper';
import { createOrder } from './helper/OrderHelper';
import { getToken, processPayment } from './helper/PaymentHelper';
import { isAutenticated,signout } from '../auth/helper/index';
import DropIn from "braintree-web-drop-in-react";

function PaymentB({ products, reload=undefined, setReload = f => f, }) {

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: false,
        instance : {}
    })

    const userId = isAutenticated() && isAutenticated().user_details.id
    const token = isAutenticated() && isAutenticated().token

    const getPaymentToken = (userId,token) => {
        getToken(userId,token)
        .then(info => {
            if(info.error){
                setInfo({
                    ...info,
                    error : info.error
                })
                signout(()=> {
                    return <Redirect to="/signin" /> 
                })
            }else{

                const clientToken = info.clienttoken
                setInfo({ clientToken })
            }
        })
        
    }

    useEffect(() => {
        getPaymentToken(userId,token);
    },[]);

    const getAmmount = (products) => {
        let amount = 0;
        products.map(product => {
            amount = amount + parseInt(product.price);
        })
        return amount;
    }

    const onPurchase = () => {
        setInfo({...info, loading: true });
        let nonce;
        let getNonce = info.instance.requestPaymentMethod().then((data) => {
          console.log("MYDATA", data);
          nonce = data.nonce;
          const paymentData = {
            paymentMethodNonce: nonce,
            amount: getAmmount(products),
          };
          processPayment(userId, token, paymentData)
            .then((response) => {
              // console.log("POINT-1", response);
              if (response.error) {
                if (response.code == "1") {
                  console.log("PAYMENT Failed!");
                  signout(() => {
                    return <Redirect to="/" />;
                  });
                }
              } else {
                setInfo({ ...info, success: response.success, loading: false });
                console.log("PAYMENT SUCCESS");
    
                let product_names = "";
                products.forEach(function (item) {
                  product_names += item.name + ", ";
                });
    
                const orderData = {
                  products: product_names,
                  transaction_id: response.transaction.id,
                  ammount: response.transaction.amount,
                };
                createOrder(userId, token, orderData)
                  .then((response) => {
                    if (response.error) {
                      if (response.code == "1") {
                        console.log("Order Failed!");
                        signout(() => {
                          return <Redirect to="/" />;
                        });
                      }
                    } else {
                      if (response.success == true) {
                        console.log("ORDER PLACED!!");
                      }
                    }
                  })
                  .catch((error) => {
                    setInfo({ loading: false, success: false });
                    console.log("Order FAILED", error);
                  });
                cartEmpty(() => {
                  console.log("Cart Emptied");
                });
    
                setReload(!reload);
              }
            })
            .catch((error) => {
              setInfo({ loading: false, success: false });
              console.log("PAYMENT FAILED", error);
            });
        });
      };

    const showDropIn = () => {
        return(
            <div>
                {
                    info.clientToken !== null && products.length > 0 ? (
                        <div>
                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={(instance) => (info.instance = instance)}
                        >
                        </DropIn>
                           <div className="row px-2"> <button onClick={onPurchase} className="btn btn-block btn-success">Buy</button></div>
                        </div>
                    ) : (<h3>Please Login or add items to cart.</h3>)
                }
            </div>
        )
    }

  return (
    <div>
      <h1>PaymentB</h1>
      <h3>Ammount is ₹. {getAmmount(products)}</h3>
      {showDropIn()}
    </div>
  )
}

export default PaymentB
