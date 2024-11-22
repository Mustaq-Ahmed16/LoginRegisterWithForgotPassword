// Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Login.css';
import axiosIns from '../../api/axiosIns';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
      setPasswordError(
        'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.'
      );
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (validatePassword(password)) {
      try {
        // Make the POST request to the backend API using axios
        const response = await axiosIns.post('/auth/login', {
          email: email,
          password: password,
        });

        // If the request is successful, extract the token from the response
        const data = response.data;

        // Store the JWT token in localStorage (or sessionStorage)
        localStorage.setItem('jwtToken', data.token);

        // Navigate to the Portfolio page after successful login
        navigate('/auth/portfolio');

      } catch (error) {
        // Handle any errors that occur during the API call
        if (error.response) {
          // The request was made and the server responded with a status code that is not in the range of 2xx
          setErrorMessage(error.response.data.message || 'Invalid credentials');
        } else if (error.request) {
          // The request was made but no response was received
          setErrorMessage('No response from the server. Please try again later.');
        } else {
          // Something happened in setting up the request
          setErrorMessage('An error occurred. Please try again later.');
        }
      }
    } else {
      // Password is invalid, prompt the user to fix the errors
      alert('Please fix the errors before submitting.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>JM CRYPTOSTOCKS</h2>
        <h3>Sign In</h3>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="icon">📧</span>
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value); // Validate password on each change
              }}
              required
            />
            <span className="icon">🔒</span>
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="login-button">Login</button>
          <p>
            <Link to="/auth/forgot-password" className="forgot-password-link">Forgot Password?</Link>
          </p>
          <p>
            Don’t have an account? <Link to="/auth/signup" className="register-link">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};



export default Login;
