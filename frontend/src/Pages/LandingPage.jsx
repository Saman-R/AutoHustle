import { Zap, ArrowRight, FileText, Bot, Wand2 } from "lucide-react";
import { Link } from "react-router-dom";
import bg from '../assets/bg.jpg';

export default function LandingPage() {
    return (

        <div
            className="relative min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
            style={{
                backgroundImage: `url(${bg})`,
            }}
        >
            {/* Blur Overlay */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>


            {/* Page content */}
            <div className="relative z-10 pt-28 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
                <div className="mb-8">
                    <div className="inline-flex items-center px-4 py-2 bg-slate-800/50 backdrop-blur-lg rounded-full border border-cyan-500/30 mb-6">
                        <Zap className="h-4 w-4 text-cyan-400 mr-2" />
                        <span className="text-cyan-400 text-sm">The Future of Job Applications</span>
                    </div>
                    <h1 className="text-6xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
                        AI-Powered
                        <br />
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Job Hunting
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Let our advanced AI agents search, analyze, and apply for jobs.
                        Generate tailored resumes based on job descriptions with friendly and professional styles.
                        Apply automatically and track your progress — all in one place.
                    </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 max-w-5xl mb-4">
                    <div className="bg-slate-800/40 backdrop-blur-xl p-6 rounded-2xl border border-slate-700 hover:border-cyan-400/50 transition-all hover:scale-105">
                        <FileText className="h-10 w-10 text-cyan-400 mb-4" />
                        <h3 className="text-lg font-semibold text-white">AI-Generated Resumes</h3>
                        <p className="text-gray-400 text-sm mt-2">
                            Automatically generate polished, ATS-friendly resumes tailored to your strengths.
                        </p>
                    </div>

                    <div className="bg-slate-800/40 backdrop-blur-xl p-6 rounded-2xl border border-slate-700 hover:border-cyan-400/50 transition-all hover:scale-105">
                        <Wand2 className="h-10 w-10 text-purple-400 mb-4" />
                        <h3 className="text-lg font-semibold text-white">Job-Specific Tailoring</h3>
                        <p className="text-gray-400 text-sm mt-2">
                            Customize resumes instantly based on the job description for better chances.
                        </p>
                    </div>

                    <div className="bg-slate-800/40 backdrop-blur-xl p-6 rounded-2xl border border-slate-700 hover:border-cyan-400/50 transition-all hover:scale-105">
                        <Bot className="h-10 w-10 text-pink-400 mb-4" />
                        <h3 className="text-lg font-semibold text-white">Automated Job Applications</h3>
                        <p className="text-gray-400 text-sm mt-2">
                            Let our agents find, apply, and track job opportunities for you.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <Link
                        to="/login"
                        className="group bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 rounded-full text-white font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all transform hover:scale-105 flex items-center justify-center"
                    >
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

        </div>

    );
}
