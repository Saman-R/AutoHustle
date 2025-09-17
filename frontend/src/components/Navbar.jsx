import { Bot, LogOut, User, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Navbar({ user, setUser }) {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null); // instantly update state
        toast.success("Logged out successfully");
        navigate("/login");
        setIsMobileMenuOpen(false);
    };

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-6 z-50 backdrop-blur-md border-b transition-all bg-white/80 border-gray-200/50 shadow-sm mb-15">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <Bot className="h-10 w-8 text-blue-600" />
                <Link to="/">
                    <span className="text-2xl font-bold hover:opacity-80 transition text-gray-900">
                        AutoHustle
                    </span>
                </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-6">
                <Link to="/" className="transition-colors transform hover:scale-105 text-gray-600 hover:text-gray-900">Home</Link>
                <Link to="/portal" className="transition-colors transform hover:scale-105 text-gray-600 hover:text-gray-900">Jobs</Link>
                

                {user ? (
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate("/profile")}
                            className="p-2 rounded-full transition bg-purple-100 hover:bg-purple-200"
                        >
                            <User className="h-5 w-5 text-purple-600" />
                        </button>

                        <button
                            onClick={handleLogout}
                            className="p-2 rounded-full transition bg-red-100 hover:bg-red-200"
                        >
                            <LogOut className="h-5 w-5 text-red-600" />
                        </button>
                    </div>
                ) : (
                    <Link
                        to="/login"
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 
                                px-6 py-2 rounded-full  text-white font-semibold 
                                shadow-md shadow-cyan-500/30
                                   hover:from-blue-500 hover:to-purple-500 
                                hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-110"
                    >
                        Login
                    </Link>
                )}
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden p-2 rounded-lg backdrop-blur-sm border transition-all bg-gray-100/80 border-gray-300/50 hover:bg-gray-200/80"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMobileMenuOpen}
            >
                {isMobileMenuOpen ? (
                    <X className="h-6 w-6 text-gray-700" />
                ) : (
                    <Menu className="h-6 w-6 text-gray-700" />
                )}
            </button>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full backdrop-blur-lg border-t md:hidden bg-white/95 border-gray-200/50">
                    <div className="px-6 py-4 space-y-4">
                        <Link
                            to="/"
                            className="block transition-colors py-2 text-gray-600 hover:text-gray-900"
                            onClick={closeMobileMenu}
                        >
                            Home
                        </Link>
                        <Link
                            to="/portal"
                            className="block transition-colors py-2 text-gray-600 hover:text-gray-900"
                            onClick={closeMobileMenu}
                        >
                            Jobs
                        </Link>
                        

                        {user ? (
                            <div className="space-y-3 pt-3 border-t border-gray-200/50">
                                <button
                                    onClick={() => {
                                        navigate("/profile");
                                        closeMobileMenu();
                                    }}
                                    className="flex items-center space-x-3 w-full text-left transition-colors py-2 text-gray-600 hover:text-gray-900"
                                >
                                    <User className="h-5 w-5" />
                                    <span>Profile</span>
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-3 w-full text-left transition-colors py-2 text-red-600 hover:text-red-700"
                                >
                                    <LogOut className="h-5 w-5" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="pt-3 border-t border-gray-200/50">
                                <Link
                                    to="/login"
                                    className="block w-full text-center bg-gradient-to-r from-cyan-400 to-blue-500 
                                               px-6 py-3 rounded-full 
                                               text-white font-semibold 
                                               shadow-md shadow-cyan-500/30
                                               hover:from-blue-500 hover:to-purple-500 
                                               hover:shadow-lg hover:shadow-purple-500/40
                                               transition-all duration-300"
                                    onClick={closeMobileMenu}
                                >
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
