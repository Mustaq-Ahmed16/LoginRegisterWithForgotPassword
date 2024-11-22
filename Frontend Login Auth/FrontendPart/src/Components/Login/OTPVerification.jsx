// OTPVerification.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OTPVerification.css';
import axiosIns from '../../api/axiosIns';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const navigate = useNavigate(); // For redirecting after OTP verification
  const validateOTP = (otp) => {
    const otpPattern = /^[0-9]{6}$/; // OTP must be exactly 6 digits
    if (!otpPattern.test(otp)) {
      setOtpError('OTP must be a 6-digit number.');
      return false;
    } else {
      setOtpError('');
      return true;
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    // Validate OTP before sending request
    if (validateOTP(otp)) {
      try {
        const email = localStorage.getItem('email');
        if (!email) {
          setOtpError('Email is missing. Please try again.');
          return;
        }

        // Send OTP verification request to the backend
        const response = await axiosIns.post('/auth/otp-verification', { email, otp });
        alert(response.data); // "OTP verified successfully" message from backend
        navigate('/auth/reset-password'); // Redirect to password reset page after success
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // OTP or email verification failed
          setOtpError('Invalid OTP. Please try again.');
        } else {
          // General error
          setOtpError('An error occurred. Please try again later.');
        }
      }
    }
  };

  return (
    <div className="otp-verification-page">
      <div className="otp-verification-container">
        <h2>OTP Verification</h2>
        <p>Enter the OTP sent to your email to verify your account.</p>
        <form onSubmit={handleVerifyOTP}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)} // Directly updating the OTP
              required
            />
            <span className="icon">🔒</span>
          </div>
          {otpError && <p className="error-message">{otpError}</p>}
          <button type="submit" className="verify-button">Verify OTP</button>
        </form>
      </div>
    </div>
  );
};
//   const validateOTP = (otp) => {
//     const otpPattern = /^[0-9]{6}$/; // OTP must be exactly 6 digits
//     if (!otpPattern.test(otp)) {
//       setOtpError('OTP must be a 6-digit number.');
//       return false;
//     } else {
//       setOtpError('');
//       return true;
//     }
//   };

//   const handleVerifyOTP = async (e) => {
//     e.preventDefault();
//     if (validateOTP(otp)) {
//       try {
//         // Send OTP verification request to the backend
//         const email = localStorage.getItem('email'); // Assuming email was stored after ForgotPassword
//         await axiosIns.post('/auth/otp-verification', { email, otp });
//         alert('OTP Verified! You can now reset your password.');
//         navigate('/auth/reset-password');
//       } catch (error) {
//         setOtpError('Invalid OTP. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className="otp-verification-page">
//       <div className="otp-verification-container">
//         <h2>OTP Verification</h2>
//         <p>Enter the OTP sent to your email to verify your account.</p>
//         <form onSubmit={handleVerifyOTP}>
//           <div className="input-group">
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => {
//                 setOtp(e.target.value);
//                 validateOTP(e.target.value); // Real-time validation
//               }}
//               required
//             />
//             <span className="icon"></span>
//           </div>
//           {otpError && <p className="error-message">{otpError}</p>}
//           <button type="submit" className="verify-button">Verify OTP</button>
//         </form>
//       </div>
//     </div>
//   );
// };

export default OTPVerification;
