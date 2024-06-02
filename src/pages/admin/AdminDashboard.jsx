import React, {useEffect, useState} from 'react'
import { countProductsApi, deleteProductApi, getAllProductsApi, productCreateApi } from '../../api/Api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {

  //useState
const[productName, setProductName]=useState('')
const[productPrice, setProductPrice]=useState('')
const[productCategory, setProductCategory]=useState('')
const[productDescription, setProductDescription]=useState('')
const[productImage, setProductImage]=useState(null)
const [previewImage,setPreviewImage]=useState(null)

//count useState
const [countProducts, setCountProducts]=useState(0);
const [countPendingOrders, setCountPendingOrders]=useState(0);
const [countDeliveredOrders, setCountDeliveredOrders]=useState(0);
const [countUsers, setCountUsers]=useState(0);


//for storing backend data
const [products, setProducts]=useState([])


//image upload function
const handleImageUpload=(event)=>{
    setProductImage(event.target.files[0])
    const reader= new FileReader()

    reader.onload=()=>{
        setPreviewImage(reader.result)
    }
   
        reader.readAsDataURL(event.target.files[0])
    
}

//append
const handleSubmit=()=>{
    // console.log(productName,productPrice,productCategory,productDescription)
    const formData = new FormData();
    formData.append('productName',productName)
    formData.append('productPrice',productPrice)
    formData.append('productCategory',productCategory)
    formData.append('productDescription',productDescription)
    formData.append('productImage',productImage)

    productCreateApi(formData).then(res=>{
      toast.success("Product created successfully!!!")
    }).catch(err=>{
      toast.error("Product creation failed!!!")
    })
}


//handle category change
const handleCategoryChange=(event)=>{
  setProductCategory(event.target.value);
  setProductCategory(event.target.selectedOptions[0].text);
};

useEffect(()=>{
  //call api to get all products
  getAllProductsApi().then(res=>{
    setProducts(res.data)
  }).catch(err=>{
    console.log(err)
  })

  countProductsApi().then(res=>{
    setCountProducts(res.data.productCount)
    setCountPendingOrders(res.data.pendingOrdersCount)
    setCountDeliveredOrders(res.data.deliveredOrdersCount)
    setCountUsers(res.data.userCount)
  }).catch(err=>{
console.log(err)
  })

},[getAllProductsApi,countProductsApi])

//handle edit page route
const navigate=useNavigate()
const navigateToEditPage=(id)=>{
  navigate(`/admin/edit/${id}`)
}

//handle delete
const handleDelete=(id)=>{
  const confirmDialog=window.confirm("Are you sure you want to delete this product?")

  if(confirmDialog){
    deleteProductApi(id).then(res=>{
      window.location.reload()
      toast.success("Product deleted successfully!")
    }).catch(err=>{
      toast.error("Product deletion failed!")
    })
  }
}

  return (
    <div className='container mt-3'><div className="row row-cols-1 row-cols-md-4 g-4">
    <div className="col">
      <div class="card text-white bg-danger mb-3">
        <div class="card-header">Total products</div>
        <div class="card-body">
          <h1>{countProducts}</h1>
        </div>
      </div>
    </div>
    <div className="col">
      <div class="card text-white bg-warning mb-3">
        <div class="card-header">Total pending Orders</div>
        <div class="card-body">
          <h1>{countPendingOrders}</h1>
        </div>
      </div>
    </div>
    <div className="col">
      <div class="card text-white bg-success mb-3">
        <div class="card-header">Total delivered orders</div>
        <div class="card-body">
          <h1>{countDeliveredOrders}</h1>
        </div>
      </div>
    </div>
    <div className="col">
      <div class="card text-white bg-success mb-3">
        <div class="card-header">Total users</div>
        <div class="card-body">
          <h1>{countUsers}</h1>
        </div>
      </div>
    </div>

  </div>

        <div className='d-flex justify-content-between'>
            <h3>Admin Dashboard</h3>
            {/* <button className='btn btn-danger'>Add Product</button> */}
            {/* <!-- Button trigger modal --> */}
<button type="button" class="btn btn-danger" data-mdb-toggle="modal" data-mdb-target="#exampleModal">
 Add Product
</button>


<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Adding new product</h5>
        <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form action="">
            <label htmlFor="productName">Enter product name</label>
            <input onChange={(e)=>setProductName(e.target.value)} type="text" className='form-control'  id='productName' />

            <label htmlFor="productPrice">Enter product price</label>
            <input onChange={(e)=>setProductPrice(e.target.value)}  type="text" className='form-control'  id='productPrice' />

            {/* select dropdown */}

            <label htmlFor="productCategory">Select product Category</label>
            <select 
              className="form-select" 
              onChange={handleCategoryChange}  
            >

            <option selected>Open this select menu</option>
            <option value="1">Fashion</option>
            <option value="2">Electronics</option>
            <option value="3">Sports</option>
            </select>
            
            <label htmlFor="productDescription">Enter product description</label>
            <p>
              {productDescription}
            </p>
            <textarea onChange={(e) => setProductDescription(e.target.value)}  className='form-control' id="productDescription" rows="3"></textarea>
 

            {/* upload pic */}

            <label htmlFor="productImage">Upload product image</label>
            <input type="file" onChange={handleImageUpload} className='form-control' id='productImage' />



            {
                previewImage && <img src={previewImage} width={'200px'} height={'200px'} className='mt-2 img-fluid w-100' alt="Product Image" />
            }



        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={handleSubmit}>Add product</button>
      </div>
    </div>
  </div>
</div>
        </div>
        <table class="table mt-3">
  <thead class="table-dark">
    <tr>
        <th scope="col">Product Image</th>
        <th scope="col">Product Name</th>
        <th scope="col">Product Price</th>
        <th scope="col">Product Category</th>
        <th scope="col">Product Description</th>
        <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {
      products.map((product)=>(
        <tr>
        <td>
            <img width={70} src={product.productImage} alt="Product image" />
        </td>
        <td>{product.productName}</td>
        <td>NPR. {product.productPrice}</td>
        <td>{product.productCategory}</td>
        <td>{product.productDescription}</td>
        <td>
        <div class="btn-group" role="group" aria-label="Basic example">
         <button type="button" class="btn btn-success" onClick={()=>navigateToEditPage(product._id)}>Edit</button>
         <button type="button" class="btn btn-danger" onClick={()=>handleDelete(product._id)}>Delete</button>
         
</div>
        </td>
    </tr>
      ))
    }
  
  </tbody>
</table>
    </div>
  )
}

export default AdminDashboard