import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeProduct } from "../store/cartSlice";
import { createOrderApi } from "../api/Api";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart } = useSelector((state) => ({
    cart: state.cartSlice.cart,
  }));

  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingAddress, setShippingAddress] = useState("");

  const dispatch = useDispatch();

  const handleQuantityDecrease = (itemId) => {
    dispatch(decreaseQuantity({ itemId }));
  };

  const handleQuantityIncrease = (itemId) => {
    dispatch(increaseQuantity({ itemId }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeProduct({ itemId }));
  };

  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.productPrice * item.productQuantity;
    });
    setTotalAmount(total);
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [cart]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderDetails = {
      cart,
      totalAmount,
      shippingAddress,
    };

    try {
      const response = await createOrderApi(orderDetails);
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Order placement failed!");
    }
  };

  return (
    <div className="container">
      <section className="h-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12">
              <div
                className="card card-registration card-registration-2"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body p-0">
                  <div className="row g-0">
                    <div className="col-lg-8">
                      <div className="p-5">
                        <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                        <hr className="my-4" />

                        {cart.map((item) => (
                          <div
                            className="row mb-4 d-flex justify-content-between align-items-center"
                            key={item.productId}
                          >
                            <div className="col-md-2 col-lg-2 col-xl-2">
                              <img
                                src={item.productImage}
                                className="img-fluid rounded-3"
                                alt="Product"
                              />
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-3">
                              <h6 className="text-muted">{item.productName}</h6>
                              <h6 className="text-black mb-0">{item.productCategory}</h6>
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                              <button
                                className="btn btn-link px-2"
                                onClick={() => handleQuantityDecrease(item.productId)}
                              >
                                <i className="fas fa-minus"></i>
                              </button>
                              <input
                                id="form1"
                                min="0"
                                name="quantity"
                                value={item.productQuantity}
                                type="number"
                                className="form-control form-control-sm"
                                readOnly
                              />
                              <button
                                className="btn btn-link px-2"
                                onClick={() => handleQuantityIncrease(item.productId)}
                              >
                                <i className="fas fa-plus"></i>
                              </button>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                              <h6 className="mb-0">NPR. {item.productPrice}</h6>
                            </div>
                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                              <button
                                className="btn"
                                onClick={() => handleRemoveItem(item.productId)}
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </div>
                          </div>
                        ))}

                        <hr className="my-4" />
                      </div>
                    </div>
                    <div className="col-lg-4 bg-grey">
                      <div className="p-5">
                        <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                        <h6 className="text-muted">Total quantity: {cart.reduce((acc, item) => acc + item.productQuantity, 0)}</h6>
                        <h6 className="text-muted">Total price:</h6>
                        <h3 className="fw-bold">NPR. {totalAmount.toFixed(2)}</h3>
                        <hr />
                        <label htmlFor="shippingAddress">Shipping Address</label>
                        <input
                          type="text"
                          id="shippingAddress"
                          className="form-control m-0 p-0"
                          value={shippingAddress}
                          onChange={(e) => setShippingAddress(e.target.value)}
                        />
                        <button
                          onClick={handleSubmit}
                          className="btn btn-primary btn-lg btn-block mt-3"
                        >
                          Place an order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
