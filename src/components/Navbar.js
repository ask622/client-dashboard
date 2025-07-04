import React from "react";
const icons = {
  trial: "/icons/lzy_logo-Cl4gUC2f-removebg-preview.png",
  call: "/icons/call.png",
  video: "/icons/video.png",
  chat: "/icons/chat.png",
  bell: "/icons/bell.png",
  user: "/icons/user.png",
};

const Navbar = ({ isLoggedIn, user, onLogin, onLogout }) => (
  <nav className="w-full flex items-center justify-between px-4 md:px-6 py-2 bg-[#44474f]">
    {/* Left: Logo */}
    <div className="flex items-center">
      <img
        src={icons.trial}
        alt="Logo"
        className="h-12 w-16 md:h-14 md:w-20 mr-2 md:mr-3"
      />
    </div>

    {/* Center: User Info (only if logged in) */}
    {isLoggedIn && (
      <div className="hidden md:flex items-center bg-gray-400/60 rounded-full px-6 py-2 mx-auto">
        <img src={icons.user} alt="user" className="w-7 h-7 rounded-full mr-2" />
        <span className="text-white font-medium">{user.name} <span className="text-sm opacity-80">Id: {user.id}</span></span>
      </div>
    )}

    {/* Right: Icons + Profile + Login/Logout */}
    <div className="hidden md:flex items-center space-x-3">
      <button className="bg-[#2e3e2e] rounded-full p-2">
        <img src={icons.call} alt="call" className="w-5 h-5" />
      </button>
      <button className="bg-[#2e3e2e] rounded-full p-2">
        <img src={icons.video} alt="video" className="w-5 h-5" />
      </button>
      <button className="bg-[#2e3e2e] rounded-full p-2">
        <img src={icons.chat} alt="chat" className="w-5 h-5" />
      </button>
      <button className="bg-[#2e3e2e] rounded-full p-2">
        <img src={icons.bell} alt="notification" className="w-5 h-5" />
      </button>
      {isLoggedIn ? (
        <>
          <img src={icons.user} alt="profile" className="w-8 h-8 rounded-full border-2 border-white" />
          <button onClick={onLogout} className="text-blue-400 font-semibold ml-2">Logout</button>
        </>
      ) : (
        <button onClick={onLogin} className="text-blue-400 font-semibold ml-2">Login</button>
      )}
    </div>
    {/* Mobile: User Info & Login/Logout */}
    <div className="flex md:hidden items-center">
      {isLoggedIn ? (
        <>
          <img src={icons.user} alt="profile" className="w-8 h-8 rounded-full border-2 border-white mr-2" />
          <button onClick={onLogout} className="text-blue-400 font-semibold">Logout</button>
        </>
      ) : (
        <button onClick={onLogin} className="text-blue-400 font-semibold">Login</button>
      )}
    </div>
  </nav>
);

export default Navbar;