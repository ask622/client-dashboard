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

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleCheckbox = e => {
    const { value, checked } = e.target;
    setForm(f => ({
      ...f,
      interests: checked
        ? [...f.interests, value]
        : f.interests.filter(i => i !== value),
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // You can add validation or API call here
    setForm(initialState);
    onClose();
    onSuccess();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center enquiry-modal-bg">
      <form className="enquiry-modal relative" onSubmit={handleSubmit}>
        <button className="close-btn" type="button" onClick={onClose}>×</button>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-3 h-3 rounded-full bg-red-400"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
          <span className="w-3 h-3 rounded-full bg-green-400"></span>
          <span className="mx-auto text-xl font-semibold text-white" style={{ flex: 1, textAlign: "center" }}>Publish Your Business</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required />
          <input name="company" value={form.company} onChange={handleChange} placeholder="Company/Business Name" />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" />
        </div>
        <div className="mb-2">
          <span className="block text-white mb-1">Intrested In:</span>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {interestOptions.map(opt => (
              <label key={opt.value} className="flex items-center gap-2 text-white text-sm">
                <input
                  type="checkbox"
                  value={opt.value}
                  checked={form.interests.includes(opt.value)}
                  onChange={handleCheckbox}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Message/Enquiry Deatils"
          rows={2}
          className="w-full mb-2"
        />
        <button className="submit-btn" type="submit">Submit Enquiry</button>
      </form>
    </div>
  );
}