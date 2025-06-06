import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../page/Footer';

function About() {
  const [abouts, setAbouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/abouts/')
      .then((response) => response.json())
      .then((data) => {
        setAbouts(data);
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
          <h2 className="display-7 text-dark text-uppercase text-center mb-5">Our Team</h2>
          <div className="d-flex flex-wrap justify-content-center gap-4">
            {abouts.map((item) => (
              <div
                key={item.id}
                className="d-flex flex-column align-items-center text-center p-3 border rounded"
                style={{ maxWidth: '400px' }}
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="img-fluid rounded mb-3"
                  style={{ maxHeight: '250px', objectFit: 'cover', width: '100%' }}
                />
                <h3 className="text-uppercase">{item.title}</h3>
                <p>{item.content}</p>
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
