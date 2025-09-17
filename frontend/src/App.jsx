// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import LandingPage from "./Pages/LandingPage";
import JobPortal from "./components/JobPortal";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import UserInfo from "./Pages/UserInfo";
import Dashboard from "./Pages/Dashboard";
import Onboarding from "./Pages/Onboarding";

function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
      <Router>
        <div className="min-h-screen flex flex-col bg-white pt-10">
          <Navbar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/portal" element={<JobPortal />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/onboarding" element={<Onboarding />} /> {/* ⬅️ add this */}
            <Route path="/userinfo" element={<UserInfo />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Dashboard />} />
          </Routes>
        </div>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'rgba(255, 255, 255, 0.9)',
              color: '#333',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              backdropFilter: 'blur(10px)',
            },
          }}
        />
      </Router>
  );
}

export default App;
