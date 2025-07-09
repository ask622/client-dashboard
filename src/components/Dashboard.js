import React, { useState } from 'react';
import EnquiryModal from './EnquiryModal';
import SuccessModal from './SuccessModal';
import AdsPage from './AdsPage';

const icons = {
  trial: "/icons/user-ads.svg",
  business: "/icons/business-profile.svg",
  banner: "/icons/banner-ads.png",
  video: "/icons/video-ads.png",
  home: "/icons/home-ads.png",
  enquiry: "/icons/enquiry.png",
  cion: "/icons/cion.png",
};

const Dashboard = ({ data, location, onLocationChange }) => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [adsPageOpen, setAdsPageOpen] = useState(false);

  const adsList = [
    { key: 'trial', label: 'Total User Ads', icon: icons.trial },
    { key: 'business', label: 'Business Profile', icon: icons.business },
    { key: 'banner', label: 'Banner Ads', icon: icons.banner },
    { key: 'video', label: 'Video Ads', icon: icons.video },
    { key: 'home', label: 'Home Ads', icon: icons.home },
  ];

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden"
      style={{
        background: "url('/bg-dashboard.jpg') center center / cover no-repeat, #101c2c",
      }}
    >
      {/* Inline CSS for slow ping animation */}
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

          {/* Total Users */}
          <div
            className="bg-gradient-to-br from-[#232d47] to-[#1a1f3c] text-white rounded-xl border-4 border-yellow-400 shadow-lg p-8 relative cursor-pointer min-h-[120px]"
            onClick={() => setAdsPageOpen(true)}
          >
            <p className="text-xl font-semibold">Total users</p>
            <p className="text-4xl font-extrabold text-yellow-400 mt-2">
              {data[location].totalUsers.toString().padStart(3, '0')}
            </p>
            <span className="absolute top-2 right-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
                {/* <span className="relative inline-flex rounded-full h-3 w-3 bg-red-400"></span> */}
              </span>
            </span>
          </div>

          {/* Realtime Users */}
          <div
            className="bg-gradient-to-br from-[#233d35] to-[#1a3c2c] text-white rounded-xl border-4 border-yellow-400 shadow-lg p-4 relative cursor-pointer min-h-[120px]"
            onClick={() => setAdsPageOpen(true)}
          >
            <p className="text-xl font-semibold">Realtime users</p>
            <p className="text-4xl font-extrabold text-yellow-400 mt-2">
              {data[location].realtimeUsers.toString().padStart(2, '0')}
            </p>
            <span className="absolute top-2 right-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
                {/* <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span> */}
              </span>
            </span>
          </div>
        </div>

        {/* Graph and Ads Cards */}
        <div className="grid md:grid-cols-3 gap-4 items-stretch">
          {/* Graph Box */}
          <div className="bg-white/10 rounded-2xl shadow-lg flex items-center justify-center border-2 border-[#4e5d78] min-h-[220px] h-full">
            <img
              src={icons.cion}
              alt="graph"
              className="object-contain w-full h-full p-4 max-h-[200px]"
            />
          </div>

          {/* Ads Cards */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {adsList.map(ad => (
              <div
                key={ad.key}
                className="relative rounded-xl p-3 flex flex-col items-center justify-center border-2 border-yellow-400 shadow-lg bg-white/10 backdrop-blur-md overflow-hidden min-h-[120px] cursor-pointer"
                onClick={() => setAdsPageOpen(true)}
              >
                <span className=" absolute top-2 left-2 text-xs text-yellow-400 font-bold">Live</span>
                <span className="absolute top-2 right-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
                    {/* <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span> */}
                  </span>
                </span>
                <img
                  src={ad.icon}
                  alt={ad.label}
                  className="w-10 h-10 md:w-12 md:h-12 mb-1"
                  style={{
                    filter:
                      'brightness(0) saturate(100%) invert(84%) sepia(90%) saturate(1000%) hue-rotate(20deg) brightness(106%) contrast(104%)'
                  }}
                />
                <p className="text-sm md:text-base text-yellow-400">{ad.label}</p>
                <p className="text-xl md:text-2xl font-bold text-yellow-400">
                  {data[location].ads[ad.key].toString().padStart(2, '0')}
                </p>
              </div>
            ))}

            {/* Enquiry Now */}
            <div
              className="relative rounded-xl p-3 flex flex-col items-center justify-center border-2 border-yellow-400 shadow-lg bg-yellow-400/90 min-h-[120px] font-bold cursor-pointer"
              onClick={() => setEnquiryOpen(true)}
            >
              <img src={icons.enquiry} alt="Enquiry Now" className="w-10 h-10 md:w-14 md:h-14 mb-2" />
              <span className="text-sm md:text-lg text-[#232d47]"> Client Enquiry</span>
              <span className="text-xl md:text-2xl text-[#232d47]">
                {data[location].ads.enquiry.toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EnquiryModal
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        onSuccess={() => setSuccessOpen(true)}
      />
      <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
      {adsPageOpen && <AdsPage onClose={() => setAdsPageOpen(false)} />}
    </div>
  );
};

export default Dashboard;
