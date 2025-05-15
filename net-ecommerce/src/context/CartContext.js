// import React, { createContext, useState } from "react";  // Correct import statement

// // Create CartContext
// export const CartContext = createContext();

// // CartProvider component to provide the context
// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);  // State to hold cart items
  
//   const addToCart = (product) => {
//     setCart((prevCart) => [...prevCart, product]);
//   };

//   const removeFromCart = (id) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   const updateQuantity = (id, quantity) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id ? { ...item, quantity: quantity } : item
//       )
//     );
//   };

//   const clearCart = () => {
//     setCart([]);
//   };

//   // This is a function to get the cart count
//   const getCartCount = () => {
//     return cart.reduce((total, item) => total + item.quantity, 0);
//   };

//   return (
//     <CartContext.Provider
//       value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartCount }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };




// // import React, { createContext, useState, useContext } from "react";

// // // Create CartContext
// // export const CartContext = createContext();

// // // CartProvider component
// // export const CartProvider = ({ children }) => {
// //   const [cart, setCart] = useState([]);

// //   const addToCart = (item) => {
// //     setCart((prevCart) => [...prevCart, item]);
// //   };

// //   const removeFromCart = (id) => {
// //     setCart((prevCart) => prevCart.filter((item) => item.id !== id));
// //   };

// //   const clearCart = () => {
// //     setCart([]);
// //   };

// //   const updateQuantity = (id, quantity) => {
// //     setCart((prevCart) =>
// //       prevCart.map((item) =>
// //         item.id === id ? { ...item, quantity: quantity } : item
// //       )
// //     );
// //   };

// //   // Get the total number of items in cart
// //   const getCartCount = () => {
// //     return cart.reduce((total, item) => total + item.quantity, 0);
// //   };

// //   return (
// //     <CartContext.Provider
// //       value={{
// //         cart,
// //         setCart,
// //         addToCart,
// //         removeFromCart,
// //         clearCart,
// //         updateQuantity,
// //         getCartCount,
// //       }}
// //     >
// //       {children}
// //     </CartContext.Provider>
// //   );
// // };

// // // Custom hook for using CartContext
// // export const useCart = () => useContext(CartContext);


// import { createContext, useContext, useState, useEffect } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState(() => {
//     // Load cart items from localStorage when the component mounts
//     const savedCart = localStorage.getItem("cartItems");
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   useEffect(() => {
//     // Update localStorage whenever cartItems changes
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (product) => {
//     setCartItems((prevItems) => {
//       const existingProduct = prevItems.find((item) => item.id === product.id);
//       if (existingProduct) {
//         return prevItems.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       // Add new product with quantity 1
//       return [...prevItems, { ...product, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (item) => {
//     setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
//   };

//   const incrementQuantity = (id) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const decrementQuantity = (id) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   const getTotalPrice = () => {
//     return cartItems.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );
//   };


//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         incrementQuantity,
//         decrementQuantity,
//         getTotalPrice,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   return useContext(CartContext);
// };


import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart items from localStorage when the component mounts
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Update localStorage whenever cartItems changes
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Add new product with quantity 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (item) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
  };

  const incrementQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        updateQuantity, // Ensure this function is passed in context
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
