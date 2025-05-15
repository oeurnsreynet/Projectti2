// import React, { useState } from "react";
// import { useCart } from "../context/CartContext";
// import Navbar from "../components/Navbar";
// import Footer from "../page/Footer";
// import { PayPalButtons } from "@paypal/react-paypal-js";

// function Cart() {
//   const { cartItems, setCart, removeFromCart, clearCart, updateQuantity } = useCart();
//   const [isCheckoutPopupOpen, setIsCheckoutPopupOpen] = useState(false);

//   const fetchCartData = async () => {
//     const response = await fetch('/api/cart'); // Replace with your actual API endpoint
//     if (!response.ok) {
//       throw new Error('Failed to fetch cart data');
//     }
//     return response.json();
//   };

//   const refreshCart = async () => {
//     try {
//       // Make a request to your server to get the updated cart
//       const response = await fetch('/api/cart'); // Replace with your actual API endpoint
//       if (!response.ok) {
//         throw new Error('Failed to fetch cart data');
//       }
  
//       const data = await response.json();
//       setCart(data); // Update the cart in the client state with the fetched data
//     } catch (error) {
//       console.error('Error refreshing cart:', error);
//     }
//   };
//   const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

//   const handleQuantityChange = (e, item) => {
//     const newQuantity = parseInt(e.target.value);
//     if (newQuantity >= 1) {
//       updateQuantity(item.id, newQuantity);
//     }
//   };

//   const handlePayPalApproval = async (details) => {
//     try {
//       // Handle payment approval logic here
//       alert("Payment Successful: " + details.payer.name.given_name);
//       localStorage.clear();
//       window.location.reload();
//       // Clear the cart immediately in state
//       clearCart();
//       setCart([]); // Reset the cart state to empty
  
//       // Optionally refresh the cart data from the server (if necessary)
//       await refreshCart(); // This will fetch the updated cart data from the backend
  
//       // Close the checkout popup after payment success
//       setIsCheckoutPopupOpen(false); 
//     } catch (error) {
//       console.error('Error during PayPal payment approval:', error);
//       alert('Payment failed!');
//       setIsCheckoutPopupOpen(false); // Close the popup on error
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="container">
//         <h2>Your Cart</h2>
//         {cartItems.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <div>
//             <ul className="list-group" style={{ marginTop: '100px' }}>
//               {cartItems.map((item) => (
//                 <li key={item.id} className="list-group-item d-flex align-items-center mb-4" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '20px' }}
//                   />
//                   <div className="d-flex flex-column" style={{ marginRight: 'auto' }}>
//                     <span style={{ fontWeight: 'bold' }}>{item.title}</span>
//                     <span>${item.price} x </span>
//                   </div>
//                   <div className="d-flex align-items-center">
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       min="1"
//                       className="form-control w-25"
//                       style={{ marginRight: '10px' }}
//                       onChange={(e) => handleQuantityChange(e, item)}
//                     />
//                     <span className="mr-3">Total: ${item.price * item.quantity}</span>
//                     <button className="btn btn-sm btn-danger ml-2" onClick={() => removeFromCart(item)}>
//                       Remove
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//             <div className="mt-3">
//               <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
//             </div>
//             {/* <button className="btn btn-warning mt-2" onClick={clearCart}>
//               Clear Cart
//             </button> */}

//             <button
//               className="btn btn-success mt-2 ml-3"
//               onClick={() => setIsCheckoutPopupOpen(true)}
//               disabled={cartItems.length === 0} // Disable button if cart is empty
//             >
//               Proceed to Checkout
//             </button>

//             {isCheckoutPopupOpen && (
//               <div className="checkout-popup">
//                 <div className="popup-content">
//                   <h4>Proceed with PayPal</h4>
//                   <PayPalButtons
//                     createOrder={(data, actions) => {
//                       return actions.order.create({
//                         purchase_units: [
//                           {
//                             amount: {
//                               value: totalPrice.toFixed(2),
//                             },
//                           },
//                         ],
//                       });
//                     }}
//                     onApprove={async (data, actions) => {
//                       const details = await actions.order.capture();
//                       handlePayPalApproval(details); // Ensure cart is cleared here
//                     }}
//                     onError={(err) => {
//                       console.error("PayPal Checkout Error:", err);
//                       alert("Payment failed!");
//                       setIsCheckoutPopupOpen(false);
//                     }}
//                   />

//                   <button className="btn btn-secondary" onClick={() => setIsCheckoutPopupOpen(false)}>
//                     Close
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Cart;



import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../page/Footer";
import { PayPalButtons } from "@paypal/react-paypal-js";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart(); // Use the correct functions from context
  const [isCheckoutPopupOpen, setIsCheckoutPopupOpen] = useState(false);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleQuantityChange = (e, item) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handlePayPalApproval = async (details) => {
    try {
      alert("Payment Successful: " + details.payer.name.given_name);
      localStorage.clear();
      window.location.reload();
      // Clear the cart immediately in state
      // removeFromCart(item);
    } catch (error) {
      console.error('Error during PayPal payment approval:', error);
      alert('Payment failed!');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Your Cart</h2>
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
              onClick={() => setIsCheckoutPopupOpen(true)}
              disabled={cartItems.length === 0} // Disable button if cart is empty
            >
              Proceed to Checkout
            </button>

            {isCheckoutPopupOpen && (
              <div className="checkout-popup">
                <div className="popup-content">
                  <h4>Proceed with PayPal</h4>
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: totalPrice.toFixed(2),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      const details = await actions.order.capture();
                      handlePayPalApproval(details); // Ensure cart is cleared here
                    }}
                    onError={(err) => {
                      console.error("PayPal Checkout Error:", err);
                      alert("Payment failed!");
                      setIsCheckoutPopupOpen(false);
                    }}
                  />
                  <button className="btn btn-secondary" onClick={() => setIsCheckoutPopupOpen(false)}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
