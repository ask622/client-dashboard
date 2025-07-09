import React, { useState, useEffect } from 'react';
import EnquiryModal from './EnquiryModal';
import SuccessModal from './SuccessModal';
import AdsPage from './AdsPage';
import LoginModal from './AdminLoginModal';

const icons = {
  trial: "/icons/user-ads.svg",
  business: "/icons/business-profile.svg",
  banner: "/icons/banner-ads.png",
  video: "/icons/video-ads.png",
  home: "/icons/home-ads.png",
  enquiry: "/icons/enquiry.png",
  cion: "/icons/cion.png",
};

const Dashboard = ({ data, location, onLocationChange, isLoggedIn }) => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [adsPageOpen, setAdsPageOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [totalUsers, setTotalUsers] = useState();
  const [showAuthWarning, setShowAuthWarning] = useState(false);

  const adsList = [
    { key: 'trial', label: 'Total User Ads', icon: icons.trial },
    { key: 'business', label: 'Business Profile', icon: icons.business },
    { key: 'banner', label: 'Banner Ads', icon: icons.banner },
    { key: 'video', label: 'Video Ads', icon: icons.video },
    { key: 'home', label: 'Home Ads', icon: icons.home },
  ];

  // Fetch total users count
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

  // Handle protected content access
  const handleProtectedClick = () => {
    if (isLoggedIn) {
      setAdsPageOpen(true);
    } else {
      setShowAuthWarning(true);
      setTimeout(() => setShowAuthWarning(false), 3000);
      setShowLoginModal(true);
    }
  };

  // Handle successful login from modal
  const handleLoginSuccess = (loginData) => {
    // Store admin data in localStorage
    localStorage.setItem('adminToken', loginData.token);
    localStorage.setItem('adminEmail', loginData.email);
    if (loginData.name) {
      localStorage.setItem('adminName', loginData.name);
    }
    
    setShowLoginModal(false);
    // Refresh the page or update parent state
    window.location.reload();
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
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>

      {/* Auth Warning Banner */}
      {showAuthWarning && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white text-center py-2 animate-shake">
          <p className="font-semibold">⚠️ Admin login required to access protected content</p>
        </div>
      )}

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
            className={`bg-gradient-to-br from-[#232d47] to-[#1a1f3c] text-white rounded-xl border-4 border-yellow-400 shadow-lg p-8 relative cursor-pointer min-h-[120px] transition-all duration-200 hover:shadow-xl hover:scale-105 ${
              !isLoggedIn ? 'opacity-75 hover:opacity-100' : ''
            }`}
            onClick={handleProtectedClick}
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
            {!isLoggedIn && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
                <span className="text-white text-sm font-semibold bg-red-500 px-2 py-1 rounded">🔒 Login Required</span>
              </div>
            )}
          </div>

          {/* Realtime Users */}
          <div
            className={`bg-gradient-to-br from-[#233d35] to-[#1a3c2c] text-white rounded-xl border-4 border-yellow-400 shadow-lg p-4 relative cursor-pointer min-h-[120px] transition-all duration-200 hover:shadow-xl hover:scale-105 ${
              !isLoggedIn ? 'opacity-75 hover:opacity-100' : ''
            }`}
            onClick={handleProtectedClick}
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
            {!isLoggedIn && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
                <span className="text-white text-sm font-semibold bg-red-500 px-2 py-1 rounded">🔒 Login Required</span>
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
                className={`relative rounded-xl p-3 flex flex-col items-center justify-center border-2 border-yellow-400 shadow-lg bg-white/10 backdrop-blur-md overflow-hidden min-h-[120px] cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-105 ${
                  !isLoggedIn ? 'opacity-75 hover:opacity-100' : ''
                }`}
                onClick={handleProtectedClick}
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
                {!isLoggedIn && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl">
                    <span className="text-white text-xs font-semibold bg-red-500 px-2 py-1 rounded">🔒</span>
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

        {/* Login Status Indicator */}
        <div className="fixed bottom-4 right-4 z-40">
          <div className={`px-3 py-2 rounded-full text-sm font-semibold ${
            isLoggedIn 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {isLoggedIn ? '✓ Admin Logged In' : '✗ Not Logged In'}
          </div>
        </div>
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
      {adsPageOpen && (
        <AdsPage onClose={() => setAdsPageOpen(false)} />
      )}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default Dashboard;