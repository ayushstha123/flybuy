import React, { useEffect, useState } from "react";
import { getMyOrdersApi } from "../api/Api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getMyOrdersApi().then((res) => {
        console.log(res.data)
      setOrders(res.data.orders);
    });
  }, [getMyOrdersApi]);

  return (
    <div className="container mt-3">
      <h3>My Orders</h3>
      {
      orders.map((order) => (
        <div class="card mt-2">
          <div class="card-header d-flex justify-content-between">
            <h6>ORDER - {order.orderNumber}</h6>
            <h6>{order.orderStatus}</h6>
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
                ))}
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
  );
};

export default Orders;
