import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bg from "../assets/bg.jpg";

function Login({ setUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const res = await fetch("http://127.0.0.1:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.detail || "Login failed");
                return;
            }

            toast.success(data.message);

            const newUser = { name: data.name, email };
            localStorage.setItem("user", JSON.stringify(newUser));
            setUser(newUser); // instantly update Navbar
            navigate("/portal");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div
            className="relative min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    Login
                </h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="text-white block mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 bg-white/10 rounded-2xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-white block mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 bg-white/10 rounded-2xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all"
                    >
                        Login
                    </button>
                </form>

                <p className="text-gray-300 text-sm text-center mt-4">
                    Don’t have an account?{" "}
                    <span
                        className="text-cyan-400 font-medium cursor-pointer hover:underline"
                        onClick={() => navigate("/signup")}
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>

    );
}

export default Login;
