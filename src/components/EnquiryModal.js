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
  { label: "Analytics Dashboard", value: "analytics" },
];

export default function EnquiryModal({ open = true, onClose = () => {}, onSuccess = () => {} }) {
  const [form, setForm] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Clear error when user starts typing
    if (error) setError("");
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

  const validateForm = () => {
    if (!form.name.trim()) {
      setError("Full Name is required");
      return false;
    }
    if (!form.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!form.phone.trim()) {
      setError("Phone Number is required");
      return false;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Simulate API call since we can't make real API calls in this environment
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random success/failure for demo
          if (Math.random() > 0.2) {
            resolve();
          } else {
            reject(new Error("Network error. Please try again."));
          }
        }, 1500);
      });

      // Reset form and close modal
      setForm(initialState);
      onClose();
      onSuccess();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-white shadow-2xl border border-white/20">
        <div>
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-4 text-2xl font-bold text-white hover:text-red-400 transition-colors"
            disabled={isSubmitting}
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

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name *"
              required
              disabled={isSubmitting}
              className="bg-white/20 text-white placeholder-white/70 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email *"
              type="email"
              required
              disabled={isSubmitting}
              className="bg-white/20 text-white placeholder-white/70 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number *"
              required
              disabled={isSubmitting}
              className="bg-white/20 text-white placeholder-white/70 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50"
            />
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Company/Business Name"
              disabled={isSubmitting}
              className="bg-white/20 text-white placeholder-white/70 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50"
            />
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              disabled={isSubmitting}
              className="bg-white/20 text-white placeholder-white/70 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50 md:col-span-2"
            />
          </div>

          {/* Checkboxes */}
          <div className="mb-4">
            <span className="block text-sm font-semibold mb-2">Interested In:</span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4">
              {interestOptions.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2 text-sm text-white cursor-pointer hover:text-white/80 transition-colors"
                >
                  <input
                    type="checkbox"
                    value={opt.value}
                    checked={form.interests.includes(opt.value)}
                    onChange={handleCheckbox}
                    disabled={isSubmitting}
                    className="accent-yellow-400 disabled:opacity-50"
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
            disabled={isSubmitting}
            className="w-full p-2 rounded-lg bg-white/20 text-white placeholder-white/70 mb-4 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50"
          />

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-white/80 to-white text-black font-semibold py-2 rounded-xl shadow-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Enquiry"}
          </button>
        </div>
      </div>
    </div>
  );
}