// src/Pages/Onboarding.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { Briefcase, MapPin, Laptop, ArrowRight } from "lucide-react";
import ModernBackground from "../components/ModernBackground"; // ✅ import new background

function Onboarding() {
    const [form, setForm] = useState({
        position: "",
        experience: "",
        location: "",
        workType: "remote",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User Preferences:", form);
        // TODO: send to backend
        navigate("/userinfo"); // 👈 change this route
    };

    return (
        <div className="relative min-h-screen">
            {/* Background */}
            <ModernBackground
                colorScheme="default"
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
                        Welcome to Job Automation
                    </Motion.h2>

                    <Motion.p
                        className="text-gray-600 text-center mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Let’s set up your preferences so we can tailor job automation for you.
                    </Motion.p>

                    <Motion.form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {/* Position */}
                        <div>
                            <label className="text-gray-700 block mb-1 font-medium">
                                Desired Position
                            </label>
                            <div className="flex items-center px-4 py-3 bg-white/70 border border-gray-300 rounded-2xl">
                                <Briefcase className="w-5 h-5 text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    name="position"
                                    value={form.position}
                                    onChange={handleChange}
                                    placeholder="e.g. Software Engineer"
                                    className="flex-1 bg-transparent outline-none text-gray-800 placeholder:text-gray-500"
                                />
                            </div>
                        </div>

                        {/* Experience */}
                        <div>
                            <label className="text-gray-700 block mb-1 font-medium">
                                Years of Experience
                            </label>
                            <input
                                type="number"
                                name="experience"
                                value={form.experience}
                                onChange={handleChange}
                                placeholder="e.g. 3"
                                min="0"
                                className="w-full px-4 py-3 bg-white/70 border border-gray-300 rounded-2xl text-gray-800 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="text-gray-700 block mb-1 font-medium">
                                Preferred Location
                            </label>
                            <div className="flex items-center px-4 py-3 bg-white/70 border border-gray-300 rounded-2xl">
                                <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    name="location"
                                    value={form.location}
                                    onChange={handleChange}
                                    placeholder="e.g. Bangalore"
                                    className="flex-1 bg-transparent outline-none text-gray-800 placeholder:text-gray-500"
                                />
                            </div>
                        </div>

                        {/* Work Type */}
                        <div>
                            <label className="text-gray-700 block mb-1 font-medium">
                                Work Preference
                            </label>
                            <div className="flex gap-3">
                                {[
                                    { label: "Remote", value: "remote", icon: <Laptop className="w-5 h-5" /> },
                                    { label: "Onsite", value: "onsite", icon: <MapPin className="w-5 h-5" /> },
                                    { label: "Hybrid", value: "hybrid", icon: <Briefcase className="w-5 h-5" /> },
                                ].map((option) => (
                                    <button
                                        type="button"
                                        key={option.value}
                                        onClick={() => setForm((prev) => ({ ...prev, workType: option.value }))}
                                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-2xl border transition ${form.workType === option.value
                                                ? "bg-blue-100 border-blue-400 text-blue-700"
                                                : "bg-white/70 border-gray-300 text-gray-600"
                                            }`}
                                    >
                                        {option.icon}
                                        <span>{option.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Submit */}
                        <Motion.button
                            type="submit"
                            className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Continue
                            <ArrowRight className="w-5 h-5" />
                        </Motion.button>

                    </Motion.form>
                </Motion.div>
            </div>
        </div>
    );
}

export default Onboarding;
