import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import LoginModal from "./components/AdminLoginModal.js";
import Navbar from "./components/Navbar";
import dashboardData from "./data/dashboardData.js";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [location, setLocation] = useState(Object.keys(dashboardData)[0]); // Default location

  const handleLogin = () => {
    setSuccess(true);
    setTimeout(() => {
      setShowModal(false);
      setSuccess(false);
    }, 1500);
  };

  // Example user object
  const user = {
    name: "Mohd Hassan",
    id: "lc001",
    avatar: "/user.png", // your user image
  };

  return (
    <>
      <Navbar
        isLoggedIn={showModal === false}
        user={user}
        onLogin={() => setShowModal(true)}
        onLogout={() => setShowModal(true)}
      />
      <Dashboard
        data={dashboardData}
        location={location}
        onLocationChange={setLocation}
      />
      {showModal && <LoginModal onLogin={handleLogin} success={success} />}
    </>
  );
}

export default App;
