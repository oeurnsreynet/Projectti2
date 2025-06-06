import React from "react";
import { useCart } from "../context/CartContext";
import Navbar from '../components/Navbar';
import Footer from '../page/Footer';
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleQuantityChange = (e, item) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <>
      <Navbar/>
      <div className="container">
        <h2 className="mt-5">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <ul className="list-group" style={{ marginTop: '100px' }}>
              {cartItems.map((item) => (
                <li key={item.id} className="list-group-item d-flex align-items-center mb-4" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                  <img
                    src={item.image_url}
                    alt={item.title}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '20px' }}
                  />
                  <div className="d-flex flex-column" style={{ marginRight: 'auto' }}>
                    <span style={{ fontWeight: 'bold' }}>{item.title}</span>
                    <span>${item.price} x </span>
                  </div>
                  <div className="d-flex align-items-center">
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      className="form-control w-25"
                      style={{ marginRight: '10px' }}
                      onChange={(e) => handleQuantityChange(e, item)}
                    />
                    <span className="mr-3">Total: ${item.price * item.quantity}</span>
                    <button className="btn btn-sm btn-danger ml-2" onClick={() => removeFromCart(item)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
            </div>
            <button
              className="btn btn-success mt-2 ml-3"
              onClick={() => navigate("/checkout")}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
}

export default Cart;
