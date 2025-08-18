// src/Pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bg.jpg";
import { toast } from "react-toastify";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const res = await fetch("http://127.0.0.1:8000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.detail || "Signup failed");
            }

            toast.success("Account created successfully!");
            setTimeout(() => navigate("/userinfo"), 1500);
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div
            className="relative min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
            style={{
                backgroundImage: `url(${bg})`,
            }}
        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    Sign Up
                </h2>
                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="text-white block mb-1">Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 bg-white/10 rounded-2xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-white block mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 bg-white/10 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-white block mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 bg-white/10 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500  text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
                    >
                        Create Account
                    </button>
                </form>

                <p className="text-gray-300 text-sm text-center mt-4">
                    Already have an account?{" "}
                    <span
                        className="text-cyan-400 cursor-pointer hover:underline"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Signup;
