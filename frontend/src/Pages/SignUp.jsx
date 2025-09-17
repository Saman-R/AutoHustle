// src/Pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion as Motion } from "framer-motion";
import ModernBackground from "../components/ModernBackground";

function Signup({ setUser }) {
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

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.detail || "Signup failed");
                return;
            }

            toast.success("Account created successfully!");
            const newUser = { name, email };
            localStorage.setItem("user", JSON.stringify(newUser));
            setUser?.(newUser);
            setTimeout(() => navigate("/onboarding"), 1500);
        } catch (err) {
            toast.error(err.message || "Something went wrong");
        }
    };

    return (
        <div className="relative min-h-screen">
            {/* Background */}
            <ModernBackground
                colorScheme="warm"
                intensity="normal"
                showMouseInteraction={true}
            />

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
                <Motion.div
                    className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-200 p-8 w-full max-w-md relative z-10"
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <Motion.h2
                        className="text-3xl font-bold text-gray-800 text-center mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Sign Up
                    </Motion.h2>

                    <Motion.form
                        onSubmit={handleSignup}
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div>
                            <label className="text-gray-700 block mb-1 font-medium">Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 bg-white/70 border border-gray-300 rounded-2xl text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 block mb-1 font-medium">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 bg-white/70 border border-gray-300 rounded-2xl text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 block mb-1 font-medium">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 bg-white/70 border border-gray-300 rounded-2xl text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <Motion.button
                            type="submit"
                            className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-red-700 transition-all duration-200"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Create Account
                        </Motion.button>
                    </Motion.form>

                    <Motion.p
                        className="text-gray-600 text-sm text-center mt-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        Already have an account?{" "}
                        <span
                            className="text-orange-600 font-medium cursor-pointer hover:underline transition-all duration-200"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </span>
                    </Motion.p>
                </Motion.div>
            </div>
        </div>
    );
}

export default Signup;