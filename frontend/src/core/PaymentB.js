import React, { useState, useEffect } from 'react';
import {Redirect }from 'react-router-dom';
import { cartEmpty } from './helper/CartHelper';
import { createOrder } from './helper/OrderHelper';
import { getToken, processPayment } from './helper/PaymentHelper';
import { isAutenticated,signout } from '../auth/helper/index';
import DropIn from "braintree-web-drop-in-react";

function PaymentB({ products, reload=undefined, setReload = f => f, }) {


    
  return (
    <div>
      <h1>PaymentB</h1>
    </div>
  )
}

export default PaymentB
