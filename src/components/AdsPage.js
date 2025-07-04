import React from "react";

const dummyAds = [
  { id: "AD001", name: "Ad User 1", country: "India", state: "UP", city: "Lucknow" },
  { id: "AD002", name: "Ad User 2", country: "India", state: "Delhi", city: "Delhi" },
  { id: "AD003", name: "Ad User 3", country: "India", state: "MP", city: "Bhopal" },
  { id: "AD004", name: "Ad User 4", country: "India", state: "MH", city: "Mumbai" },
  { id: "AD005", name: "Ad User 5", country: "India", state: "RJ", city: "Jaipur" },
  { id: "AD006", name: "Ad User 6", country: "India", state: "PB", city: "Amritsar" },
  { id: "AD007", name: "Ad User 7", country: "India", state: "KA", city: "Bangalore" },
  { id: "AD008", name: "Ad User 8", country: "India", state: "TN", city: "Chennai" },
];

export default function AdsPage({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-2">
      <div className="bg-gradient-to-br from-[#232d47] to-[#1a1f3c] rounded-2xl shadow-2xl p-2 sm:p-4 md:p-8 w-full max-w-[98vw] sm:max-w-2xl md:max-w-4xl relative border border-gray-400/30">
        {/* Window bar */}
        <div className="flex items-center px-2 sm:px-4 py-2 bg-gradient-to-b from-gray-300/60 to-gray-400/10 rounded-t-2xl">
          <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
          <span className="w-3 h-3 bg-yellow-300 rounded-full mr-2"></span>
          <span className="w-3 h-3 bg-green-400 rounded-full"></span>
          <span className="mx-auto text-white text-base sm:text-lg font-semibold tracking-wide">Total Users</span>
          <button className="absolute right-4 top-2 sm:right-6 sm:top-4 text-white text-2xl" onClick={onClose}>×</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-white mt-4 rounded-xl overflow-hidden text-xs sm:text-sm md:text-base">
            <thead>
              <tr className="bg-[#1a2233] text-white">
                <th className="py-2 px-2 sm:px-4 font-semibold">ID</th>
                <th className="py-2 px-2 sm:px-4 font-semibold">NAME</th>
                <th className="py-2 px-2 sm:px-4 font-semibold">COUNTRY</th>
                <th className="py-2 px-2 sm:px-4 font-semibold">STATE</th>
                <th className="py-2 px-2 sm:px-4 font-semibold">CITY</th>
              </tr>
            </thead>
            <tbody>
              {dummyAds.map(ad => (
                <tr key={ad.id} className="border-b border-gray-700 text-center">
                  <td className="py-2 px-2 sm:px-4">{ad.id}</td>
                  <td className="py-2 px-2 sm:px-4">{ad.name}</td>
                  <td className="py-2 px-2 sm:px-4">{ad.country}</td>
                  <td className="py-2 px-2 sm:px-4">{ad.state}</td>
                  <td className="py-2 px-2 sm:px-4">{ad.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination (dummy) */}
        <div className="flex justify-end mt-4 gap-2">
          {[1,2,3,4,5].map(n => (
            <button key={n} className="w-8 h-8 rounded-full bg-[#232d47] border border-gray-500 text-white">{n}</button>
          ))}
        </div>
        {/* Bottom left icon (dummy) */}
        <img
          src="/icons/user-ads.svg"
          alt="icon"
          className="absolute bottom-2 left-2 w-8 h-8 sm:w-12 sm:h-12 opacity-80"
        />
      </div>
    </div>
  );
}