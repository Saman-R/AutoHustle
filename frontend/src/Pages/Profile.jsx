import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [resumeData, setResumeData] = useState(null);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('latestResume'));
        setResumeData(data);
    }, []);

    if (!resumeData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50 text-slate-500">
                <div className="text-center">
                    <div className="w-16 h-16 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p>No resume data found. Please fill the form first.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-20 px-4">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-light tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-2">
                        PROFILE
                    </h1>
                    <div className="h-px bg-gradient-to-r from-blue-500 via-transparent to-transparent"></div>
                </div>

                {/* Personal Information */}
                <div className="group relative bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-blue-400 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-100">
                    <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <h2 className="text-xl font-light tracking-widest text-blue-600 mb-6 flex items-center gap-3">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        PERSONAL INFORMATION
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-3">
                            <span className="text-slate-400 font-mono">NAME</span>
                            <span className="text-slate-700">{resumeData.personal_info.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-slate-400 font-mono">EMAIL</span>
                            <span className="text-slate-700">{resumeData.personal_info.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-slate-400 font-mono">LINKEDIN</span>
                            <span className="text-blue-600">{resumeData.personal_info.linkedin}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-slate-400 font-mono">GITHUB</span>
                            <span className="text-purple-600">{resumeData.personal_info.github}</span>
                        </div>
                    </div>
                </div>

                {/* Education */}
                <div className="group relative bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-indigo-400 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100">
                    <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <h2 className="text-xl font-light tracking-widest text-indigo-600 mb-6 flex items-center gap-3">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        EDUCATION
                    </h2>
                    <div className="space-y-6">
                        {resumeData.education.map((edu, i) => (
                            <div key={i} className="relative pl-6 border-l-2 border-slate-200 hover:border-indigo-400 transition-colors">
                                <div className="absolute -left-1.5 top-2 w-3 h-3 rounded-full bg-white border-2 border-indigo-500"></div>
                                <div className="space-y-1 text-sm">
                                    <p className="text-slate-700 font-medium">{edu.institution}</p>
                                    <p className="text-slate-600">{edu.degree}</p>
                                    <p className="text-slate-400 font-mono text-xs">{edu.startMonth} {edu.startYear} - {edu.endMonth} {edu.endYear}</p>
                                    <p className="text-indigo-600 text-xs">GRADE: {edu.grade}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Experience */}
                <div className="group relative bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-emerald-400 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-100">
                    <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <h2 className="text-xl font-light tracking-widest text-emerald-600 mb-6 flex items-center gap-3">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        EXPERIENCE
                    </h2>
                    <div className="space-y-6">
                        {resumeData.experience.map((exp, i) => (
                            <div key={i} className="relative pl-6 border-l-2 border-slate-200 hover:border-emerald-400 transition-colors">
                                <div className="absolute -left-1.5 top-2 w-3 h-3 rounded-full bg-white border-2 border-emerald-500"></div>
                                <div className="space-y-1 text-sm">
                                    <p className="text-slate-700 font-medium">{exp.company}</p>
                                    <p className="text-emerald-600">{exp.position}</p>
                                    <p className="text-slate-400 font-mono text-xs">{exp.startMonth} {exp.startYear} - {exp.endMonth} {exp.endYear}</p>
                                    <p className="text-slate-600 mt-2">{exp.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Certifications */}
                <div className="group relative bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-amber-400 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-amber-100">
                    <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <h2 className="text-xl font-light tracking-widest text-amber-600 mb-6 flex items-center gap-3">
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                        CERTIFICATIONS
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {resumeData.certifications.map((c, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                                {c}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skills */}
                <div className="group relative bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-purple-400 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-purple-100">
                    <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <h2 className="text-xl font-light tracking-widest text-purple-600 mb-6 flex items-center gap-3">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        SKILLS
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs text-slate-400 font-mono mb-2">SOFT SKILLS</p>
                            <div className="flex flex-wrap gap-2">
                                {resumeData.soft_skills.map((s, i) => (
                                    <span key={i} className="px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-xs font-light tracking-wide hover:bg-blue-100 transition-colors">{s}</span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-mono mb-2">HARD SKILLS</p>
                            <div className="flex flex-wrap gap-2">
                                {resumeData.hard_skills.map((s, i) => (
                                    <span key={i} className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-xs font-light tracking-wide hover:bg-emerald-100 transition-colors">{s}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Generated Resume */}
                <div className="group relative bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-pink-400 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-pink-100">
                    <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <h2 className="text-xl font-light tracking-widest text-pink-600 mb-6 flex items-center gap-3">
                        <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
                        AI GENERATED RESUME
                    </h2>
                    <div
                        className="prose prose-slate max-w-none bg-slate-50/50 border border-slate-200 p-6 rounded-xl text-sm"
                        dangerouslySetInnerHTML={{ __html: resumeData.resume_html }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Profile;