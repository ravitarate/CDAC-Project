import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BUS_SERVICE_API_BASE_URL } from '../BaseURLs/BaseURLs';


function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        `${BUS_SERVICE_API_BASE_URL}/auth/forgot-password?email=${email}`
      );
      toast.success("Password reset link sent successfully!", {
        autoClose: 5000, 
        closeOnClick: true,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid Email.",
        {
          autoClose: 5000, 
          closeOnClick: true,
        }
      );
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
       
      }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '3px 6px 12px rgba(39, 119, 239, 0.64)',
          width: '40%',
          maxWidth: '100%',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '2rem',
            color: '#2c5282',
            marginBottom: '1.5rem',
          }}>Forgot Password</h1>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ textAlign: 'left', fontWeight: 'bold', color: '#2d3748' }}>Enter your email:</div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                width: '100%',
                padding: '1rem',
                border: '1px solid #cbd5e0',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                background: '#3182ce',
                color: 'white',
                padding: '0.8rem',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                width: '100%',
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} />
    </div>
  );
}

export default ForgotPassword;
