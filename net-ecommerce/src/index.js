// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { CartProvider } from './context/CartContext';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// index.js or App.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PayPalScriptProvider
      options={{
        "client-id": "Af-g1CjsWUKYUCm8DIuhP4Jye_R69P-N313vnMVHjn7mDHFvG4s1FbMqpm8M8AqCLaC8PjQOqCroe-1h", // Replace with your PayPal client ID
      }}
    >
      <App />
    </PayPalScriptProvider>
  </React.StrictMode>
);
