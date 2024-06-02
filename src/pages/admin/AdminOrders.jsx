import React, { useEffect, useState } from 'react'
import { getAllOrdersApi, updateOrderStatusApi } from '../../api/Api';
import { toast } from 'react-toastify';

const AdminOrders = () => {
        const [orders,setOrders]=useState([]);
    useEffect(()=>{
        getAllOrdersApi().then((res)=>{
            setOrders(res.data.orders);
        }).catch((err)=>{
            console.log(err);
        })
    }, []);

    const updateStatus=(id,status)=>{
        const order_status={status}
        console.log(id,order_status);
        updateOrderStatusApi(id,order_status).then((res)=>{
            toast.success(res.data.message);
            window.location.reload();
        }).catch((err)=>{
            toast.error("Order status not updated!");
        })
    }
    
    return (
        <div className="container mt-3">
            <h3>Showing all orders | For Admin!</h3>
            {
      orders.map((order) => (
        <div class="card mt-2">
          <div class="card-header d-flex justify-content-between">
            <h6>ORDER - {order.orderNumber}</h6>
            {/* <h6>{order.orderStatus}</h6> */}
            <div class="dropdown">
  <button
    class="btn btn-primary dropdown-toggle"
    type="button"
    id="dropdownMenuButton"
    data-mdb-toggle="dropdown"
    aria-expanded="false"
  >
   {order.status}
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <li><button class="dropdown-item" onClick={()=>updateStatus(order._id,'Pending')}>Pending</button></li>
    <li><button class="dropdown-item" onClick={()=>updateStatus(order._id,'Processing')}>Processing</button></li>
    <li><button class="dropdown-item" onClick={()=>updateStatus(order._id,'Delivered')}>Delivered</button></li>
  </ul>
</div>
          </div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {order.cart.map((item) => (
                  <tr>
                    <th scope="row">
                      <img src={item.productImage} alt="" width="50" />
                    </th>
                    <td>{item.productName}</td>
                    <td>{item.productCategory}</td>
                    <td>{item.productPrice}</td>
                    <td>{item.productQuantity}</td>
                  </tr>
                ))
                }
              </tbody>
            </table>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <div>
              <h6>Order Date : {order.orderedDate}</h6>
            </div>
            <div>
              <h6>Shipping info : {order.shippingAddress}</h6>
            </div>
            <div>
              <h6>Total Price : {order.totalAmount}</h6>
            </div>
          </div>
        </div>
      ))}

        </div>
    )
}

export default AdminOrders