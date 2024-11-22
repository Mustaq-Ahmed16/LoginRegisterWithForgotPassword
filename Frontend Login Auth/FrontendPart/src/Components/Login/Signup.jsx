// Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './Signup.css';
import axiosIns from '../../api/axiosIns';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    address: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    password: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(''); // Success or error message
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === 'password') validatePassword(value);
    if (name === 'phone') validatePhone(value);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.',
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
      return true;
    }
  };

  const validatePhone = (phone) => {
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: 'Phone number must be exactly 10 digits.',
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
      return true;
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const isPasswordValid = validatePassword(formData.password);
    const isPhoneValid = validatePhone(formData.phone);

    if (isPasswordValid && isPhoneValid) {
      setLoading(true); // Show loading spinner
      setMessage(''); // Clear previous messages

      try {
        const response = await axiosIns.post('/auth/signup', formData); // Replace with your actual backend URL
        setLoading(false);
        setMessage(response.data.message); // Success message
        if (response.data.message === "User registered successfully.") {
          navigate('/auth/portfolio'); // Navigate to portfolio after successful registration
        }
      } catch (error) {
        setLoading(false);
        setMessage(error.response?.data?.message || 'Something went wrong!'); // Show error message
      }
    } else {
      alert('Please fix the errors before submitting.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h2>SafeCryptoStocks</h2>
        <h3>Sign Up</h3>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <span className="icon">📧</span>
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="icon">🔒</span>
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <div className="input-group">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <span className="icon">👤</span>
          </div>
          <div className="input-group">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <span className="icon">🏠</span>
          </div>
          <div className="input-group">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <span className="icon">📞</span>
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>

          {loading && <div className="loading-spinner">Loading...</div>} {/* Show loading spinner */}

          <button type="submit" className="register-button">Register</button>

          {message && <p className="message">{message}</p>} {/* Display success/error message */}

          <p>
            Already have an account? <Link to="/auth/login" className="login-link">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
