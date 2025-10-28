import { useState, useEffect, useMemo } from "react";
import {
    PlusCircle,
    Trash2,
    ExternalLink,
    Briefcase,
    Calendar,
    CheckCircle,
    Gift,
    XCircle,
} from "lucide-react";

export default function JobTracker() {
    const [jobs, setJobs] = useState(() => {
        const stored = localStorage.getItem("jobs");
        return stored ? JSON.parse(stored) : [];
    });

    const [newJob, setNewJob] = useState({
        company: "",
        title: "",
        jobId: "",
        link: "",
        status: "Applied",
    });

    const [filter, setFilter] = useState(null);
    const statuses = useMemo(
        () => [
            { label: "Applied", icon: Briefcase, color: "blue" },
            { label: "Interview Scheduled", icon: Calendar, color: "purple" },
            { label: "Interviewed", icon: CheckCircle, color: "emerald" },
            { label: "Offered", icon: Gift, color: "amber" },
            { label: "Rejected", icon: XCircle, color: "red" },
        ],
        [] // 👈 Empty dependency array so it's created once
    );

    // ✅ Save to localStorage when jobs change
    useEffect(() => {
        localStorage.setItem("jobs", JSON.stringify(jobs));
    }, [jobs]);

    const addJob = () => {
        if (!newJob.company.trim() || !newJob.title.trim()) {
            alert("Please fill in Company and Job Title");
            return;
        }
        setJobs((prev) => [...prev, newJob]);
        setNewJob({ company: "", title: "", jobId: "", link: "", status: "Applied" });
    };

    const removeJob = (index) => {
        setJobs((prev) => prev.filter((_, i) => i !== index));
    };

    // ✅ Update job status dynamically
    const updateJobStatus = (index, newStatus) => {
        setJobs((prev) =>
            prev.map((job, i) => (i === index ? { ...job, status: newStatus } : job))
        );
    };

    const filteredJobs = useMemo(
        () => (filter ? jobs.filter((job) => job.status === filter) : jobs),
        [filter, jobs]
    );

    const counts = useMemo(() => {
        const c = {};
        statuses.forEach((s) => {
            c[s.label] = jobs.filter((j) => j.status === s.label).length;
        });
        return c;
    }, [jobs, statuses]);

    const getStatusColorClasses = (status) => {
        const colorMap = {
            "Applied": { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", dot: "bg-blue-500" },
            "Interview Scheduled": { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", dot: "bg-purple-500" },
            "Interviewed": { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", dot: "bg-emerald-500" },
            "Offered": { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", dot: "bg-amber-500" },
            "Rejected": { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", dot: "bg-red-500" },
        };
        return colorMap[status] || { bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-700", dot: "bg-gray-500" };
    };

    const getStatusCardClasses = (label) => {
        const colorMap = {
            "Applied": { active: "bg-blue-50 border-blue-400 shadow-xl shadow-blue-100", icon: "text-blue-600" },
            "Interview Scheduled": { active: "bg-purple-50 border-purple-400 shadow-xl shadow-purple-100", icon: "text-purple-600" },
            "Interviewed": { active: "bg-emerald-50 border-emerald-400 shadow-xl shadow-emerald-100", icon: "text-emerald-600" },
            "Offered": { active: "bg-amber-50 border-amber-400 shadow-xl shadow-amber-100", icon: "text-amber-600" },
            "Rejected": { active: "bg-red-50 border-red-400 shadow-xl shadow-red-100", icon: "text-red-600" },
        };
        return colorMap[label] || { active: "bg-gray-50 border-gray-400", icon: "text-gray-600" };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 px-4 pt-20 pb-10">
            <div className="w-full max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-light tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-2">
                        JOB TRACKER
                    </h1>
                    <div className="h-px bg-gradient-to-r from-blue-500 via-transparent to-transparent"></div>
                </div>

                {/* Add Job Form */}
                <div className="group relative bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-blue-400 rounded-2xl p-6 mb-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-100">
                    <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="flex items-center gap-3 mb-4">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <h2 className="text-sm font-light tracking-widest text-blue-600">ADD NEW APPLICATION</h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <input
                            type="text"
                            placeholder="Company Name"
                            value={newJob.company}
                            onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                            className="flex-1 min-w-[160px] border border-slate-200 rounded-xl p-3 bg-white/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition text-sm"
                        />
                        <input
                            type="text"
                            placeholder="Job Title"
                            value={newJob.title}
                            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                            className="flex-1 min-w-[160px] border border-slate-200 rounded-xl p-3 bg-white/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition text-sm"
                        />
                        <input
                            type="text"
                            placeholder="Job ID"
                            value={newJob.jobId}
                            onChange={(e) => setNewJob({ ...newJob, jobId: e.target.value })}
                            className="w-32 border border-slate-200 rounded-xl p-3 bg-white/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition text-sm"
                        />
                        <input
                            type="url"
                            placeholder="Job Link"
                            value={newJob.link}
                            onChange={(e) => setNewJob({ ...newJob, link: e.target.value })}
                            className="flex-1 min-w-[160px] border border-slate-200 rounded-xl p-3 bg-white/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition text-sm"
                        />
                        <select
                            value={newJob.status}
                            onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
                            className="border border-slate-200 rounded-xl p-3 bg-white/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition text-sm"
                        >
                            {statuses.map((s) => (
                                <option key={s.label}>{s.label}</option>
                            ))}
                        </select>
                        <button
                            onClick={addJob}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-light tracking-wide rounded-xl py-3 px-6 hover:from-blue-600 hover:to-purple-600 transition-all shadow-sm text-sm"
                        >
                            <PlusCircle className="h-4 w-4" />
                            ADD
                        </button>
                    </div>
                </div>

                {/* Status Overview Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    {statuses.map((s) => {
                        const Icon = s.icon;
                        const cardClasses = getStatusCardClasses(s.label);
                        const isActive = filter === s.label;

                        return (
                            <div
                                key={s.label}
                                onClick={() => setFilter(s.label === filter ? null : s.label)}
                                className={`group cursor-pointer rounded-2xl border p-6 flex flex-col items-center justify-center text-center transition-all duration-300 ${isActive
                                    ? cardClasses.active
                                    : "bg-white/80 backdrop-blur-sm border-slate-200 hover:border-slate-300 hover:shadow-lg"
                                    }`}
                            >
                                <div className={`mb-3 transition-colors ${isActive ? cardClasses.icon : 'text-slate-400 group-hover:text-slate-600'}`}>
                                    <Icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-light tracking-wide text-slate-600 text-xs mb-2 uppercase">
                                    {s.label}
                                </h3>
                                <p className="text-3xl font-light text-slate-800">
                                    {counts[s.label] || 0}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Clear Filter */}
                {filter && (
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => setFilter(null)}
                            className="text-blue-600 font-light tracking-wide text-sm hover:text-blue-700 transition flex items-center gap-2"
                        >
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                            CLEAR FILTER
                        </button>
                    </div>
                )}

                {/* Job List Table */}
                {filteredJobs.length > 0 ? (
                    <div className="group relative bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-purple-400 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-100">
                        <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50/80 border-b border-slate-200">
                                    <tr>
                                        <th className="py-4 px-6 text-left text-xs font-light tracking-widest text-slate-500 uppercase">Company</th>
                                        <th className="py-4 px-6 text-left text-xs font-light tracking-widest text-slate-500 uppercase">Title</th>
                                        <th className="py-4 px-6 text-left text-xs font-light tracking-widest text-slate-500 uppercase">Job ID</th>
                                        <th className="py-4 px-6 text-left text-xs font-light tracking-widest text-slate-500 uppercase">Status</th>
                                        <th className="py-4 px-6 text-right text-xs font-light tracking-widest text-slate-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredJobs.map((job, index) => {
                                        const statusColors = getStatusColorClasses(job.status);

                                        return (
                                            <tr key={index} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                                                <td className="py-4 px-6 font-medium text-slate-700 text-sm">{job.company}</td>
                                                <td className="py-4 px-6 text-slate-600 text-sm">{job.title}</td>
                                                <td className="py-4 px-6 text-slate-500 font-mono text-xs">{job.jobId || "-"}</td>
                                                <td className="py-4 px-6">
                                                    {/* ✅ Dropdown for status change */}
                                                    <select
                                                        value={job.status}
                                                        onChange={(e) => updateJobStatus(index, e.target.value)}
                                                        className={`inline-flex items-center gap-2 px-3 py-1 border rounded-full text-xs font-light tracking-wide
                                                            ${statusColors.bg} 
                                                            ${statusColors.border} 
                                                            ${statusColors.text}
                                                            focus:ring-2 focus:ring-blue-400 focus:border-transparent transition`}
                                                    >
                                                        {statuses.map((s) => (
                                                            <option key={s.label} value={s.label}>
                                                                {s.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center justify-end gap-3">
                                                        {job.link && (
                                                            <a
                                                                href={job.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-500 hover:text-blue-700 transition-colors"
                                                            >
                                                                <ExternalLink className="h-4 w-4" />
                                                            </a>
                                                        )}
                                                        <button
                                                            onClick={() => removeJob(index)}
                                                            className="text-red-400 hover:text-red-600 transition-colors"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-12 text-center">
                        <p className="text-slate-400 font-light tracking-wide">
                            {filter
                                ? `NO JOBS FOUND FOR "${filter.toUpperCase()}"`
                                : "NO JOB APPLICATIONS ADDED YET"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
