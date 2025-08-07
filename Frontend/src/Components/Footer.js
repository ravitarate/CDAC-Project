import React from 'react';
import { NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
  return (
    <footer className="footer py-10" style={{ backgroundColor: 'white', color: 'black' }}>
        <div className="row" style={{margin:"5%"}}>
          <div className="col-lg-4 col-md-6 mb-4">
            <h4>About Us</h4>
            <p>
            Travel smarter and more comfortably with Quick Bus Reservation System. 
            We are committed to providing a seamless booking experience and ensuring your journey is smooth, safe, and timely. 
            Our platform offers an extensive network of routes connecting major cities and remote towns, 
            allowing you to plan your trips effortlessly.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h4>Quick Links</h4>
            <ul className="list-unstyled">
              <li>
                <NavLink to="/" className="text-black" style={{ textDecoration: 'none' }}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="text-black" style={{ textDecoration: 'none' }}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="text-black" style={{ textDecoration: 'none' }}>
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className="text-black" style={{ textDecoration: 'none' }}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h4>Contact Us</h4>
            <ul className="list-unstyled">
              <li>123 Main Street</li>
              <li>City, State, 12345</li>
              <li>Email: info@example.com</li>
              <li>Phone: +123-456-7890</li>
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="text-center mb-4">
          <a
            href="#!"
            className="btn btn-floating m-1"
            style={{ backgroundColor: '#3b5998', color: 'white' }}
            role="button"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="#!"
            className="btn btn-floating m-1"
            style={{ backgroundColor: '#55acee', color: 'white' }}
            role="button"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="#!"
            className="btn btn-floating m-1"
            style={{ backgroundColor: '#dd4b39', color: 'white' }}
            role="button"
          >
            <i className="fab fa-google"></i>
          </a>
          <a
            href="#!"
            className="btn btn-floating m-1"
            style={{ backgroundColor: '#ac2bac', color: 'white' }}
            role="button"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="#!"
            className="btn btn-floating m-1"
            style={{ backgroundColor: '#0082ca', color: 'white' }}
            role="button"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            href="#!"
            className="btn btn-floating m-1"
            style={{ backgroundColor: '#333333', color: 'white' }}
            role="button"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>

        {/* Copyright Section */}
        <div className="text-center p-3" style={{ backgroundColor: '#63a0bc' }}>
        © 2024 Copyright: Book-Bus
        </div>
    </footer>
  );
}

export default Footer;
