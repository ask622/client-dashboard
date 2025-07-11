import React, { useState, useEffect } from 'react';
import EnquiryModal from './EnquiryModal';
import SuccessModal from './SuccessModal';

const icons = {
  trial: "/icons/user-ads.svg",
  business: "/icons/business-profile.svg",
  banner: "/icons/banner-ads.png",
  video: "/icons/video-ads.png",
  home: "/icons/home-ads.png",
  enquiry: "/icons/enquiry.png",
  cion: "/icons/cion.png",
};

const Dashboard = ({ data, location, onLocationChange, isUserMode = false }) => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [totalUsers, setTotalUsers] = useState();

  const adsList = [
    { key: 'trial', label: 'Total User Ads', icon: icons.trial },
    { key: 'business', label: 'Business Profile', icon: icons.business },
    { key: 'banner', label: 'Banner Ads', icon: icons.banner },
    { key: 'video', label: 'Video Ads', icon: icons.video },
    { key: 'home', label: 'Home Ads', icon: icons.home },
  ];

  // Fetch total users count (only for display, not clickable in user mode)
  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/users/count');
        const data = await response.json();
        setTotalUsers(data.totalUsers);
      } catch (error) {
        console.error('Error fetching total users:', error);
        setTotalUsers(0);
      }
    };

    fetchTotalUsers();
  }, []);

  // Handle clicks - for user mode, everything opens enquiry modal
  const handleCardClick = () => {
    if (isUserMode) {
      setEnquiryOpen(true);
    }
  };

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{
        background: "url('/bg-dashboard.jpg') center center / cover no-repeat, #101c2c",
      }}
    >
      {/* Inline Animation CSS */}
      <style>{`
        @keyframes ping-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>

      <div className="pt-5 px-4 pb-5 max-w-[1440px] mx-auto">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Select Location */}
          <div className="flex flex-col justify-center order-first md:order-last">
            <label className="text-base mb-2 font-semibold text-white">Select Location</label>
            <select
              value={location}
              onChange={e => onLocationChange(e.target.value)}
              className="p-2 rounded-lg bg-white text-black font-semibold text-base focus:outline-none"
            >
              <option value="" disabled>Select</option>
              {Object.keys(data).map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Total Users Card */}
          <div
            className={`bg-gradient-to-br from-[#232d47] to-[#1a1f3c] text-white rounded-xl border-4 border-yellow-400 shadow-lg p-8 relative min-h-[120px] transition-all duration-200 hover:shadow-xl hover:scale-105 ${
              isUserMode ? 'cursor-pointer' : ''
            }`}
            onClick={isUserMode ? handleCardClick : undefined}
          >
            <p className="text-xl font-semibold">Total users</p>
            <p className="text-4xl font-extrabold text-yellow-400 mt-2">
              {totalUsers === undefined
                ? <span className="text-sm">Loading...</span>
                : totalUsers.toString().padStart(3, '0')}
            </p>
            <span className="absolute top-2 right-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
              </span>
            </span>
            {isUserMode && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white text-sm font-semibold bg-blue-500 px-3 py-1 rounded">📩 Click to Enquire</span>
              </div>
            )}
          </div>

          {/* Realtime Users */}
          <div
            className={`bg-gradient-to-br from-[#233d35] to-[#1a3c2c] text-white rounded-xl border-4 border-yellow-400 shadow-lg p-4 relative min-h-[120px] transition-all duration-200 hover:shadow-xl hover:scale-105 ${
              isUserMode ? 'cursor-pointer' : ''
            }`}
            onClick={isUserMode ? handleCardClick : undefined}
          >
            <p className="text-xl font-semibold">Realtime users</p>
            <p className="text-4xl font-extrabold text-yellow-400 mt-2">
              {data[location]?.realtimeUsers?.toString().padStart(2, '0') || '00'}
            </p>
            <span className="absolute top-2 right-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
              </span>
            </span>
            {isUserMode && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-white text-sm font-semibold bg-blue-500 px-3 py-1 rounded">📩 Click to Enquire</span>
              </div>
            )}
          </div>
        </div>

        {/* Ads Cards */}
        <div className="grid md:grid-cols-3 gap-4 items-stretch">
          {/* Graph Box */}
          <div className="bg-white/10 rounded-2xl shadow-lg flex items-center justify-center border-2 border-[#4e5d78] min-h-[220px] h-full">
            <img src={icons.cion} alt="graph" className="object-contain w-full h-full p-4 max-h-[200px]" />
          </div>

          {/* Ads Count Cards */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {adsList.map(ad => (
              <div
                key={ad.key}
                className={`relative rounded-xl p-3 flex flex-col items-center justify-center border-2 border-yellow-400 shadow-lg bg-white/10 backdrop-blur-md overflow-hidden min-h-[120px] transition-all duration-200 hover:shadow-xl hover:scale-105 ${
                  isUserMode ? 'cursor-pointer' : ''
                }`}
                onClick={isUserMode ? handleCardClick : undefined}
              >
                <span className="absolute top-2 left-2 text-xs text-yellow-400 font-bold">Live</span>
                <span className="absolute top-2 right-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
                  </span>
                </span>
                <img 
                  src={ad.icon} 
                  alt={ad.label} 
                  className="w-10 h-10 md:w-12 md:h-12 mb-1"
                  style={{
                    filter: 'brightness(0) saturate(100%) invert(84%) sepia(90%) saturate(1000%) hue-rotate(20deg) brightness(106%) contrast(104%)'
                  }}
                />
                <p className="text-sm md:text-base text-yellow-400">{ad.label}</p>
                <p className="text-xl md:text-2xl font-bold text-yellow-400">
                  {data[location]?.ads?.[ad.key]?.toString().padStart(2, '0') || '00'}
                </p>
                {isUserMode && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-semibold bg-blue-500 px-2 py-1 rounded">📩 Enquire</span>
                  </div>
                )}
              </div>
            ))}

            {/* Enquiry Now - Always accessible */}
            <div
              className="relative rounded-xl p-3 flex flex-col items-center justify-center border-2 border-yellow-400 shadow-lg bg-yellow-400/90 min-h-[120px] font-bold cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-105"
              onClick={() => setEnquiryOpen(true)}
            >
              <img src={icons.enquiry} alt="Enquiry Now" className="w-10 h-10 md:w-14 md:h-14 mb-2" />
              <span className="text-sm md:text-lg text-[#232d47]">Client Enquiry</span>
              <span className="text-xl md:text-2xl text-[#232d47]">
                {data[location]?.ads?.enquiry?.toString().padStart(2, '0') || '00'}
              </span>
            </div>
          </div>
        </div>

        {/* User Mode Info Banner */}
        {isUserMode && (
          <div className="fixed bottom-4 left-4 right-4 z-40">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg text-center shadow-lg">
              <p className="text-sm font-semibold">
                💡 Click on any card to enquire about our advertising services!
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <EnquiryModal 
        open={enquiryOpen} 
        onClose={() => setEnquiryOpen(false)} 
        onSuccess={() => setSuccessOpen(true)} 
      />
      <SuccessModal 
        open={successOpen} 
        onClose={() => setSuccessOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;