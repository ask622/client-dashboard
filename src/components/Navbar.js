import React from "react";

const icons = {
  trial: "/icons/lzy_logo-Cl4gUC2f-removebg-preview.png",
  call: "/icons/call.png",
  video: "/icons/video.png",
  chat: "/icons/chat.png",
  bell: "/icons/bell.png",
  user: "/icons/user.png",
};

const Navbar = ({ isUserMode = true }) => {
  return (
    <nav className="w-full flex items-center justify-between px-4 md:px-6 py-2 bg-[#44474f]">
      {/* Left: Logo */}
      <div className="flex items-center">
        <img
          src={icons.trial}
          alt="Logo"
          className="h-12 w-16 md:h-14 md:w-20 mr-2 md:mr-3"
        />
      </div>

      {/* Center: User Mode Indicator */}
      <div className="hidden md:flex items-center bg-blue-500/80 rounded-full px-6 py-2 mx-auto">
        <div className="flex items-center">
          <span className="text-white font-medium text-sm">User Dashboard</span>
          <span className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        </div>
      </div>

      {/* Right: Icons + User Profile */}
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
        
        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <img 
            src={icons.user} 
            alt="profile" 
            className="w-8 h-8 rounded-full border-2 border-blue-400" 
          />
          <span className="text-blue-400 font-semibold text-sm">Guest User</span>
        </div>
      </div>

      {/* Mobile: User Mode Indicator */}
      <div className="flex md:hidden items-center space-x-2">
        <div className="flex items-center bg-blue-500/80 rounded-full px-3 py-1">
          <span className="text-white text-xs font-medium">User</span>
          <span className="ml-1 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
        </div>
        
        <img 
          src={icons.user} 
          alt="profile" 
          className="w-6 h-6 rounded-full border-2 border-blue-400" 
        />
      </div>
    </nav>
  );
};

export default Navbar;