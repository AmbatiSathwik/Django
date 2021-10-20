import React from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from 'react-router-dom';
import { addItemtoCart, remItemfromCart} from "./helper/CartHelper";


const isAutenticated = true;

const Card = ({ product, addtoCart = true, removefromCart = true }) => {

    const addToCart = () => {
        if(isAutenticated){
            addItemtoCart(product,()=>{})
            console.log("Added to Cart")
        }
        else{
            console.log("Login Please")
        }
    }

    const removeFromCart = () => {
      if(isAutenticated){
          remItemfromCart(product)
          console.log("Removed from Cart")
      }
      else{
          console.log("Login Please")
      }
    }
    
    const getRedirect = redirect => {
        if(redirect) {
            <Redirect to="/cart" />
        }
    }

    const showAdd = addtoCart => {
        return(
            addtoCart && (<button
                onClick={addToCart}
                className="btn btn-outline-success btn-block mt-2 mb-2"
              >
                Add to Cart
              </button>)
        );
    }
    const showRemove = removefromCart => {
        return(
            removefromCart && (<button
                onClick={ removeFromCart }     //()=>{console.log("removed")
                className="btn btn-outline-danger btn-block mt-2 mb-2"
              >
                Remove from Cart
              </button>)
        );
    }

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{product.name}</div>
      <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {product.description}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">
          $ {product.price}
        </p>
        <div className="row">
          {showAdd(addtoCart)}
          {showRemove(removefromCart)}
        </div>
      </div>
    </div>
  );
};

export default Card;
