// src/page/Contact.js

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../page/Footer';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/contacts/contact', formData); // ✅ Match with Laravel API route
      alert('Thank you for contacting us!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Submission failed. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', padding: '20px' }}>
        {/* Form Section */}
        <div style={{ flex: 1, marginTop: '100px' }}>
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ margin: '60px 0 10px 0' }}>
              <label htmlFor="name" style={{ margin: '0 38px 0 0' }}>Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{ width: '80%', padding: '8px' }}
                required
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="email" style={{ margin: '0 40px 0 0' }}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{ width: '80%', padding: '8px' }}
                required
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="message" style={{ margin: '0 20px 0 0' }}>Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                style={{ width: '80%', height: '100px', padding: '8px' }}
                required
              ></textarea>
            </div>
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>
              Submit
            </button>
          </form>
        </div>

        {/* Iframe Section */}
        <div style={{ flex: 1, maxWidth: '50%' }}>
          <h2>Our Location</h2>
          <iframe
            src="https://www.google.com/maps/embed?...your-map-url..."
            width="100%"
            height="450"
            style={{ border: '0', marginTop: '60px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
