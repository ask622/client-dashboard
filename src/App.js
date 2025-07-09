import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import LoginModal from "./components/AdminLoginModal.js";
import Navbar from "./components/Navbar";
import dashboardData from "./data/dashboardData.js";

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [location, setLocation] = useState(Object.keys(dashboardData)[0]);
  const [adminData, setAdminData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if admin is logged in on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const adminToken = localStorage.getItem('adminToken');
      const adminEmail = localStorage.getItem('adminEmail');
      const adminName = localStorage.getItem('adminName');
      
      if (adminToken && adminEmail) {
        setIsLoggedIn(true);
        setAdminData({
          email: adminEmail,
          name: adminName || 'Admin',
          token: adminToken
        });
      } else {
        setIsLoggedIn(false);
        setAdminData(null);
      }
    };

    checkAuthStatus();
  }, []);

  // Handle successful login
  const handleLoginSuccess = (loginData) => {
    // Store admin data in localStorage
    localStorage.setItem('adminToken', loginData.token);
    localStorage.setItem('adminEmail', loginData.email);
    if (loginData.name) {
      localStorage.setItem('adminName', loginData.name);
    }

    // Update state
    setIsLoggedIn(true);
    setAdminData({
      email: loginData.email,
      name: loginData.name || 'Admin',
      token: loginData.token
    });
    setShowLoginModal(false);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      // Call logout API
      await fetch('http://localhost:5000/api/v1/admin/logout', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${adminData?.token}`
        }
      });
    } catch (error) {
      console.error('Logout API error:', error);
    }

    // Clear localStorage
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminName');

    // Update state
    setIsLoggedIn(false);
    setAdminData(null);
  };

  // Handle login button click
  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setShowLoginModal(false);
  };

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        adminData={adminData}
        onLogin={handleLoginClick}
        onLogout={handleLogout}
      />
      <Dashboard
        data={dashboardData}
        location={location}
        onLocationChange={setLocation}
        isLoggedIn={isLoggedIn}
      />
      {showLoginModal && (
        <LoginModal
          onClose={handleModalClose}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}

export default App;