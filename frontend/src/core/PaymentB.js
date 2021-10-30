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
            amount = amount + parseFloat(product.price);
        })
        return amount;
    }

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
                            <button className="btn btn-block btn-success">Buy</button>
                        </div>
                    ) : (<h3>Please Login or add items to cart.</h3>)
                }
            </div>
        )
    }

  return (
    <div>
      <h1>PaymentB</h1>
      <h3>Ammount is {getAmmount(products)}</h3>
      {showDropIn()}
    </div>
  )
}

export default PaymentB
