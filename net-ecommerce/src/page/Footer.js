import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css'; // Import Font Awesome styles

function Footer() {
    return (
        <>
            <footer id="footer" className="overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="footer-top-area">
                            <div className="row d-flex flex-wrap justify-content-between">
                                <div className="col-lg-3 col-sm-6 pb-3">
                                    <div className="footer-menu">
                                        <img src="images/main-logo.png" alt="logo" />
                                        <p>
                                            Nisi, purus vitae, ultrices nunc. Sit ac sit suscipit
                                            hendrerit. Gravida massa volutpat aenean odio erat nullam
                                            fringilla.
                                        </p>
                                        <div className="social-links">
                                            <ul className="d-flex list-unstyled">
                                                <li>
                                                    <a href="#" className="me-3">
                                                        <i className="fab fa-facebook fa-lg"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="me-3">
                                                        <i className="fab fa-instagram fa-lg"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="me-3">
                                                        <i className="fab fa-twitter fa-lg"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="me-3">
                                                        <i className="fab fa-youtube fa-lg"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-sm-6 pb-3">
                                    <div className="footer-menu text-uppercase">
                                        <h5 className="widget-title pb-2">Quick Links</h5>
                                        <ul className="menu-list list-unstyled text-uppercase">
                                            <li className="menu-item pb-2">
                                                <a href="#">Home</a>
                                            </li>
                                            <li className="menu-item pb-2">
                                                <a href="#">About</a>
                                            </li>
                                            <li className="menu-item pb-2">
                                                <a href="#">Shop</a>
                                            </li>
                                            <li className="menu-item pb-2">
                                                <a href="#">Blogs</a>
                                            </li>
                                            <li className="menu-item pb-2">
                                                <a href="#">Contact</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6 pb-3">
                                    <div className="footer-menu text-uppercase">
                                        <h5 className="widget-title pb-2">Help & Info</h5>
                                        <ul className="menu-list list-unstyled">
                                            <li className="menu-item pb-2">
                                                <a href="#">Track Your Order</a>
                                            </li>
                                            <li className="menu-item pb-2">
                                                <a href="#">Returns Policies</a>
                                            </li>
                                            <li className="menu-item pb-2">
                                                <a href="#">Shipping + Delivery</a>
                                            </li>
                                            <li className="menu-item pb-2">
                                                <a href="#">Contact Us</a>
                                            </li>
                                            <li className="menu-item pb-2">
                                                <a href="#">Faqs</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6 pb-3">
                                    <div className="footer-menu contact-item">
                                        <h5 className="widget-title text-uppercase pb-2">Contact Us</h5>
                                        <p>
                                            Do you have any queries or suggestions?
                                            <a href="mailto:yourinfo@gmail.com">yourinfo@gmail.com</a>
                                        </p>
                                        <p>
                                            If you need support? Just give us a call.
                                            <a href="tel:+5511122233344">+55 111 222 333 44</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </footer>
            <div id="footer-bottom">
      <div class="container">
        <div class="row d-flex flex-wrap justify-content-between">
          <div class="col-md-4 col-sm-6">
            <div class="Shipping d-flex">
              <p>We ship with:</p>
              <div class="card-wrap ps-2">
                <img src="images/dhl.png" alt="visa" />
                <img src="images/shippingcard.png" alt="mastercard" />
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-6">
            <div class="payment-method d-flex">
              <p>Payment options:</p>
              <div class="card-wrap ps-2">
                <img src="images/visa.jpg" alt="visa" />
                <img src="images/mastercard.jpg" alt="mastercard" />
                <img src="images/paypal.jpg" alt="paypal" />
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-6">
            <div class="copyright">
              <p>
                © Copyright 2023 MiniStore. Design by
                <a href="https://templatesjungle.com/">TemplatesJungle</a>
                Distribution by <a href="https://themewagon.com">ThemeWagon</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
        </>
    );
}

export default Footer;
