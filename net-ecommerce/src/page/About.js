import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';  // Ensure correct path to Navbar
import Footer from '../page/Footer';  // Ensure correct path to Footer

function About() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch sample products from the FakeStoreAPI
    fetch('https://fakestoreapi.com/products?limit=3')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      
      <section className="about-section padding-large">
        <div className="container">
          <h2 className="display-7 text-dark text-uppercase">About FakeStoreAPI</h2>
          <p>
            FakeStoreAPI is a free API for developers that provides fake data to use for testing or development.
            It contains products, users, and more, mimicking real-world scenarios to help build applications.
            You can fetch product information, categories, and other details without needing to connect to an actual database.
          </p>
          <h3 className="display-7 text-dark text-uppercase">Sample Products from FakeStoreAPI</h3>
          <div className="product-grid d-flex flex-wrap justify-content-between">
            {products.map((product) => (
              <div className="col-lg-4 col-sm-12 mb-4" key={product.id}>
                <div className="card border-none me-3">
                  <div className="card-image">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="img-fluid"
                      style={{ maxHeight: '200px', objectFit: 'contain' }}
                    />
                  </div>
                  <div className="card-body text-uppercase">
                    <h3 className="card-title">{product.title}</h3>
                    <p className="card-text">${product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
