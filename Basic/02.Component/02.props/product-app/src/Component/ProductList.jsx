import React, { useEffect, useState } from 'react'
import Product from './Product'

const ProductList = () => {
    // state : list
    const [list, setList] = useState([])

    // hook : useEffect()
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:8080/products')
                const data = await response.json();
                setList(data)   // list state를 업데이트 -> componentDidUpdate
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])
    
    return (
        <>
        <div className='conatiner'>
            <h1>상품 목록</h1>
            <div className='card-list'>
                {list.map((product, index) => (
                    // <Product product={product} key={product.id}></Product>
                    <Product product={product} key={product.id}></Product>
                ))}
            </div>
        </div>
        </>
    )
}

export default ProductList