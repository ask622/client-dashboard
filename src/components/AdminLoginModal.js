import React, { useState } from 'react';

const UserIcon = () => (
  <svg className="w-6 h-6 text-white opacity-70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-8 0v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-6 h-6 text-white opacity-70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('adminToken', data.token || 'true');
      setLoginSuccess(true);
      setTimeout(() => {
        onClose(); // properly close modal
        setLoginSuccess(false);
      }, 1000);
    } catch (err) {
      setLoginError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-cyenter justify-center z-50">
      <div className="relative w-[370px] rounded-2xl shadow-2xl p-0 overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.10)',
          backdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(255,255,255,0.18)'
        }}>
        {/* Window bar */}
        <div className="flex items-center px-4 py-2 bg-gradient-to-b from-gray-300/60 to-gray-400/10">
          <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
          <span className="w-3 h-3 bg-yellow-300 rounded-full mr-2"></span>
          <span className="w-3 h-3 bg-green-400 rounded-full"></span>
          <span className="mx-auto text-white text-lg font-normal tracking-wide">Admin Login</span>
        </div>

        <div className="flex flex-col items-center px-6 py-8">
          {!loginSuccess ? (
            <>
              {/* Email */}
              <div className="relative w-full mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={adminLogin.email}
                  onChange={e => setAdminLogin({ ...adminLogin, email: e.target.value })}
                  className="w-full pl-5 pr-12 py-3 rounded-xl bg-white/20 text-white placeholder-white/80 outline-none border-none shadow-inner focus:ring-2 focus:ring-blue-400 transition"
                  style={{ backdropFilter: 'blur(8px)' }}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <UserIcon />
                </span>
              </div>

              {/* Password */}
              <div className="relative w-full mb-6">
                <input
                  type="password"
                  placeholder="************"
                  value={adminLogin.password}
                  onChange={e => setAdminLogin({ ...adminLogin, password: e.target.value })}
                  className="w-full pl-5 pr-12 py-3 rounded-xl bg-white/20 text-white placeholder-white/80 outline-none border-none shadow-inner focus:ring-2 focus:ring-blue-400 transition"
                  style={{ backdropFilter: 'blur(8px)' }}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <LockIcon />
                </span>
              </div>

              {loginError && (
                <p className="text-red-400 text-sm mb-4">{loginError}</p>
              )}

              <div className="w-full flex justify-between gap-4">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl bg-gray-500/80 text-white text-base font-semibold shadow hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleLoginClick(adminLogin.email, adminLogin.password)}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-yellow-400/90 to-yellow-600 text-white text-base font-semibold shadow hover:from-yellow-300 hover:to-yellow-600 transition"
                >
                  Login
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center py-6">
              <span className="text-2xl font-bold text-green-400 mb-2">Login Successful</span>
              <span className="text-white text-sm">Redirecting...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
