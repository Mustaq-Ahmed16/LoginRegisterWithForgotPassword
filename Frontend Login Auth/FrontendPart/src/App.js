// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../src/Components/Login/Login';
import Signup from '../src/Components/Login/Signup';
import Portfolio from './Components/PortMgmt/Portfolio';
import ForgotPassword from './Components/Login/ForgotPassword';
import OTPVerification from './Components/Login/OTPVerification';
import ResetPassword from './Components/Login/ResetPassword';
import ProtectedRoute from './Components/Login/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route
          path="/auth/portfolio"
          element={
            <ProtectedRoute>
              <Portfolio />
            </ProtectedRoute>
          }
        />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/otp-verification" element={<OTPVerification />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />

      </Routes>
    </Router>
  );
};

export default App;
