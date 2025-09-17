import React from 'react';
import { MapPin, Clock, DollarSign, Building2, Star } from 'lucide-react';
import { motion as Motion } from "framer-motion";

function JobCard({ job, onClick }) {
    return (
        <Motion.div
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-800/70 transition-all cursor-pointer group relative overflow-hidden"
            onClick={() => onClick(job)}
            whileHover={{
                scale: 1.02,
                y: -4,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick(job);
                }
            }}
            aria-label={`View details for ${job.title} position at ${job.company}`}
        >
            {/* Gradient overlay for hover effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                                {job.title}
                            </h3>
                            <Motion.div
                                className="flex items-center px-2 py-1 bg-cyan-500/20 rounded-full"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Star className="h-3 w-3 text-cyan-400 mr-1" />
                                <span className="text-xs text-cyan-400 font-medium">{job.match}% match</span>
                            </Motion.div>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm mb-2">
                            <Building2 className="h-4 w-4 mr-1 flex-shrink-0" />
                            <span className="truncate">{job.company}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 mb-4 text-sm">
                    <div className="flex items-center text-gray-400">
                        <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                        <DollarSign className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{job.salary}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                        <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{job.posted}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                        <span className="px-2 py-1 bg-slate-700 rounded-md text-xs">{job.type}</span>
                    </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {job.description}
                </p>

                {job.requirements && job.requirements.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {job.requirements.slice(0, 3).map((req, idx) => (
                            <Motion.div.span
                                key={idx}
                                className="px-2 py-1 bg-slate-700 rounded-md text-xs text-gray-300 hover:bg-slate-600 transition-colors"
                                whileHover={{ scale: 1.05 }}
                            >
                                {req}
                            </Motion.div.span>
                        ))}
                        {job.requirements.length > 3 && (
                            <span className="px-2 py-1 bg-slate-700 rounded-md text-xs text-gray-400">
                                +{job.requirements.length - 3} more
                            </span>
                        )}
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                        {job.applicants} applicants
                    </span>
                    <Motion.div.button
                        className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white text-sm font-medium hover:from-cyan-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick(job);
                        }}
                    >
                        View Details
                    </Motion.div.button>
                </div>
            </div>
        </Motion.div>
    );
}

export default JobCard;
