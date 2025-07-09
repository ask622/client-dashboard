
import React, { useState } from 'react';

const UserIcon = () => (
  <svg className="w-5 h-5 text-white opacity-70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-8 0v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-5 h-5 text-white opacity-70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m6 4H6a2 2 0 01-2-2v-6a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2zm-6-6a2 2 0 114 0 2 2 0 01-4 0z" />
  </svg>
);

const LoginModal = ({ onClose, onLoginSuccess }) => {
  const [adminLogin, setAdminLogin] = useState({ email: '', password: '' });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginClick = async () => {
    if (!adminLogin.email || !adminLogin.password) {
      setLoginError('Please provide both email and password');
      return;
    }

    setIsLoading(true);
    setLoginError('');

    try {
      const response = await fetch('http://localhost:5000/api/v1/admin/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          email: adminLogin.email, 
          password: adminLogin.password 
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Success - store admin data and notify parent
      const adminData = {
        token: data.token,
        email: adminLogin.email,
        name: data.admin?.fullName || data.admin?.name || 'Admin',
        id: data.admin?._id,
        role: data.admin?.role
      };

      setLoginSuccess(true);
      
      // Call parent success handler
      if (onLoginSuccess) {
        onLoginSuccess(adminData);
      }

      // Auto-close modal after success message
      setTimeout(() => {
        onClose();
        setLoginSuccess(false);
      }, 1500);

    } catch (error) {
      console.error('Login error:', error);
      setLoginError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLoginClick();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div
        className="w-[350px] rounded-xl shadow-2xl overflow-hidden relative"
        style={{
          background: 'linear-gradient(to bottom right, #2e2e2e, #1a1a1a)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-6 text-white text-xl font-bold bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center z-10"
          aria-label="Close"
        >
          ×
        </button>

        {/* Mac-style bar */}
        <div className="flex items-center px-4 py-2 bg-gradient-to-b from-gray-300/60 to-gray-400/10">
          <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
          <span className="w-3 h-3 bg-yellow-300 rounded-full mr-2"></span>
          <span className="w-3 h-3 bg-green-400 rounded-full"></span>
          <span className="ml-4 text-white/70 text-sm">Admin Login</span>
        </div>

        {/* Header */}
        <div className="text-center py-6">
          <h2 className="text-white text-xl font-semibold tracking-wide">ADMIN ACCESS</h2>
          <p className="text-white/60 text-sm mt-2">Please login to continue</p>
        </div>

        {/* Form */}
        <div className="px-6 pb-6">
          {!loginSuccess ? (
            <>
              {/* Email Input */}
              <div className="relative mb-4">
                <input
                  type="email"
                  placeholder="Admin Email"
                  value={adminLogin.email}
                  onChange={(e) => setAdminLogin({ ...adminLogin, email: e.target.value })}
                  onKeyPress={handleKeyPress}
                  className="w-full py-3 pl-4 pr-10 rounded-lg bg-white/10 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                  disabled={isLoading}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <UserIcon />
                </span>
              </div>

              {/* Password Input */}
              <div className="relative mb-6">
                <input
                  type="password"
                  placeholder="Password"
                  value={adminLogin.password}
                  onChange={(e) => setAdminLogin({ ...adminLogin, password: e.target.value })}
                  onKeyPress={handleKeyPress}
                  className="w-full py-3 pl-4 pr-10 rounded-lg bg-white/10 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                  disabled={isLoading}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <LockIcon />
                </span>
              </div>

              {/* Error Message */}
              {loginError && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <p className="text-red-300 text-sm text-center">{loginError}</p>
                </div>
              )}

              {/* Login Button */}
              <button
                onClick={handleLoginClick}
                disabled={isLoading}
                className={`w-full py-3 rounded-lg font-semibold tracking-wide transition-all duration-200 ${
                  isLoading
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 active:scale-95'
                } text-white`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Logging in...
                  </div>
                ) : (
                  'LOGIN'
                )}
              </button>
            </>
          ) : (
            /* Success Message */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">Login Successful!</h3>
              <p className="text-white/60 text-sm">Redirecting to dashboard...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default LoginModal;