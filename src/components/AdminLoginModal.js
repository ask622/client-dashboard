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

const LoginModal = ({ onLogin, onClose }) => {
  const [adminLogin, setAdminLogin] = useState({ email: '', password: '' });
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLoginClick = async (email, password) => {
    try {
      setLoginError('');
      const res = await fetch('http://localhost:5000/api/v1/admin/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('adminToken', data.token || 'true');
      setLoginSuccess(true);
      setTimeout(() => {
        onClose();
        setLoginSuccess(false);
      }, 1000);
    } catch (err) {
      setLoginError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div
        className="w-[350px] rounded-xl shadow-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom right, #2e2e2e, #1a1a1a)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        {/* Mac-style bar */}
        <div className="flex items-center px-4 py-2 bg-gradient-to-b from-gray-300/60 to-gray-400/10">
          <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
          <span className="w-3 h-3 bg-yellow-300 rounded-full mr-2"></span>
          <span className="w-3 h-3 bg-green-400 rounded-full"></span>
        </div>

        {/* Header */}
        <div className="text-center py-4">
          <h2 className="text-white text-xl font-semibold tracking-wide">WELCOME</h2>
        </div>

        {/* Form */}
        <div className="px-6 pb-6">
          {!loginSuccess ? (
            <>
              {/* Username */}
              <div className="relative mb-4">
                <input
                  type="email"
                  placeholder="Username"
                  value={adminLogin.email}
                  onChange={(e) => setAdminLogin({ ...adminLogin, email: e.target.value })}
                  className="w-full py-3 pl-4 pr-10 rounded-lg bg-white/10 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-blue-400"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <UserIcon />
                </span>
              </div>

              {/* Password */}
              <div className="relative mb-6">
                <input
                  type="password"
                  placeholder="*************"
                  value={adminLogin.password}
                  onChange={(e) => setAdminLogin({ ...adminLogin, password: e.target.value })}
                  className="w-full py-3 pl-4 pr-10 rounded-lg bg-white/10 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-blue-400"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <LockIcon />
                </span>
              </div>

              {loginError && (
                <p className="text-red-400 text-sm mb-4 text-center">{loginError}</p>
              )}

              <button
                onClick={() => handleLoginClick(adminLogin.email, adminLogin.password)}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-gray-300 to-gray-700 text-white font-semibold tracking-wide hover:from-gray-400 hover:to-gray-800 transition"
              >
                Login
              </button>
            </>
          ) : (
            <div className="text-center py-6">
              <p className="text-green-400 font-bold text-lg">Login Successful</p>
              <p className="text-white text-sm">Redirecting...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
