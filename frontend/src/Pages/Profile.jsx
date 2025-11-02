import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [resumeData, setResumeData] = useState(null);

    useEffect(() => {
        const allResumes = JSON.parse(localStorage.getItem('allResumes')) || [];
        const loggedInEmail = localStorage.getItem('loggedInEmail');

        if (!loggedInEmail) {
            console.warn('No logged-in email found.');
            return;
        }

        // find resume with same email
        const matchedResume = allResumes.find(
            (r) => r.personal_info.email.toLowerCase() === loggedInEmail.toLowerCase()
        );

        setResumeData(matchedResume || null);
    }, []);

    if (!resumeData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50 text-slate-500">
                <div className="text-center">
                    <div className="w-16 h-16 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p>No resume found for this account.</p>
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

                <div className="flex justify-end gap-4 mb-4">
                    {/* View Resume in New Tab */}
                    <button
                        onClick={() => {
                            const newWindow = window.open("", "_blank");
                            newWindow.document.write(`
                <html>
                    <head>
                        <title>${resumeData.personal_info.name}'s Resume</title>
                        <style>
                            body { font-family: Arial, sans-serif; padding: 40px; background: #f9fafb; color: #1e293b; }
                            .resume-container { max-width: 800px; margin: auto; background: white; border-radius: 12px; padding: 40px; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
                            @media print {
                                button { display: none; }
                                body { background: white; }
                                .resume-container { box-shadow: none; margin: 0; }
                            }
                        </style>
                    </head>
                    <body>
                        <div class="resume-container">
                            ${resumeData.resume_html}
                        </div>
                    </body>
                </html>
            `);
                            newWindow.document.close();
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow transition"
                    >
                        View Resume
                    </button>
                </div>

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
