import { Bot, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar({ user, setUser }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null); // instantly update state
        toast.success("Logged out successfully");
        navigate("/login");
    };

    return (
        <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-6 z-50 bg-gradient-to-r from-slate-500/20 to-purple-500/20 
                        backdrop-blur-md border-b border-white/10">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <Bot className="h-10 w-8 text-white" />
                <Link to="/">
                    <span className="text-2xl font-bold bg-white bg-clip-text text-transparent hover:opacity-80 transition">
                        AutoHustle
                    </span>
                </Link>
            </div>

            {/* Links */}
            <div className="hidden md:flex items-center space-x-6">
                <Link to="/" className="text-gray-200 hover:text-white transition-colors transform hover:scale-105">Home</Link>
                <a href="#about" className="text-gray-200 hover:text-white transition-colors transform hover:scale-105">About</a>

                {user ? (
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate("/profile")}
                            className="p-2 rounded-full bg-purple-500 hover:bg-purple-600 transition"
                        >
                            <User className="h-5 w-5 text-white" />
                        </button>

                        <button
                            onClick={handleLogout}
                            className="p-2 rounded-full bg-red-300 hover:bg-red-500 transition"
                        >
                            <LogOut className="h-5 w-5 text-white" />
                        </button>
                    </div>
                ) : (
                        <Link
                            to="/login"
                            className="bg-gradient-to-r from-cyan-400 to-blue-500 
             px-6 py-2 rounded-full 
             text-white font-semibold 
             shadow-md shadow-cyan-500/30
             hover:from-blue-500 hover:to-purple-500 
             hover:shadow-lg hover:shadow-purple-500/40
             transition-all duration-300 transform hover:scale-110"
                        >
                            Login
                        </Link>

                )}
            </div>
        </nav>
    );
}
