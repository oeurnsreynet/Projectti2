// src/pages/Checkout.js
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../page/Footer";
import { useCart } from "../context/CartContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "../page/Style/Checkout.css";
import axios from "axios";

function Checkout() {
  const { cartItems, clearCart, getTotalPrice } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    note: "",
    paymentMethod: "paypal",
  });

  const [order, setOrder] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 5.0;
  const total = subtotal + shipping;

  // const orderId = "ORD" + Date.now();
  // const orderDate = new Date().toISOString().slice(0, 10);

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const processes = async () => {

    try{
      const orderData = {
        ...order,
        subtotal: subtotal,
        total: total,
        shipping: shipping,
      };
      // console.log("Order Data:", orderData);
      // return;
      const orderResponse = await axios.post(`http://127.0.0.1:8000/api/orders/order`, orderData);
      let order_items = "";
      console.log("Order Response:", orderResponse.data.id);
      await cartItems.forEach((item) => {
       order_items = {
         ...orderItems,
        order_id: orderResponse.data.id,
        product_id: item.id,
        quantity: item.quantity,
        price: (item.price * item.quantity),
       };
       console.log(order_items);
       axios.post(`http://127.0.0.1:8000/api/order-items/`, order_items);
      });

      setTimeout(function () {
        localStorage.removeItem("cartItems");
        window.location.href = "/";
      }, 500);

    }catch (error) {
      console.error("Error submitting order:", error);
      alert("Error placing order: " + error.message);
    }

  };

  return (
    <>
      <Navbar />
      <div className="checkout-container my-5">
        <h2 className="text-center mb-4 fw-bold">Checkout</h2>

        <div className="card mb-4">
          <div className="card-header bg-primary text-white">Cart Summary</div>
          <ul className="list-group list-group-flush">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between"
              >
                <div>
                  {item.title} <br />
                  <small>Qty: {item.quantity}</small>
                </div>
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </li>
            ))}
          </ul>
        </div>

        <form className="checkout-form">
          <div className="form-row">
            <div className="form-left">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  name="name"
                  // value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  // value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <textarea
                  className="form-control"
                  name="address"
                  rows="3"
                  // value={form.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  className="form-control"
                  name="phone"
                  // value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-right">
              <div className="mb-3">
                <label className="form-label">Note</label>
                <textarea
                  className="form-control"
                  name="note"
                  rows="3"
                  // value={form.note}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Subtotal</label>
                <input
                  className="form-control"
                  value={`$${subtotal.toFixed(2)}`}
                  disabled
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Shipping</label>
                <input
                  className="form-control"
                  value={`$${shipping.toFixed(2)}`}
                  disabled
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Total</label>
                <input
                  className="form-control fw-bold text-primary"
                  value={`$${total.toFixed(2)}`}
                  disabled
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Payment Method</label>
            <div className="form-check">
              {/* <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={form.paymentMethod === "paypal"}
                onChange={handleChange}
                id="paypal"
              /> */}
              {/* <label className="form-check-label" htmlFor="paypal">
                PayPal
              </label> */}
            </div>
            <div className="form-check">
              {/* <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                value="delivery"
                checked={form.paymentMethod === "delivery"}
                onChange={handleChange}
                id="delivery"
              /> */}
              {/* <label className="form-check-label" htmlFor="delivery">
                Cash on Delivery
              </label> */}
            </div>
            {/* <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                value="mastercard"
                // checked={form.paymentMethod === "mastercard"}
                onChange={handleChange}
                id="mastercard"
              />
              <label className="form-check-label" htmlFor="mastercard">
                MasterCard
              </label>
            </div> */}
          </div>

          <>
            <PayPalScriptProvider
                  options={{
                    "client-id":
                      "AW-gMOlm-TVhoOrOJfhIzOvE9PazZQRlODpVrC0IcPT5u0Yn4XFoVqIB3sGsO4GoyS83j-D3w4HDJ61H",
                  }}
                >
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: getTotalPrice(),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        processes();
                        alert(
                          `Transaction completed by ${details.payer.name.given_name}`
                        );
                      });
                    }}
                  />
                </PayPalScriptProvider>
          </>

          {/* <button
            type="submit"
            className="btn btn-success w-100 mt-3"
            // disabled={form.paymentMethod === "paypal"}
          >
            Place Order
          </button> */}
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
