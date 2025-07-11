import React from "react";

const icons = {
  trial: "/icons/lzy_logo-Cl4gUC2f-removebg-preview.png",
  call: "/icons/call.png",
  video: "/icons/video.png",
  chat: "/icons/chat.png",
  bell: "/icons/bell.png",
  user: "/icons/user.png",
};

const AdminNavbar = ({ isLoggedIn, adminData, onLogin, onLogout }) => {
  return (
    <nav className="w-full flex items-center justify-between px-4 md:px-6 py-2 bg-[#44474f]">
      {/* Left: Logo */}
      <div className="flex items-center">
        <img
          src={icons.trial}
          alt="Logo"
          className="h-12 w-16 md:h-14 md:w-20 mr-2 md:mr-3"
        />
        {/* Admin Badge */}
        <div className="hidden md:flex items-center bg-red-500/80 rounded-full px-3 py-1 ml-2">
          <span className="text-white text-xs font-bold">ADMIN</span>
        </div>
      </div>

      {/* Center: Admin Info (only if logged in) */}
      {isLoggedIn && adminData && (
        <div className="hidden md:flex items-center bg-gray-400/60 rounded-full px-6 py-2 mx-auto">
          <img src={icons.user} alt="admin" className="w-7 h-7 rounded-full mr-2" />
          <div className="flex flex-col">
            <span className="text-white font-medium text-sm">{adminData.name}</span>
            <span className="text-white/80 text-xs">{adminData.email}</span>
          </div>
        </div>
      )}

      {/* Center: Login Required Message (when not logged in) */}
      {!isLoggedIn && (
        <div className="hidden md:flex items-center bg-red-500/80 rounded-full px-6 py-2 mx-auto">
          <div className="flex items-center">
            <span className="text-white font-medium text-sm">Admin Login Required</span>
            <span className="ml-2 w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
          </div>
        </div>
      )}

      {/* Right: Icons + Profile + Login/Logout */}
      <div className="hidden md:flex items-center space-x-3">
        <button className="bg-[#2e3e2e] rounded-full p-2 hover:bg-[#3e4e3e] transition-colors">
          <img src={icons.call} alt="call" className="w-5 h-5" />
        </button>
        <button className="bg-[#2e3e2e] rounded-full p-2 hover:bg-[#3e4e3e] transition-colors">
          <img src={icons.video} alt="video" className="w-5 h-5" />
        </button>
        <button className="bg-[#2e3e2e] rounded-full p-2 hover:bg-[#3e4e3e] transition-colors">
          <img src={icons.chat} alt="chat" className="w-5 h-5" />
        </button>
        <button className="bg-[#2e3e2e] rounded-full p-2 hover:bg-[#3e4e3e] transition-colors">
          <img src={icons.bell} alt="notification" className="w-5 h-5" />
        </button>
        
        {isLoggedIn ? (
          <div className="flex items-center space-x-2">
            <img 
              src={icons.user} 
              alt="profile" 
              className="w-8 h-8 rounded-full border-2 border-green-400" 
            />
            <button 
              onClick={onLogout} 
              className="text-red-400 hover:text-red-300 font-semibold transition-colors px-3 py-1 rounded-full bg-red-500/20 hover:bg-red-500/30"
            >
              Logout
            </button>
          </div>
        ) : (
          <button 
            onClick={onLogin} 
            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors px-4 py-2 rounded-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/50"
          >
            Admin Login
          </button>
        )}
      </div>

      {/* Mobile: Admin Info & Login/Logout */}
      <div className="flex md:hidden items-center space-x-2">
        {/* Mobile Admin Badge */}
        <div className="flex items-center bg-red-500/80 rounded-full px-2 py-1">
          <span className="text-white text-xs font-bold">ADMIN</span>
        </div>

        {isLoggedIn && adminData && (
          <div className="flex items-center bg-gray-400/60 rounded-full px-3 py-1">
            <img src={icons.user} alt="admin" className="w-5 h-5 rounded-full mr-1" />
            <span className="text-white text-xs font-medium truncate max-w-[80px]">
              {adminData.name || adminData.email}
            </span>
          </div>
        )}
        
        {isLoggedIn ? (
          <button 
            onClick={onLogout} 
            className="text-red-400 hover:text-red-300 font-semibold text-sm transition-colors px-2 py-1 rounded bg-red-500/20"
          >
            Logout
          </button>
        ) : (
          <button 
            onClick={onLogin} 
            className="text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors px-3 py-1 rounded bg-blue-500/20 border border-blue-400/50"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;