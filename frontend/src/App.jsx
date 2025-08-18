// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import LandingPage from "./Pages/LandingPage";
import JobPortal from "./components/JobPortal";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import UserInfo from "./Pages/UserInfo";

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
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/portal" element={<JobPortal />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/userinfo" element={<UserInfo />} /> {/* ✅ New Route */}
        </Routes>
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </Router>
  );
}

export default App;
