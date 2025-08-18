import React from 'react';
import { MapPin, Clock, DollarSign, Building2, Star } from 'lucide-react';

function JobCard({ job, onClick }) {
    return (
        <div
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all cursor-pointer group"
            onClick={() => onClick(job)}
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                            {job.title}
                        </h3>
                        <div className="flex items-center px-2 py-1 bg-cyan-500/20 rounded-full">
                            <Star className="h-3 w-3 text-cyan-400 mr-1" />
                            <span className="text-xs text-cyan-400 font-medium">{job.match}% match</span>
                        </div>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm mb-2">
                        <Building2 className="h-4 w-4 mr-1" />
                        {job.company}
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                <div className="flex items-center text-gray-400 text-sm">
                    <MapPin className="h-4 w-4 mr-1" /> {job.location}
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                    <DollarSign className="h-4 w-4 mr-1" /> {job.salary}
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                    <Clock className="h-4 w-4 mr-1" /> {job.posted}
                </div>
            </div>

            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{job.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
                {job.requirements.slice(0, 3).map((req, idx) => (
                    <span key={idx} className="px-2 py-1 bg-slate-700 rounded-md text-xs text-gray-300">
                        {req}
                    </span>
                ))}
            </div>

            <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">{job.applicants} applicants</span>
                <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white text-sm font-medium hover:from-cyan-600 hover:to-purple-600 transition-all">
                    View Details
                </button>
            </div>
        </div>
    );
}

export default JobCard;
