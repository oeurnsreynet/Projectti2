import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../page/Footer';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    alert('Thank you for contacting us!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
    <Navbar/>
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', padding: '20px' }}>
      {/* Form Section */}
      <div style={{ flex: 1, Width: '50px' ,marginTop: '20px', marginTop: '100px'}}>
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ margin: '60px 0 10px 0' }}>
            <label htmlFor="name" style={{  margin: '0 38px 0 0' }}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: '80%',
                padding: '8px',
                boxSizing: 'border-box',
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ margin: '0 40px 0 0' }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '80%',
                padding: '8px',
                boxSizing: 'border-box',
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="message" style={{ margin: '0 20px 0 0' }}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              style={{
                width: '80%',
                height: '100px',
                padding: '8px',
                boxSizing: 'border-box',
              }}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '5px',
            }}
          >
            Submit
          </button>
        </form>
      </div>

      {/* Iframe Section */}
      <div style={{ flex: 1, maxWidth: '50%' }}>
        <h2>Our Location</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d488.59127531963844!2d104.89783360412106!3d11.571188741826894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109517388680e15%3A0x63057e6682968f5!2z4Z6c4Z634Z6R4Z-S4Z6Z4Z624Z6f4Z-S4Z6Q4Z624Z6T4Z6U4Z6F4Z-S4Z6F4Z-B4Z6A4Z6c4Z634Z6R4Z-S4Z6Z4Z624Z6A4Z6Y4Z-S4Z6W4Z674Z6H4Z62!5e0!3m2!1skm!2skh!4v1727077760832!5m2!1skm!2skh"
          width="100%"
          height="450"
          style={{ border: '0',marginTop: '60px' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
    <Footer/>
    </>
    
  );
};

export default Contact;
