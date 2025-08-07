import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './ResetPassword.css';
import { BUS_SERVICE_API_BASE_URL } from '../BaseURLs/BaseURLs';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    } else {
      toast.error('Email parameter is missing in the URL.');
    }
  }, [searchParams]);

  const handleResetPassword = async () => {
    if (!newPassword) {
      toast.error('Password is required.');
      return;
    }

    try {
      const response = await axios.post(
        `${BUS_SERVICE_API_BASE_URL}/auth/reset-password`,
        null,
        {
          params: {
            email: email,
            newPassword: newPassword,
          },
        }
      );
      toast.success(response.data, {
        autoClose: 3000,
        onClose: () => navigate('/'), // Redirect after toast
      });
    } catch (error) {
      toast.error(
        error.response?.data || 'Failed to reset the password.',
        { autoClose: 3000 }
      );
    }
  };

  return (
    <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #e3f2fd, #bbdefb)',
    }}
  >
    <ToastContainer />
    <div
      style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
        width: '400px',
        maxWidth: '100%',
        textAlign: 'center',
      }}
    >
      <h2
        style={{
          fontSize: '1.8rem',
          color: '#2c5282',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
        }}
      >
        Reset Your Password
      </h2>
      <p style={{ fontSize: '0.9rem', color: '#718096', marginBottom: '1.5rem' }}>
        Enter your new password below to reset your account.
      </p>
      <div style={{ marginBottom: '1.2rem' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#4a5568' }}>
          Email
        </label>
        <input
          type="email"
          value={email}
          readOnly
          style={{
            width: '100%',
            padding: '1rem',
            border: '1px solid #cbd5e0',
            borderRadius: '8px',
            backgroundColor: '#edf2f7',
            color: '#718096',
            cursor: 'not-allowed',
            outline: 'none',
          }}
        />
      </div>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#4a5568' }}>
          New Password
        </label>
        <input
          type="password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem',
            border: '1px solid #cbd5e0',
            borderRadius: '8px',
            outline: 'none',
            fontSize: '1rem',
          }}
        />
      </div>
      <button
        onClick={handleResetPassword}
        style={{
          width: '100%',
          padding: '0.8rem',
          background: '#3182ce',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1rem',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          transition: 'background 0.3s',
        }}
      >
        Reset Password
      </button>
    </div>
  </div>
  );
}

export default ResetPassword;
