import React, { useState } from "react";

const initialState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  location: "",
  interests: [],
  message: "",
};

const interestOptions = [
  { label: "User Ads", value: "user" },
  { label: "Business profile", value: "business" },
  { label: "Banner Ads", value: "banner" },
  { label: "Video Ads", value: "video" },
  { label: "Home Ads", value: "home" },
  { label: "Analytics Dashbord", value: "analytics" },
];

export default function EnquiryModal({ open, onClose, onSuccess }) {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleCheckbox = (e) => {
    const { value, checked } = e.target;
    setForm((f) => ({
      ...f,
      interests: checked
        ? [...f.interests, value]
        : f.interests.filter((i) => i !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm(initialState);
    onClose();
    onSuccess();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-white shadow-2xl border border-white/20"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl font-bold text-white hover:text-red-400"
        >
          ×
        </button>

        {/* Mac-style Top Circles and Title */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-3 h-3 rounded-full bg-red-400"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
          <span className="w-3 h-3 rounded-full bg-green-400"></span>
          <h2 className="flex-1 text-center text-lg font-semibold text-white">
            Publish Your Business
          </h2>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="bg-white/20 text-white placeholder-white/70 rounded-lg p-2 focus:outline-none"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            required
            className="bg-white/20 text-white placeholder-white/70 rounded-lg p-2 focus:outline-none"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="bg-white/20 text-white placeholder-white/70 rounded-lg p-2 focus:outline-none"
          />
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company/Business Name"
            className="bg-white/20 text-white placeholder-white/70 rounded-lg p-2 focus:outline-none"
          />
          
        </div>

        {/* Checkboxes */}
        <div className="mb-4">
          <span className="block text-sm font-semibold mb-2">Interested In:</span>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4">
            {interestOptions.map((opt) => (
              <label
                key={opt.value}
                className="flex items-center gap-2 text-sm text-white"
              >
                <input
                  type="checkbox"
                  value={opt.value}
                  checked={form.interests.includes(opt.value)}
                  onChange={handleCheckbox}
                  className="accent-yellow-400"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Message Box */}
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message"
          rows={3}
          className="w-full p-2 rounded-lg bg-white/20 text-white placeholder-white/70 mb-4 focus:outline-none"
        />

        {/* Submit Button */}
         <button
          type="submit"
          className="w-full bg-gradient-to-r from-white/80 to-white text-black font-semibold py-2 rounded-xl shadow-md hover:opacity-90 transition"
        >
          Submit Enquiry
        </button>
      </form>
    </div>
  );
}
