import React from 'react';
import { Building2, Star, X } from 'lucide-react';

function JobModal({ job, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-slate-700 flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">{job.title}</h2>
                        <div className="flex items-center text-gray-400">
                            <Building2 className="h-4 w-4 mr-1" />
                            {job.company} • {job.location}
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center px-3 py-1 bg-cyan-500/20 rounded-full">
                            <Star className="h-4 w-4 text-cyan-400 mr-1" />
                            <span className="text-cyan-400 font-medium">{job.match}% match</span>
                        </div>
                        <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">{job.type}</span>
                        <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">{job.experience}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">Job Description</h3>
                    <p className="text-gray-300 leading-relaxed">{job.description}</p>
                    <h3 className="text-lg font-semibold text-white mt-6 mb-3">Requirements</h3>
                    <div className="flex flex-wrap gap-2">
                        {job.requirements.map((req, idx) => (
                            <span key={idx} className="px-3 py-1 bg-slate-700 rounded-md text-sm text-gray-300">
                                {req}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-4 mt-6">
                        <button className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-medium hover:from-cyan-600 hover:to-purple-600 transition-all">
                            Apply Now
                        </button>
                        <button className="px-6 py-3 border border-slate-600 rounded-lg text-gray-300 hover:bg-slate-700 transition-all">
                            Save Job
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobModal;
