import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useCart } from '../context/CartContext'; // Import CartContext

function Phone() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart(); // Access addToCart from context

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products/category/phone') // Fetch products in "phone" category
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading phone products...</p>;
  }

  return (
    <section id="phone-products" className="product-store position-relative padding-large no-padding-top">
      <div className="container">
        <div className="row">
          <div className="display-header d-flex justify-content-between pb-3">
            <h2 className="display-7 text-dark text-uppercase">Phones</h2>
            <div className="btn-right">
              <a href="/shop" className="btn btn-medium btn-normal text-uppercase">
                Go to Shop
              </a>
            </div>
          </div>
          <div className="swiper product-swiper">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={20}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="product-card position-relative">
                    <div className="image-holder">
                      <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="img-fluid"
                                                style={{ maxHeight: '300px', objectFit: 'contain' }}
                                            />
                    </div>
                    <div className="cart-concern position-absolute">
                      <div className="cart-button d-flex">
                        <button
                          className="btn btn-primary"
                          onClick={() => addToCart(product)}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                    <div className="card-detail d-flex justify-content-between align-items-baseline pt-3">
                      <h3 className="card-title text-uppercase">
                        <a href="#">{product.title}</a>
                      </h3>
                      <span className="item-price text-primary">${product.price}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Phone;
