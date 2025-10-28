//signup.jsx
import { useState } from "react";
import { motion as Motion } from "framer-motion";
import ModernBackground from "../components/ModernBackground";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) { // <-- accept setUser from App
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Login failed");
            }

            alert(data.message);

            // ✅ Save user info in localStorage & sessionStorage
            const userData = { email, name: data.name };
            localStorage.setItem("user", JSON.stringify(userData));
            sessionStorage.setItem("userEmail", email);

            // ✅ Update App state immediately (so Navbar updates)
            setUser(userData);

            // Redirect to dashboard/profile
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleLogin();
    };

    return (
        <div className="relative min-h-screen w-full">
            <ModernBackground colorScheme="cool" intensity="normal" style="modern" showMouseInteraction={true} />

            <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
                <Motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                        <p className="text-gray-600">Sign in to your account</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Enter your email"
                                disabled={isLoading}
                                className="w-full px-4 py-3 bg-white/70 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Enter your password"
                                disabled={isLoading}
                                className="w-full px-4 py-3 bg-white/70 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        <Motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleLogin}
                            disabled={isLoading}
                            className={`w-full py-3 px-4 rounded-xl font-semibold text-white shadow-lg transition-all duration-200 ${isLoading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 hover:shadow-xl"
                                }`}
                        >
                            {isLoading ? "Logging In..." : "Log In"}
                        </Motion.button>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Don&apos;t have an account?{" "}
                            <button
                                className="text-blue-600 font-medium hover:text-blue-700 hover:underline transition-colors duration-200"
                                onClick={() => navigate("/signup")}
                            >
                                Sign up here
                            </button>
                        </p>
                    </div>
                </Motion.div>
            </div>
        </div>
    );
}
