import React from "react";

export default function SuccessModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center enquiry-modal-bg">
      <div className="success-modal">
        <div className="flex justify-center mb-4">
          <svg width="80" height="80" fill="none" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" stroke="#1de9b6" strokeWidth="4" fill="none"/>
            <path d="M25 40c4-8 26-8 30 0" stroke="#1de9b6" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <circle cx="32" cy="34" r="3" fill="#1de9b6"/>
            <circle cx="48" cy="34" r="3" fill="#1de9b6"/>
          </svg>
        </div>
        <div className="text-white text-xl font-bold mb-2">Woo hoo!!</div>
        <button className="done-btn" onClick={onClose}>Done</button>
      </div>
    </div>
  );
}
