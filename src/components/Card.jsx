import React from 'react'
const Card = ({product}) => {  //props
    return (
        <div class="card">
            <img src={product.productImage}class="card-img-top object-cover" alt="Hollywood Sign on The Hill" width={'100px'} height={'220px'} />
            <div class="card-body">
                <div className="d-flex justify-content-between">
                    <h5 class="card-title text-black">{product.productName}</h5>
                    <h5 class="card-title text-black">NPR.{product.productPrice}</h5>
                </div>
                <hr />
                <p className="text-black">
                   {product.productDescription.slice(0,30)}
                </p>
                <button className="btn w-100 btn-outline-black">
                    View more
                </button>
            </div>
        </div>
    )
}

export default Card