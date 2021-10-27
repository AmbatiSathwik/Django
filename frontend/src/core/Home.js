import React, { useState, useEffect } from 'react';
import axios from "axios";
import Base from './Base';
import '../styles.css';
import Card from './Card';


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
        <Base title="Home" description="Tshirts">
            <div className="row">
                {
                    products.map( (product,index) => {
                        return(
                            <div key={index} className="col-4 mb-4">
                                <Card product={product} />
                            </div>
                        )
                    } )
                }
            </div>
        </Base>
    )
};

export default Home
