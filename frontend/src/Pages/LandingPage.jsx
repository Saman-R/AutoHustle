import { Zap, ArrowRight, FileText, Mail, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";

const FloatingBlob = ({ delay = 0, duration = 20, children, className = "" }) => {
    return (
        <div
            className={`absolute ${className}`}
            style={{
                animation: `morphFloat ${duration}s ease-in-out infinite ${delay}s`,
            }}
        >
            {children}
        </div>
    );
};

export default function LandingPage() {
    const [_mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const handleGetStarted = () => {
        // Replace with your navigation logic
        console.log("Navigate to /signup");
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
            {/* Background Floating Shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <FloatingBlob delay={0} duration={25} className="top-[-15%] left-[-20%] w-[600px] h-[600px]">
                    <div
                        className="w-full h-full bg-gradient-to-br from-blue-400/15 to-purple-500/20 blur-3xl"
                        style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
                    ></div>
                </FloatingBlob>

                <FloatingBlob delay={2} duration={30} className="top-[10%] right-[-25%] w-[500px] h-[500px]">
                    <div
                        className="w-full h-full bg-gradient-to-tl from-purple-400/20 to-pink-500/15 blur-3xl"
                        style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
                    ></div>
                </FloatingBlob>

                <FloatingBlob delay={4} duration={35} className="bottom-[-20%] left-[20%] w-[450px] h-[450px]">
                    <div
                        className="w-full h-full bg-gradient-to-tr from-blue-300/15 to-indigo-400/20 blur-3xl"
                        style={{ borderRadius: "40% 60% 60% 40% / 60% 30% 70% 40%" }}
                    ></div>
                </FloatingBlob>

                <FloatingBlob delay={3} duration={22} className="top-[25%] left-[65%] w-[280px] h-[280px]">
                    <div
                        className="w-full h-full bg-gradient-to-r from-cyan-400/15 to-blue-500/20 blur-xl"
                        style={{ borderRadius: "50% 50% 30% 70% / 40% 60% 40% 60%" }}
                    ></div>
                </FloatingBlob>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 py-20">
                <div className="mb-12 animate-fade-in">
                    <div className="inline-flex items-center px-6 py-3 backdrop-blur-sm rounded-full mb-8 shadow-lg border bg-white/80 border-slate-200/70 hover:bg-white/90 hover:border-blue-300/50 transition-all">
                        <Zap className="h-5 w-5 mr-3 text-blue-600" />
                        <span className="text-sm font-light tracking-wide text-slate-700">
                            THE FUTURE OF JOB APPLICATIONS
                        </span>
                    </div>

                    <h3 className="text-4xl md:text-5xl lg:text-7xl font-light mb-8 tracking-tight leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 block mb-2">
                            AI-POWERED
                        </span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 block">
                            JOB INTELLIGENCE SUITE
                        </span>
                    </h3>

                    <p className="text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-4 text-slate-600 font-light">
                        Boost your career with our AI tools. Generate personalized cold emails,
                        create professional resumes, and track all your job applications in one
                        smart, unified workspace.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mb-12 px-4">
                    {[
                        {
                            icon: FileText,
                            title: "AI-Generated Resume",
                            description:
                                "Design ATS-optimized resumes tailored to each job role automatically.",
                            color: "blue",
                        },
                        {
                            icon: BarChart3,
                            title: "Job Application Tracker",
                            description:
                                "Track every application and organize your job search efficiently.",
                            color: "emerald",
                        },
                        {
                            icon: Mail,
                            title: "AI Cold Email Generator",
                            description:
                                "Craft compelling, personalized outreach emails for recruiters in seconds.",
                            color: "purple",
                        },
                    ].map((feature, index) => {
                        const IconComponent = feature.icon;
                        const colorClasses = {
                            blue: {
                                gradient: "from-blue-500 to-indigo-600",
                                hover: "hover:shadow-blue-100",
                                border: "hover:border-blue-400",
                                iconBg: "bg-gradient-to-r from-blue-500 to-indigo-600",
                            },
                            emerald: {
                                gradient: "from-emerald-500 to-teal-600",
                                hover: "hover:shadow-emerald-100",
                                border: "hover:border-emerald-400",
                                iconBg: "bg-gradient-to-r from-emerald-500 to-teal-600",
                            },
                            purple: {
                                gradient: "from-purple-500 to-pink-600",
                                hover: "hover:shadow-purple-100",
                                border: "hover:border-purple-400",
                                iconBg: "bg-gradient-to-r from-purple-500 to-pink-600",
                            },
                        };

                        const colors = colorClasses[feature.color];

                        return (
                            <div
                                key={index}
                                className={`group relative backdrop-blur-sm p-8 rounded-2xl border border-slate-200 shadow-lg ${colors.hover} ${colors.border} hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80`}
                                style={{
                                    animation: `fadeInUp 0.8s ease-out ${0.2 + index * 0.2}s both`,
                                }}
                            >
                                <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div
                                    className={`inline-flex p-4 rounded-xl ${colors.iconBg} mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <IconComponent className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="text-xl font-medium mb-4 text-slate-800 tracking-wide">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed font-light text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={handleGetStarted}
                        className="group bg-gradient-to-r from-blue-500 to-purple-500 px-10 py-4 rounded-xl text-white font-light text-base tracking-wide hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 flex items-center justify-center shadow-xl hover:shadow-2xl"
                    >
                        GET STARTED
                        <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes morphFloat {
                    0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
                    25% { transform: translate(10%, 10%) rotate(5deg) scale(1.05); }
                    50% { transform: translate(-5%, 15%) rotate(-3deg) scale(0.95); }
                    75% { transform: translate(-10%, -5%) rotate(3deg) scale(1.02); }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeInUp 1s ease-out;
                }
            `}</style>
        </div>
    );
}