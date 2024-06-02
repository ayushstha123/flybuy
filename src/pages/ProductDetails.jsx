import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleProductsApi } from '../api/Api';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductDetails = () => {

    const {id} =useParams();

    const [product, setProduct] =useState({});
        useEffect(() =>{
            getSingleProductsApi(id).then((res) =>{
                setProduct(res.data);
            }).catch((err)=>{
                console.log(err);
            })
    }, [getSingleProductsApi])
    
    
    const[value,setValue]=useState(1);

    //increase quantity
   const increaseQuantity =() =>{
       setValue(value+1);
   }
    //decrease quantity
    const decreaseQuantity =() =>{
        if(value > 1){
            setValue(value-1);
        }
   }

   //add to cart in redux
   const dispatch =useDispatch();
   const handleAddToCart =() =>{
        const cartItem={
            productId: product._id,
            productName: product.productName,
            productPrice: product.productPrice,
            productImage: product.productImage,
            productQuantity:value,
        }
        dispatch(addToCart(cartItem))
   }


  return (
    <div className='container mt-5'>
        <div className="d-flex">
            <img className='object-cover rounded-3' height={'500px'} width={'600px'} src={product.productImage} alt="" />
            <div className='ms-3 mt-4'>
                <span className='fs-3 fw-bold'>
                    {product.productName}
                </span>
                
               <p className='fs-4'>
                     Price: NPR.{product.productPrice}
               </p>
               <p className='fs-4'>
                     Category : {product.productCategory}
               </p>
                <p className='fs-4'>
                    Description : {product.productDescription}
                </p>
                <div class="btn-group d-flex w-50 mb-3" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-outline-black" onClick={decreaseQuantity}>-</button>
                    <input type="text" className="form-control" value={value}/>
                    <button type="button" class="btn btn-outline-black"onClick={increaseQuantity}>+</button>
                </div>

       
                <button className='btn btn-primary' onClick={handleAddToCart}>Add to cart</button>

            </div>
        </div>
    </div>
  )
}

export default ProductDetails