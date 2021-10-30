import React,{useState, useEffect} from 'react';
import Base from './Base';
import { loadCart } from './helper/CartHelper';
import Card from './Card';
import PaymentB from './PaymentB';


function Cart() {

  const [reload, setReload] = useState(false)
  const [products,setProducts] = useState([])

  useEffect(() => {
    setProducts(loadCart());
  }, [reload])

  const loadAllProducts = (products) => {
    return (
      <div>
        {products.map((product,index)=>{
          return <Card  key={index} product={product} addtoCart={false} removefromCart={true} reload={reload} setReload={setReload} />
        })}
      </div>
    );
  }
  const loadCheckout = () => {
    return (
      <div>
        <h1>Checkout.</h1>
      </div>
    );
  }

  return (
    <Base title="Cart" description="Checkout your orders here." >
      <div className="row text-center">
        <div className="col-6">
          {products.length ? <div><h3>Products</h3> {loadAllProducts(products)}</div>: <h3>No Products</h3>}
        </div>
        <div className="col-6">
          {products.length ? (
            <PaymentB products = {products} setReload={setReload} />
          ) : <h3>Please add some products to cart.</h3>}
        </div>
      </div>
    </Base>
  )
}

export default Cart
