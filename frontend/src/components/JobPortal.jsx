import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import JobCard from './JobCard';
import JobModal from './JobModal';

function JobPortal() {
    const [searchQuery, setSearchQuery] = useState('');
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(searchQuery || "Software Engineer")}&page=1&num_pages=1`,
                {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'd1ea1447demshf61a102078ad07cp120e2djsn0cccd372a59e',
                        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
                    }
                }
            );
            const data = await res.json();
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
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white pt-20">
            {/* pt-20 offsets the fixed navbar height */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search jobs, companies, or skills..."
                            className="w-full pl-10 pr-4 py-3 bg-slate-800/70 border border-slate-700 rounded-lg backdrop-blur-md"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={fetchJobs}
                        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-medium shadow-lg hover:shadow-cyan-500/20 transition"
                    >
                        Search
                    </button>
                </div>

                {loading ? (
                    <p className="text-gray-400">Loading jobs...</p>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {jobs.map(job => (
                            <JobCard key={job.id} job={job} onClick={setSelectedJob} />
                        ))}
                    </div>
                )}
            </div>

            {selectedJob && <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
        </div>
    );
}

export default JobPortal;
