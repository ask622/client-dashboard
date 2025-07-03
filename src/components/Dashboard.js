import React from 'react';

const icons = {
  trial: "/icons/user-ads.svg",
  business: "/icons/business-profile.svg",
  banner: "/icons/banner-ads.png",
  video: "/icons/video-ads.png",
  home: "/icons/home-ads.png",
  enquiry: "/icons/enquiry.png",
  cion: "/icons/cion.png",
};

const cardClass =
  "relative rounded-xl p-6 flex flex-col items-center justify-center border-2 border-red-400 shadow-lg min-h-[110px] bg-white/10 backdrop-blur-md overflow-hidden";

const Dashboard = ({ data, location, onLocationChange }) => {
  return (
    <div className="relative min-h-screen bg-[#101c2c] text-white overflow-hidden">
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="relative z-10 p-8">
          {/* Top Bar */}
          {/* Gradient Header Bar */}
        <div className="w-full rounded-bl-lg rounded-br-lg bg-gradient-to-r from-orange-400 to-red-500 py-3 flex justify-center items-center mb-8">
          <span className="text-white text-2xl md:text-3xl font-bold tracking-wide text-center">
            LzyCrazy Real-Time Engagement Dashboard
          </span>
        </div>
 
          {/* Top Section */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Total Users */}
            <div className="relative bg-gradient-to-br from-[#232d47] to-[#1a1f3c] rounded-2xl p-8 flex flex-col justify-between border-4 border-yellow-400 shadow-lg min-h-[180px]">
              <span className="text-white text-base opacity-80 mb-1">Statistics</span>
              <span className="text-2xl font-semibold">Total users</span>
              <span className="text-7xl font-extrabold mt-2 text-yellow-400 leading-none">{data[location].totalUsers.toString().padStart(3, '')}</span>
              <span className="absolute top-6 right-6 w-4 h-4 bg-yellow-400 rounded-full"></span>
            </div>
            {/* Realtime Users */}
            <div className="relative bg-gradient-to-br from-[#233d35] to-[#1a3c2c] rounded-2xl p-8 flex flex-col justify-between border-4 border-green-400 shadow-lg min-h-[180px]">
              <span className="text-white text-base opacity-80 mb-1">Statistics</span>
              <span className="text-2xl font-semibold">Realtime users</span>
              <span className="text-7xl font-extrabold mt-2 text-green-400 leading-none">{data[location].realtimeUsers.toString().padStart(2, '0')}</span>
              <span className="absolute top-6 right-6 w-4 h-4 bg-green-400 rounded-full"></span>
            </div>
            {/* Location Selector */}
            <div className="flex flex-col   rounded-2xl p-8  min-h-[100px]">
              <span className="text-lg mb-4 font-semibold">Select Location</span>
              <select
                value={location}
                onChange={e => onLocationChange(e.target.value)}
                className="p-2 rounded-lg bg-white text-black text-lg font-semibold focus:outline-none"
              >
                <option value="" disabled>Select</option>
                {Object.keys(data).map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

       
        {/* Main Section */}
        <div className="flex gap-6">
          {/* Graph Section - size reduced */}
          <div className="bg-[#1a2233] rounded-2xl p-4 shadow-lg flex flex-col justify-end border-2 border-[#4e5d78] min-h-[220px] max-w-[500px] w-full">
            {/* Dummy graph image */}
            <img
              src={icons.cion}
              alt="graph"
              className=" object-contain"
              style={{ maxWidth: 500 }}
            />
          </div>
          {/* Stats Cards - 2 rows, 3 columns */}
          <div className="grid grid-cols-3 gap-4 w-[725px]">
            {/* Total User Ads */}
            <div className={cardClass}>
              <span className="absolute top-2 left-2 text-xs text-red-400 font-bold">Live</span>
              <span className="absolute top-2 right-2 w-3 h-3 bg-red-400 rounded-full"></span>
              <img
                src={icons.trial}
                alt="Total User Ads"
                className="w-14 h-14 mb-2 filter invert-0 brightness-200 hue-rotate-30"
                style={{ filter: 'brightness(0) saturate(100%) invert(81%) sepia(98%) saturate(749%) hue-rotate(2deg) brightness(104%) contrast(104%)' }}
              />
              <span className="text-base text-white">Total User Ads</span>
              <span className="text-3xl font-bold text-white">{data[location].ads.trial.toString().padStart(2, '')}</span>
            </div>
            {/* Business Profile */}
            <div className={cardClass}>
              <span className="absolute top-2 left-2 text-xs text-red-400 font-bold">Live</span>
              <span className="absolute top-2 right-2 w-3 h-3 bg-red-400 rounded-full"></span>
              <img src={icons.business} alt="Business Profile" className="w-14 h-14 mb-2 " style={{filter: 'brightness(0) saturate(100%) invert(81%) sepia(98%) saturate(749%) hue-rotate(2deg) brightness(104%) contrast(104%)'}} />
              <span className="text-base text-white">Business Profile</span>
              <span className="text-3xl font-bold text-white">{data[location].ads.business.toString().padStart(2, '')}</span>
            </div>
            {/* Banner Ads */}
            <div className={cardClass}>
              <span className="absolute top-2 left-2 text-xs text-red-400 font-bold">Live</span>
              <span className="absolute top-2 right-2 w-3 h-3 bg-red-400 rounded-full"></span>
              <img src={icons.banner} alt="Banner Ads" className="w-14 h-14 mb-2" style={{filter: 'brightness(0) saturate(100%) invert(81%) sepia(98%) saturate(749%) hue-rotate(2deg) brightness(104%) contrast(104%)'}} />
              <span className="text-base text-white">Banner Ads</span>
              <span className="text-3xl font-bold text-white">{data[location].ads.banner.toString().padStart(2, '')}</span>
            </div>
            {/* Video Ads */}
            <div className={cardClass}>
              <span className="absolute top-2 left-2 text-xs text-red-400 font-bold">Live</span>
              <span className="absolute top-2 right-2 w-3 h-3 bg-red-400 rounded-full"></span>
              <img src={icons.video} alt="Video Ads" className="w-14 h-14 mb-2" style={{filter: 'brightness(0) saturate(100%) invert(81%) sepia(98%) saturate(749%) hue-rotate(2deg) brightness(104%) contrast(104%)'}} />
              <span className="text-base text-white">Video Ads</span>
              <span className="text-3xl font-bold text-white">{data[location].ads.video.toString().padStart(2, '')}</span>
            </div>
            {/* Home Ads */}
            <div className={cardClass}>
              <span className="absolute top-2 left-2 text-xs text-red-400 font-bold">Live</span>
              <span className="absolute top-2 right-2 w-3 h-3 bg-red-400 rounded-full"></span>
              <img src={icons.home} alt="Home Ads" className="w-14 h-14 mb-2" style={{filter: 'brightness(0) saturate(100%) invert(81%) sepia(98%) saturate(749%) hue-rotate(2deg) brightness(104%) contrast(104%)'}} />
              <span className="text-base text-white">Home Ads</span>
              <span className="text-3xl font-bold text-white">{data[location].ads.home.toString().padStart(2, '')}</span>
            </div>
            {/* Enquiry Now */}
            <div className="relative rounded-xl p-6 flex flex-col items-center border-2 border-yellow-400 shadow-lg min-h-[110px] bg-yellow-400/90 font-bold">
              <img src={icons.enquiry} alt="Enquiry Now" className="w-8 h-8 mb-2" />
              <span>Enquiry Now</span>
              <span className="text-3xl">{data[location].ads.enquiry.toString().padStart(2, '')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


