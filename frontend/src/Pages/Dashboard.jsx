import React, { useEffect, useState } from "react";
import { Plus, FileText, Mail, Eye, Trash2 } from "lucide-react";
import { Navigate,useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [resumes, setResumes] = useState([]);
    const [openEmailIndex, setOpenEmailIndex] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("resumes") || "[]");
        setResumes(stored.reverse()); // newest first
    }, []);

    const toggleEmail = (index) => {
        setOpenEmailIndex(openEmailIndex === index ? null : index);
    };

    const handleDeleteResume = (indexToDelete) => {
        const stored = JSON.parse(localStorage.getItem("resumes") || "[]");
        const reversedIndex = stored.length - 1 - indexToDelete;
        stored.splice(reversedIndex, 1);
        localStorage.setItem("resumes", JSON.stringify(stored));
        setResumes(stored.reverse());
        if (openEmailIndex === indexToDelete) {
            setOpenEmailIndex(null);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 px-4 pt-20 pb-10">
            <div className="w-full max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-2">
                        <h1 className="text-5xl font-light tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                            YOUR RESUMES
                        </h1>
                        <button
                            onClick={() => navigate("/info")}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-light tracking-wide rounded-xl py-3 px-6 hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl text-sm"
                        >
                            <Plus className="h-4 w-4" />
                            GENERATE NEW
                        </button>
                    </div>
                    <div className="h-px bg-gradient-to-r from-blue-500 via-transparent to-transparent"></div>
                </div>

                {/* No resumes */}
                {resumes.length === 0 ? (
                    <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-12 text-center">
                        <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-400 font-light tracking-wide text-lg mb-2">
                            NO RESUMES GENERATED YET
                        </p>
                        <p className="text-slate-400 text-sm">
                            Start by generating your first one!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resumes.map((r, index) => (
                            <div
                                key={r.id}
                                className="group relative bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-blue-400 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-100"
                            >
                                <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                {/* Resume Header */}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                            <h2 className="text-base font-medium text-slate-700 tracking-wide">
                                                {r.resume_json?.header?.title || "Untitled Resume"}
                                            </h2>
                                        </div>
                                        <p className="text-xs text-slate-400 font-mono">
                                            {r.timestamp}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => {
                                                const blob = new Blob([r.resume_html], { type: "text/html" });
                                                const url = URL.createObjectURL(blob);
                                                window.open(url, "_blank");
                                            }}
                                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border border-blue-400 text-blue-600 hover:bg-blue-50 font-light tracking-wide transition-all"
                                        >
                                            <Eye className="h-3 w-3" />
                                            VIEW
                                        </button>
                                        <button
                                            onClick={() => handleDeleteResume(index)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border border-red-400 text-red-600 hover:bg-red-50 font-light tracking-wide transition-all"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </button>
                                    </div>
                                </div>

                                {/* Resume Preview */}
                                <div className="border border-slate-200 bg-slate-50/50 rounded-xl p-4 text-sm text-slate-700 mb-4 max-h-44 overflow-y-auto hover:border-slate-300 transition-colors">
                                    <div
                                        className="prose prose-sm prose-slate max-w-none"
                                        dangerouslySetInnerHTML={{ __html: r.resume_html }}
                                    />
                                </div>

                                {/* Cold Email Section */}
                                <div>
                                    <button
                                        onClick={() => toggleEmail(index)}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 font-light tracking-wide text-xs transition-all"
                                    >
                                        <Mail className="h-4 w-4" />
                                        {openEmailIndex === index
                                            ? "HIDE COLD EMAIL"
                                            : "SHOW COLD EMAIL"}
                                    </button>

                                    {openEmailIndex === index && (
                                        <div className="mt-3 bg-purple-50/50 border border-purple-200 rounded-xl p-4 text-xs text-slate-600 max-h-40 overflow-y-auto">
                                            <pre className="whitespace-pre-wrap leading-relaxed font-light">
                                                {r.cold_email || "No cold email available."}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}