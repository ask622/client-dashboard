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

const cardClass =
  "relative rounded-xl p-6 flex flex-col items-center justify-center border-2 border-red-400 shadow-lg min-h-[110px] bg-white/10 backdrop-blur-md overflow-hidden";

const Dashboard = ({ data, location, onLocationChange }) => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [adsPageOpen, setAdsPageOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#101c2c] text-white overflow-hidden">
      <div className="relative z-10 p-4 md:p-8">
        {/* Mobile Location Selector */}
        <div className="block md:hidden mb-4">
          <div className="flex flex-col rounded-2xl p-4 bg-white/10 backdrop-blur-md">
            <span className="text-base mb-2 font-semibold text-white">Select Location</span>
            <select
              value={location}
              onChange={e => onLocationChange(e.target.value)}
              className="p-2 rounded-lg bg-white text-black text-base font-semibold focus:outline-none"
            >
              <option value="" disabled>Select</option>
              {Object.keys(data).map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Header */}
        <div className="relative z-10 p-4 md:p-8">
          <div className="w-full rounded-bl-lg rounded-br-lg bg-gradient-to-r from-orange-400 to-red-500 py-2 md:py-3 flex justify-center items-center mb-6 md:mb-8">
            <span className="text-white text-xl md:text-3xl font-bold tracking-wide text-center">
              LzyCrazy Real-Time Engagement Dashboard
            </span>
          </div>

          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
            <div
              className="relative bg-gradient-to-br from-[#232d47] to-[#1a1f3c] rounded-2xl p-6 md:p-8 flex flex-col justify-between border-4 border-yellow-400 shadow-lg min-h-[140px] md:min-h-[180px] cursor-pointer"
              onClick={() => setAdsPageOpen(true)}
            >
              <span className="text-white text-base opacity-80 mb-1">Statistics</span>
              <span className="text-xl md:text-2xl font-semibold">Total users</span>
              <span className="text-5xl md:text-7xl font-extrabold mt-2 text-yellow-400 leading-none">
                {data[location].totalUsers.toString().padStart(3, '')}
              </span>
              <span className="absolute top-4 md:top-6 right-4 md:right-6 w-4 h-4 bg-yellow-400 rounded-full"></span>
            </div>

            <div
              className="relative bg-gradient-to-br from-[#233d35] to-[#1a3c2c] rounded-2xl p-6 md:p-8 flex flex-col justify-between border-4 border-green-400 shadow-lg min-h-[140px] md:min-h-[180px] cursor-pointer"
              onClick={() => setAdsPageOpen(true)}
            >
              <span className="text-white text-base opacity-80 mb-1">Statistics</span>
              <span className="text-xl md:text-2xl font-semibold">Realtime users</span>
              <span className="text-5xl md:text-7xl font-extrabold mt-2 text-green-400 leading-none">
                {data[location].realtimeUsers.toString().padStart(2, '0')}
              </span>
              <span className="absolute top-4 md:top-6 right-4 md:right-6 w-4 h-4 bg-green-400 rounded-full"></span>
            </div>

            <div className="hidden md:flex flex-col rounded-2xl p-6 md:p-8 min-h-[100px]">
              <span className="text-base md:text-lg mb-2 md:mb-4 font-semibold">Select Location</span>
              <select
                value={location}
                onChange={e => onLocationChange(e.target.value)}
                className="p-2 rounded-lg bg-white text-black text-base md:text-lg font-semibold focus:outline-none"
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
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          {/* ✅ Responsive Graph Image Box */}
          <div className="bg-[#1a2233] rounded-2xl p-4 shadow-lg flex flex-col justify-end border-2 border-[#4e5d78] min-h-[140px] sm:min-h-[180px] md:min-h-[220px] w-full lg:max-w-[500px] mb-4 lg:mb-0">
            <img
              src={icons.cion}
              alt="graph"
              className="object-contain "
              style={{ maxWidth: 500 }}
            />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full lg:w-[725px]">
            {[
              { key: 'trial', label: 'Total User Ads', icon: icons.trial },
              { key: 'business', label: 'Business Profile', icon: icons.business },
              { key: 'banner', label: 'Banner Ads', icon: icons.banner },
              { key: 'video', label: 'Video Ads', icon: icons.video },
              { key: 'home', label: 'Home Ads', icon: icons.home },
            ].map(ad => (
              <div key={ad.key} className={cardClass} onClick={() => setAdsPageOpen(true)} style={{ cursor: "pointer" }}>
                <span className="absolute top-2 left-2 text-xs text-red-400 font-bold">Live</span>
                <span className="absolute top-2 right-2 w-3 h-3 bg-red-400 rounded-full"></span>
                <img
                  src={ad.icon}
                  alt={ad.label}
                  className="w-10 h-10 md:w-14 md:h-14 mb-2"
                  style={{
                    filter:
                      'brightness(0) saturate(100%) invert(81%) sepia(98%) saturate(749%) hue-rotate(2deg) brightness(104%) contrast(104%)',
                  }}
                />
                <span className="text-base text-white">{ad.label}</span>
                <span className="text-2xl md:text-3xl font-bold text-white">
                  {data[location].ads[ad.key].toString().padStart(2, '')}
                </span>
              </div>
            ))}

            {/* Enquiry Now */}
            <div
              className="relative rounded-xl p-6 flex flex-col items-center border-2 border-yellow-400 shadow-lg min-h-[90px] md:min-h-[110px] bg-yellow-400/90 font-bold cursor-pointer"
              onClick={() => setEnquiryOpen(true)}
            >
              <img src={icons.enquiry} alt="Enquiry Now" className="w-6 h-6 md:w-8 md:h-8 mb-2" />
              <span>Enquiry Now</span>
              <span className="text-2xl md:text-3xl">{data[location].ads.enquiry.toString().padStart(2, '')}</span>
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
