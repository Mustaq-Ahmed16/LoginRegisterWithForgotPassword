// ForgotPassword.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import axiosIns from '../../api/axiosIns';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false); // State to track if email is verified
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(emailValue));
    setIsEmailVerified(false); // Reset verification status if email changes
  };

  const handleVerifyEmail = async () => {
    try {
      // Save the email in localStorage
      localStorage.setItem('email', email);
      if (isEmailValid) {
        // Call the backend API to verify email and send OTP
        await axiosIns.post('/auth/forgot-password', { email });
        alert('An OTP has been sent to your email address.');
        setIsEmailVerified(true);
        navigate('/auth/otp-verification'); // Navigate to OTP verification page after success
      } else {
        setErrorMessage('Please enter a valid email address.'); // Set error message for invalid email
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to send OTP. Please try again later.'); // Handle error if API call fails
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <p>Enter your email to verify it, then receive an OTP.</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <span className="icon">📧</span>
          </div>
          {errorMessage && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}
          <div className="btn">
            <button
              type="button"
              className="verify-button"
              onClick={handleVerifyEmail}
              disabled={!isEmailValid}
            >
              Verify Email and Send OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default ForgotPassword;
