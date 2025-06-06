import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';


function Navbar() {
  const { cartItems } = useCart();
    return (
        <>
        <div className="search-popup">
        <div className="search-popup-container">
          <form role="search" method="get" className="search-form" action="">
            <input
              type="search"
              id="search-form"
              className="search-field"
              placeholder="Type and press enter"
              value=""
              name="s"
            />
            <button type="submit" className="search-submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
  
          <h5 className="cat-list-title">Browse Categories</h5>
  
          <ul className="cat-list">
            <li className="cat-list-item">
              <a href="#" title="Mobile Phones">Mobile Phones</a>
            </li>
            <li className="cat-list-item">
              <a href="#" title="Smart Watches">Smart Watches</a>
            </li>
            <li className="cat-list-item">
              <a href="#" title="Headphones">Headphones</a>
            </li>
            <li className="cat-list-item">
              <a href="#" title="Accessories">Accessories</a>
            </li>
            <li className="cat-list-item">
              <a href="#" title="Monitors">Monitors</a>
            </li>
            <li className="cat-list-item">
              <a href="#" title="Speakers">Speakers</a>
            </li>
            <li className="cat-list-item">
              <a href="#" title="Memory Cards">Memory Cards</a>
            </li>
          </ul>
        </div>
      </div>
  
      <header
        id="header"
        className="site-header header-scrolled position-fixed text-black bg-light"
      >
        <nav id="header-nav" className="navbar navbar-expand-lg px-3 mb-3">
          <div className="container-fluid">
            <a className="navbar-brand" href="index.html">
              <img src="images/main-logo.png" className="logo" alt="Main Logo" />
            </a>
            <button
              className="navbar-toggler d-flex d-lg-none order-3 p-2"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#bdNavbar"
              aria-controls="bdNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <div
              className="offcanvas offcanvas-end"
              tabIndex="-1"
              id="bdNavbar"
              aria-labelledby="bdNavbarOffcanvasLabel"
            >
              <div className="offcanvas-header px-4 pb-0">
                <a className="navbar-brand" href="index.html">
                  <img src="images/main-logo.png" className="logo" alt="Main Logo" />
                </a>
                <button
                  type="button"
                  className="btn-close btn-close-black"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                  data-bs-target="#bdNavbar"
                ></button>
              </div>
              <div className="offcanvas-body">
                <ul
                  id="navbar"
                  className="navbar-nav text-uppercase justify-content-end align-items-center flex-grow-1 pe-3"
                >
                  <li className="nav-item">
                    <Link to={'/'} className="nav-link me-4 active" href="#billboard">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/'} className="nav-link me-4" href="services">Services</Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link me-4" href="#mobile-products">Phone</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link me-4" href="#smart-watches">Watch</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link me-4" href="#yearly-sale">Sale</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link me-4" href="#latest-blog">Blog</a>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link me-4 dropdown-toggle link-dark"
                      data-bs-toggle="dropdown"
                      href="#"
                      role="button"
                      aria-expanded="false"
                      >Pages</a
                    >
                    <ul className="dropdown-menu">
                      <li>
                        <Link to={'/about'} href="about.html" className="dropdown-item">About</Link>
                      </li>
                      <li>
                        <Link to={'/products'} href="blog.html" className="dropdown-item">Products</Link>
                      </li>
                      <li>
                        <Link to={'/products'} href="shop.html" className="dropdown-item">Shop</Link>
                      </li>
                      <li className="nav-item">
                    <Link to="/cart" className="nav-link">
                      <FontAwesomeIcon icon={faShoppingCart} />
                      <span className="badge bg-secondary" style={{backgroundColor: 'green'}}>{cartItems.length}</span>
                      
                    </Link>
                    
                  </li>
                      {/* <li>
                        <a href="checkout.html" className="dropdown-item">Checkout</a>
                      </li>
                      <li>
                        <a href="single-post.html" className="dropdown-item"
                          >Single Post</a
                        >
                      </li>
                      <li>
                        <a href="single-product.html" className="dropdown-item"
                          >Single Product</a
                        >
                      </li> */}
                      <li>
                        <Link to={'/contact'} href="contact.html" className="dropdown-item">Contact</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <div className="user-items ps-5">
                      <ul className="d-flex justify-content-end list-unstyled">
                        <li className="search-item pe-3">
                          <a href="#" className="search-button">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                          </a>
                        </li>
                        <li className="pe-3">
                          <a href="#">
                            <FontAwesomeIcon icon={faUser} />
                          </a>
                        </li>
                        <li>
                          <Link to={'/cart'} href="cart.html">
                            <FontAwesomeIcon icon={faShoppingCart} />
                            <span>{cartItems.length}</span>
                          {console.log(cartItems.lenght)}
                          </Link>
                          
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
        </>
        
    )
}

export default Navbar;



// import React, { useState, useContext } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMagnifyingGlass, faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
// import { Link, useNavigate } from 'react-router-dom';
// import { CartContext } from '../context/CartContext';

// function Navbar() {
//   const { cart } = useContext(CartContext);
//   const [searchOpen, setSearchOpen] = useState(false); // State to toggle search dropdown
//   const [searchQuery, setSearchQuery] = useState(''); // State for search input
//   const navigate = useNavigate();

//   const handleSearchToggle = () => {
//     setSearchOpen((prev) => !prev);
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
//       setSearchQuery('');
//       setSearchOpen(false); // Close the dropdown after search
//     }
//   };

//   return (
//     <>
//       <header className="site-header position-fixed text-black bg-light">
//         <nav className="navbar navbar-expand-lg px-3 mb-3">
//           <div className="container-fluid">
//             <Link to="/" className="navbar-brand">
//               <img src="images/main-logo.png" className="logo" alt="Main Logo" />
//             </Link>
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="offcanvas"
//               data-bs-target="#bdNavbar"
//               aria-controls="bdNavbar"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <FontAwesomeIcon icon={faMagnifyingGlass} />
//             </button>
//             <div className="offcanvas offcanvas-end" id="bdNavbar">
//               <div className="offcanvas-header">
//                 <Link to="/" className="navbar-brand">
//                   <img src="images/main-logo.png" className="logo" alt="Main Logo" />
//                 </Link>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="offcanvas"
//                   aria-label="Close"
//                 ></button>
//               </div>
//               <div className="offcanvas-body">
//                 <ul className="navbar-nav text-uppercase me-auto">
//                   <li className="nav-item">
//                     <Link to="/" className="nav-link">Home</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/about" className="nav-link">About</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/products" className="nav-link">Products</Link>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/cart" className="nav-link">
//                       <FontAwesomeIcon icon={faShoppingCart} />
//                       <span className="badge bg-secondary">{cart.length}</span>
//                     </Link>
//                   </li>
//                 </ul>
//                 <div className="position-relative">
//                   <button
//                     onClick={handleSearchToggle}
//                     className="btn btn-outline-primary d-flex align-items-center"
//                   >
//                     <FontAwesomeIcon icon={faMagnifyingGlass} />
//                   </button>
//                   {searchOpen && (
//                     <div className="dropdown-menu p-3 position-absolute top-100 start-0">
//                       <form onSubmit={handleSearchSubmit}>
//                         <div className="input-group">
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Search products..."
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                           />
//                           <button type="submit" className="btn btn-primary">
//                             <FontAwesomeIcon icon={faMagnifyingGlass} />
//                           </button>
//                         </div>
//                       </form>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </header>
//     </>
//   );
// }

// export default Navbar;

