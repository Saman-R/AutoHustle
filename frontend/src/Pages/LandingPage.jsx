import { Zap, ArrowRight, FileText, Bot, Wand2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FloatingBlob = ({ delay = 0, duration = 20, children, className = "" }) => {
    return (
        <div
            className={`absolute ${className}`}
            style={{
                animation: `morphFloat ${duration}s ease-in-out infinite ${delay}s`
            }}
        >
            {children}
        </div>
    );
};


export default function LandingPage() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-gray-100 to-stone-200 pt-6">
            {/* Modern Professional Background Shapes */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Large Sophisticated Blobs */}
                <FloatingBlob delay={0} duration={25} className="top-[-15%] left-[-20%] w-[600px] h-[600px]">
                    <div
                        className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-blue-600/30 blur-3xl"
                        style={{
                            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
                        }}
                    ></div>
                </FloatingBlob>

                <FloatingBlob delay={2} duration={30} className="top-[10%] right-[-25%] w-[500px] h-[500px]">
                    <div
                        className="w-full h-full bg-gradient-to-tl from-violet-500/25 to-purple-600/20 blur-3xl"
                        style={{
                            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%'
                        }}
                    ></div>
                </FloatingBlob>

                <FloatingBlob delay={4} duration={35} className="bottom-[-20%] left-[20%] w-[450px] h-[450px]">
                    <div
                        className="w-full h-full bg-gradient-to-tr from-slate-400/15 to-gray-500/25 blur-3xl"
                        style={{
                            borderRadius: '40% 60% 60% 40% / 60% 30% 70% 40%'
                        }}
                    ></div>
                </FloatingBlob>

                <FloatingBlob delay={1} duration={28} className="top-[50%] right-[15%] w-[350px] h-[350px]">
                    <div
                        className="w-full h-full bg-gradient-to-bl from-blue-500/20 to-indigo-600/25 blur-2xl"
                        style={{
                            borderRadius: '70% 30% 50% 50% / 60% 40% 60% 40%'
                        }}
                    ></div>
                </FloatingBlob>

                {/* Medium Accent Shapes */}
                <FloatingBlob delay={3} duration={22} className="top-[25%] left-[65%] w-[280px] h-[280px]">
                    <div
                        className="w-full h-full bg-gradient-to-r from-emerald-500/15 to-teal-600/20 blur-xl"
                        style={{
                            borderRadius: '50% 50% 30% 70% / 40% 60% 40% 60%'
                        }}
                    ></div>
                </FloatingBlob>

                <FloatingBlob delay={6} duration={26} className="bottom-[25%] right-[-10%] w-[320px] h-[320px]">
                    <div
                        className="w-full h-full bg-gradient-to-t from-rose-400/20 to-pink-500/15 blur-2xl"
                        style={{
                            borderRadius: '60% 40% 40% 60% / 70% 30% 70% 30%'
                        }}
                    ></div>
                </FloatingBlob>

                {/* Small Professional Accents */}
                <FloatingBlob delay={5} duration={18} className="top-[20%] left-[15%] w-[180px] h-[180px]">
                    <div
                        className="w-full h-full bg-gradient-to-br from-amber-400/25 to-orange-500/20 blur-lg"
                        style={{
                            borderRadius: '30% 70% 40% 60% / 50% 60% 40% 50%'
                        }}
                    ></div>
                </FloatingBlob>

                <FloatingBlob delay={7} duration={24} className="bottom-[55%] left-[55%] w-[200px] h-[200px]">
                    <div
                        className="w-full h-full bg-gradient-to-tl from-sky-500/20 to-cyan-600/15 blur-xl"
                        style={{
                            borderRadius: '70% 30% 60% 40% / 40% 70% 30% 60%'
                        }}
                    ></div>
                </FloatingBlob>

                <FloatingBlob delay={8} duration={20} className="top-[70%] left-[25%] w-[150px] h-[150px]">
                    <div
                        className="w-full h-full bg-gradient-to-br from-neutral-400/20 to-stone-500/25 blur-lg"
                        style={{
                            borderRadius: '40% 60% 30% 70% / 60% 40% 70% 30%'
                        }}
                    ></div>
                </FloatingBlob>

                {/* Interactive Sophisticated Highlight */}
                <div
                    className="absolute w-[400px] h-[400px] opacity-10 pointer-events-none transition-all duration-1000 ease-out blur-3xl"
                    style={{
                        background: 'radial-gradient(ellipse, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
                        left: `${mousePosition.x - 20}%`,
                        top: `${mousePosition.y - 20}%`,
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '60% 40% 50% 50% / 60% 30% 70% 40%'
                    }}
                />

                {/* Subtle Professional Lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="modernFlow1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
                        </linearGradient>
                        <linearGradient id="modernFlow2" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M 0,300 Q 200,150 400,250 T 800,200 Q 1000,180 1200,280"
                        stroke="url(#modernFlow1)"
                        strokeWidth="2"
                        fill="none"
                        className="animate-pulse"
                    />
                    <path
                        d="M 200,0 Q 350,180 500,150 T 800,280 Q 950,350 1100,250"
                        stroke="url(#modernFlow2)"
                        strokeWidth="1.5"
                        fill="none"
                        opacity="0.6"
                        className="animate-pulse"
                        style={{ animationDelay: '2s' }}
                    />
                </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
                <div className="mb-8 animate-fade-in">
                    <div className="inline-flex items-center px-6 py-3 backdrop-blur-sm rounded-full mb-8 shadow-lg border bg-white/70 border-gray-200/50 hover:bg-white/80 transition-all">
                        <Zap className="h-5 w-5 mr-3 text-indigo-600" />
                        <span className="text-sm font-semibold text-gray-700">
                            The Future of Job Applications
                        </span>
                    </div>

                    <h1 className="text-2xl md:text-5xl lg:text-7xl font-black mb-8 tracking-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-slate-800 block">
                            AI-Powered
                        </span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 block">
                            Job Hunting
                        </span>
                    </h1>

                    <p className="text-m md:text-xl max-w-7xl mx-auto leading-relaxed px-4 text-gray-600 font-medium">
                        Let our advanced AI agents search, analyze, and apply for jobs.
                        Generate tailored resumes based on job descriptions with friendly and
                        professional styles. Apply automatically and track your progress —
                        all in one place.
                    </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8  max-w-7xl mb-5 px-5">
                    {[
                        {
                            icon: FileText,
                            title: "AI-Generated Resumes",
                            description: "Automatically generate polished, ATS-friendly resumes tailored to your strengths.",
                            gradient: "from-blue-600 to-indigo-700",
                            bgGradient: "from-blue-50/80 to-indigo-100/60",
                            borderColor: "border-blue-200/40"
                        },
                        {
                            icon: Wand2,
                            title: "Job-Specific Tailoring",
                            description: "Customize resumes instantly based on the job description for better chances.",
                            gradient: "from-violet-600 to-purple-700",
                            bgGradient: "from-violet-50/80 to-purple-100/60",
                            borderColor: "border-violet-200/40"
                        },
                        {
                            icon: Bot,
                            title: "Automated Job Applications",
                            description: "Let our agents find, apply, and track job opportunities for you.",
                            gradient: "from-emerald-600 to-teal-700",
                            bgGradient: "from-emerald-50/80 to-teal-100/60",
                            borderColor: "border-emerald-200/40"
                        },
                    ].map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={index}
                                className={`backdrop-blur-sm p-8 rounded-3xl border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group bg-gradient-to-br ${feature.bgGradient} ${feature.borderColor} hover:border-opacity-60`}
                                style={{
                                    animation: `fadeInUp 0.8s ease-out ${0.2 + index * 0.2}s both`
                                }}
                            >
                                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                    <IconComponent className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-gray-800">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 mb-3">
                    <button className="group bg-gradient-to-r from-indigo-600 to-blue-700 px-10 py-5 rounded-2xl text-white font-bold text-lg hover:from-indigo-700 hover:to-blue-800 transition-all transform hover:scale-105 flex items-center justify-center shadow-lg hover:shadow-indigo-500/25" onClick={() => navigate("/signup")}>
                        Get Started

                        <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                    </button>
                </div>
            </div>

            <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeInUp 1s ease-out;
        }
      `}</style>
        </div>
    );
}