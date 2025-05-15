// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { CartContext } from '../context/CartContext';
// import Navbar from '../components/Navbar';
// import Footer from '../page/Footer';
// import '../page/Style/Products.css';

// function Products() {
//   const { addToCart } = useContext(CartContext); // Access `addToCart` from context
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get('https://fakestoreapi.com/products')
//       .then((response) => {
//         setProducts(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching products:', error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <Navbar />
//       <section className="product-store padding-large">
//         <div className="container">
//           <h1 style={{marginTop:'100px'}}>All Products</h1>
//           <div className="row" style={{marginTop:'50px'}}>
//             {products.map((product) => (
//               <div className="col-md-4 col-sm-6 mb-4" key={product.id}>
//                 <div className="card h-100">
//                   <img
//                     src={product.image}
//                     className="card-img-top"
//                     alt={product.title}
//                     style={{ objectFit: 'contain', height: '200px' }}
//                   />
//                   <div className="card-body">
//                     <h5 className="card-title">{product.title}</h5>
//                     <p className="card-text">${product.price}</p>
//                     <button
//                       className="btn btn-primary"
//                       onClick={() => addToCart(product)}
//                     >
//                       Add To Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// }

// export default Products;


import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../page/Footer';
import '../page/Style/Products.css';

function Products() {
  const { addToCart } = useCart(); // Access `addToCart` from context
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <section className="product-store padding-large">
        <div className="container">
          <h1 style={{ marginTop: '100px' }}>All Products</h1>
          <div className="row" style={{ marginTop: '50px' }}>
            {products.map((product) => (
              <div className="col-md-4 col-sm-6 mb-4" key={product.id}>
                <div className="card h-100">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.title}
                    style={{ objectFit: 'contain', height: '200px' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">${product.price}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => addToCart(product)} // Add product to cart
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Products;
