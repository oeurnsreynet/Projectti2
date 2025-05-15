import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Blog() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/category/jewelery?limit=3') // Fetch 3 products
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Blog Loading...</p>;
    }

    return (
        <section id="latest-blog" className="padding-large">
            <div className="container">
                <div className="row">
                    <div className="display-header d-flex justify-content-between pb-3">
                        <h2 className="display-7 text-dark text-uppercase">Latest Posts</h2>
                        <div className="btn-right">
                            <a
                                href="blog.html"
                                className="btn btn-medium btn-normal text-uppercase"
                            >
                                Read Blog
                            </a>
                        </div>
                    </div>
                    <div className="post-grid d-flex flex-wrap justify-content-between">
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
                                        <div className="card-meta text-muted">
                                            <span className="meta-date">Feb 22, 2023</span>
                                            <span className="meta-category">- Jewelery</span>
                                        </div>
                                        <h3 className="card-title">
                                            <a href="#">{product.title}</a>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Blog;
