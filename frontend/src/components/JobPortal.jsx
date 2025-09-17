import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, DollarSign, Calendar, Briefcase, X } from 'lucide-react';
import { motion as Motion, AnimatePresence } from "framer-motion";
import JobCard from './JobCard';
import JobModal from './JobModal';
import LoadingSkeleton from './LoadingSkeleton';
import ModernBackground from './ModernBackground';

function JobPortal() {
    const [searchQuery, setSearchQuery] = useState('');
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        location: '',
        jobType: '',
        experienceLevel: '',
        salaryRange: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        setLoading(true);
        setError(null);
        try {
            let query = searchQuery || "Software Engineer";
            if (filters.location) query += ` in ${filters.location}`;
            if (filters.jobType) query += ` ${filters.jobType}`;

            const res = await fetch(
                `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=1&num_pages=1`,
                {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'd1ea1447demshf61a102078ad07cp120e2djsn0cccd372a59e',
                        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
                    }
                }
            );

            if (!res.ok) {
                throw new Error(`API Error: ${res.status}`);
            }

            const data = await res.json();

            if (!data.data || data.data.length === 0) {
                setJobs([]);
                setError('No jobs found. Try adjusting your search criteria.');
                return;
            }

            const formattedJobs = data.data.map((job, index) => ({
                id: index,
                title: job.job_title,
                company: job.employer_name,
                location: job.job_city ? `${job.job_city}, ${job.job_country}` : job.job_country,
                type: job.job_employment_type,
                salary: job.job_salary_currency && job.job_min_salary && job.job_max_salary
                    ? `${job.job_salary_currency} ${job.job_min_salary} - ${job.job_max_salary}`
                    : "Not disclosed",
                experience: job.job_required_experience?.experience_level || "Not specified",
                description: job.job_description,
                requirements: job.job_required_skills || [],
                posted: job.job_posted_at_datetime_utc
                    ? new Date(job.job_posted_at_datetime_utc).toLocaleDateString()
                    : "N/A",
                applicants: Math.floor(Math.random() * 200),
                match: Math.floor(Math.random() * 30) + 70
            }));
            setJobs(formattedJobs);
        } catch (err) {
            console.error('Error fetching jobs:', err);
            setError('Failed to fetch jobs. Please try again later.');
        }
        setLoading(false);
    };

    const clearFilters = () => {
        setFilters({
            location: '',
            jobType: '',
            experienceLevel: '',
            salaryRange: ''
        });
    };

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Modern Background */}
            <ModernBackground
                colorScheme="default"
                intensity="subtle"
                showMouseInteraction={true}
            />

            {/* Content */}
            <div className="relative z-10 min-h-screen text-gray-800 pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                    {/* Search Section */}
                    <Motion.div
                        className="mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex flex-col lg:flex-row gap-4 mb-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <input
                                    type="text"
                                    placeholder="Search jobs, companies, or skills..."
                                    className="w-full pl-10 pr-4 py-3 bg-white/80 border border-gray-300 rounded-lg backdrop-blur-md focus:border-blue-500 focus:outline-none transition-colors shadow-sm hover:bg-white/90"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && fetchJobs()}
                                    aria-label="Search for jobs, companies, or skills"
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`px-4 py-3 rounded-lg border transition-all flex items-center gap-2 shadow-sm backdrop-blur-sm ${showFilters
                                        ? 'bg-blue-500 border-blue-500 text-white'
                                        : 'bg-white/80 border-gray-300 text-gray-600 hover:border-blue-500 hover:bg-white/90'
                                        }`}
                                >
                                    <Filter className="h-4 w-4" />
                                    Filters
                                </button>
                                <button
                                    onClick={fetchJobs}
                                    disabled={loading}
                                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium shadow-lg hover:shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-indigo-700"
                                >
                                    {loading ? 'Searching...' : 'Search'}
                                </button>
                            </div>
                        </div>

                        {/* Filters Panel */}
                        <AnimatePresence>
                            {showFilters && (
                                <Motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg p-6 mb-6 shadow-lg">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    <MapPin className="inline h-4 w-4 mr-1" />
                                                    Location
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="e.g. New York, Remote"
                                                    className="w-full px-3 py-2 bg-white/90 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors"
                                                    value={filters.location}
                                                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    <Briefcase className="inline h-4 w-4 mr-1" />
                                                    Job Type
                                                </label>
                                                <select
                                                    className="w-full px-3 py-2 bg-white/90 border border-gray-300 rounded-md text-gray-800 focus:border-blue-500 focus:outline-none transition-colors"
                                                    value={filters.jobType}
                                                    onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
                                                >
                                                    <option value="">Any</option>
                                                    <option value="FULLTIME">Full-time</option>
                                                    <option value="PARTTIME">Part-time</option>
                                                    <option value="CONTRACT">Contract</option>
                                                    <option value="INTERN">Internship</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Experience
                                                </label>
                                                <select
                                                    className="w-full px-3 py-2 bg-white/90 border border-gray-300 rounded-md text-gray-800 focus:border-blue-500 focus:outline-none transition-colors"
                                                    value={filters.experienceLevel}
                                                    onChange={(e) => setFilters({ ...filters, experienceLevel: e.target.value })}
                                                >
                                                    <option value="">Any</option>
                                                    <option value="ENTRY_LEVEL">Entry Level</option>
                                                    <option value="MID_LEVEL">Mid Level</option>
                                                    <option value="SENIOR_LEVEL">Senior Level</option>
                                                    <option value="EXECUTIVE">Executive</option>
                                                </select>
                                            </div>
                                            <div className="flex items-end">
                                                <button
                                                    onClick={clearFilters}
                                                    className="w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-md text-white transition-colors flex items-center justify-center gap-2"
                                                >
                                                    <X className="h-4 w-4" />
                                                    Clear Filters
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Motion.div>
                            )}
                        </AnimatePresence>
                    </Motion.div>

                    {/* Results Section */}
                    <Motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {loading ? (
                            <LoadingSkeleton count={6} />
                        ) : error ? (
                            <Motion.div
                                className="text-center py-12"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-md mx-auto">
                                    <div className="text-gray-500 text-4xl mb-4">😔</div>
                                    <p className="text-gray-600 text-lg">{error}</p>
                                </div>
                            </Motion.div>
                        ) : jobs.length === 0 ? (
                            <Motion.div
                                className="text-center py-12"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-md mx-auto">
                                    <div className="text-gray-500 text-4xl mb-4">🔍</div>
                                    <p className="text-gray-600 text-lg">No jobs found. Try a different search query.</p>
                                </div>
                            </Motion.div>
                        ) : (
                            <>
                                <div className="flex justify-between items-center mb-6">
                                    <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
                                        <p className="text-gray-600 font-medium">
                                            {jobs.length} jobs found
                                        </p>
                                    </div>
                                </div>
                                <Motion.div
                                    className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, staggerChildren: 0.1 }}
                                >
                                    {jobs.map((job, index) => (
                                        <Motion.div
                                            key={job.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                        >
                                            <JobCard job={job} onClick={setSelectedJob} />
                                        </Motion.div>
                                    ))}
                                </Motion.div>
                            </>
                        )}
                    </Motion.div>
                </div>

                <AnimatePresence>
                    {selectedJob && (
                        <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default JobPortal;