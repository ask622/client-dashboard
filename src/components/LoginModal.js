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

const LoginModal = ({ onLogin, success }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
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
          <span className="mx-auto text-white text-lg font-normal tracking-wide">WELCOME</span>
        </div>
        <div className="flex flex-col items-center px-6 py-8">
          {!success ? (
            <>
              {/* Username */}
              <div className="relative w-full mb-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
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
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-5 pr-12 py-3 rounded-xl bg-white/20 text-white placeholder-white/80 outline-none border-none shadow-inner focus:ring-2 focus:ring-blue-400 transition"
                  style={{ backdropFilter: 'blur(8px)' }}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <LockIcon />
                </span>
              </div>
              {/* Login Button */}
              <button
                onClick={() => onLogin(username, password)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-200/80 to-gray-900/80 text-white text-lg font-semibold shadow hover:from-gray-100 hover:to-gray-700 transition"
                style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.18)' }}
              >
                Login
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-green-600 mb-2">Successfull</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
