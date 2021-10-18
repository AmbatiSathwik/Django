import React, { useState, useEffect } from 'react';
import axios from "axios";

function Home() {

    const [products, setProducts] = useState([]);
    
    useEffect(()=>{
        async function fetchProducts(){
            const { data } = await axios.get(`/api/product/`)
            setProducts(data)
        }
        fetchProducts()
    },[])

    return (
        <div>
            <h1>Home Component</h1>
            <div className="row">
                {
                    products.map( (product,index) => {
                        return(
                            <div key={index}>
                                <h3>{product.name}</h3>
                            </div>
                        )
                    } )
                }
            </div>
        </div>
    )
};

export default Home
