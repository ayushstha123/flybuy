import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getSingleProductsApi, updateProductsApi } from '../../api/Api';
import { toast } from 'react-toastify';

const AdminEditProduct = () => {

  const {id}=useParams();

  useEffect(()=>{
    getSingleProductsApi(id).then((res)=>{

      //set values
      setProductName(res.data.productName);
      setProductPrice(res.data.productPrice);
      setProductCategory(res.data.productCategory);
      setProductDescription(res.data.productDescription);
      setPreviewImage(res.data.productImage);

    }).catch((err)=>{
      console.log(err);
    })
},[id]);

    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productImage, setProductImage] = useState("");

    // for image preview
    const [previewImage, setPreviewImage] = useState("");

    // for image setting and preview
    const handleImageUpload = (event) => {
        setProductImage(event.target.files[0]);

        // // Read the image file using FileReader
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    const handleUpdate=()=>{

      const formData= new FormData();
      formData.append("productName",productName);
      formData.append("productPrice",productPrice);
      formData.append("productCategory",productCategory);
      formData.append("productDescription",productDescription);
      formData.append("productImage",productImage);

      updateProductsApi(id,formData).then((res)=>{
        toast.success("Product updated successfully");

      }).catch((err)=>{
        toast.error("Product update failed!!");
      });
    };

    return (
        <div className="container mt-2">
            <h3>Updating for<span className='text-danger'> {productName}</span></h3>
            <form className='w-50'>
                <div class="mb-3">
                    <label for="formFile" class="form-label">
                        Product Name
                    </label>
                    <input
                        onChange={(e) => setProductName(e.target.value)}
                        type="text"
                        class="form-control"
                        id="formFile"
                        placeholder="Enter Product Name"
                        value={productName}
                    />

                    <label for="formFile" class="form-label mt-2">
                        Product Price
                    </label>
                    <input
                        onChange={(e) => setProductPrice(e.target.value)}
                        type="text"
                        class="form-control"
                        id="formFile"
                        placeholder="Enter Product Price"
                        value={productPrice}
                    />
                    <label for="formFile" class="form-label mt-2">
                        Product Category
                    </label>
                    <input
                        onChange={(e) => setProductCategory(e.target.value)}
                        type="text"
                        class="form-control"
                        id="formFile"
                        placeholder="Enter Product Category"
                        value={productCategory}
                    />
                    <label for="formFile" class="form-label mt-2">
                        Product Description
                    </label>
                    <textarea
                        onChange={(e) => setProductDescription(e.target.value)}
                        class="form-control"
                        id="textAreaExample"
                        rows="4"
                        placeholder='Enter product Description'
                        value={productDescription}
                    ></textarea>

                    <label for="formFile" class="form-label mt-2">
                        Product Image
                    </label>
                    <input
                        onChange={handleImageUpload}
                        type="file"
                        class="form-control"
                        id="formFile"
                        placeholder="Enter Product Image"
                    />

                    {
                        previewImage && <img src={previewImage} alt="" className="mt-2 object-cover rounded-3" height={200} width={'100%'} />
                    }
                </div>

                <button type="button" class="btn btn-primary w-100" onClick={handleUpdate}>
                    Update Product
                </button>

            </form>

        </div>
    )
}

export default AdminEditProduct