import React, { useState, useEffect } from 'react';
import { motion as Motion } from "framer-motion";
import {
    User,
    Briefcase,
    FileText,
    TrendingUp,
    Calendar,
    MapPin,
    Mail,
    Phone,
    Settings,
    Download,
    Upload,
    Eye,
    Heart,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle
} from 'lucide-react';

import ModernBackground from "../components/ModernBackground";


const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [user, setUser] = useState(null);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [savedJobs, setSavedJobs] = useState([]);
    const [stats, setStats] = useState({
        totalApplications: 0,
        pendingApplications: 0,
        interviews: 0,
        successRate: 0
    });

    useEffect(() => {
        // Load user data from localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }

        // Load mock data for demo
        loadMockData();
    }, []);

    const loadMockData = () => {
        const mockAppliedJobs = [
            {
                id: 1,
                title: 'Senior Frontend Developer',
                company: 'TechCorp Inc.',
                status: 'pending',
                appliedDate: '2024-01-15',
                location: 'San Francisco, CA',
                salary: '$120,000 - $150,000'
            },
            {
                id: 2,
                title: 'Full Stack Engineer',
                company: 'StartupXYZ',
                status: 'interview',
                appliedDate: '2024-01-10',
                location: 'Remote',
                salary: '$90,000 - $120,000'
            },
            {
                id: 3,
                title: 'React Developer',
                company: 'WebSolutions',
                status: 'rejected',
                appliedDate: '2024-01-08',
                location: 'New York, NY',
                salary: '$80,000 - $100,000'
            }
        ];

        const mockSavedJobs = [
            {
                id: 4,
                title: 'Product Manager',
                company: 'InnovateCorp',
                savedDate: '2024-01-12',
                location: 'Austin, TX',
                salary: '$110,000 - $140,000'
            },
            {
                id: 5,
                title: 'UI/UX Designer',
                company: 'DesignStudio',
                savedDate: '2024-01-11',
                location: 'Los Angeles, CA',
                salary: '$70,000 - $95,000'
            }
        ];

        setAppliedJobs(mockAppliedJobs);
        setSavedJobs(mockSavedJobs);
        setStats({
            totalApplications: mockAppliedJobs.length,
            pendingApplications: mockAppliedJobs.filter(job => job.status === 'pending').length,
            interviews: mockAppliedJobs.filter(job => job.status === 'interview').length,
            successRate: 33
        });
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <Clock className="h-4 w-4 text-yellow-500" />;
            case 'interview':
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'rejected':
                return <XCircle className="h-4 w-4 text-red-500" />;
            case 'accepted':
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            default:
                return <AlertCircle className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
            case 'interview':
                return 'bg-green-500/20 text-green-300 border-green-500/30';
            case 'rejected':
                return 'bg-red-500/20 text-red-300 border-red-500/30';
            case 'accepted':
                return 'bg-green-600/20 text-green-300 border-green-600/30';
            default:
                return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
        }
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: TrendingUp },
        { id: 'applications', label: 'My Applications', icon: Briefcase },
        { id: 'saved', label: 'Saved Jobs', icon: Heart },
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'resume', label: 'Resume', icon: FileText }
    ];

    return (
        <ModernBackground>
            <div className="min-h-screen pt-20 text-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                    {/* Header */}
                    <Motion.div
                        className="mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Welcome back, {user?.name || 'User'}!
                        </h1>
                        <p className="text-gray-600">
                            Track your job applications and manage your profile
                        </p>
                    </Motion.div>

                    {/* Stats Cards */}
                    <Motion.div
                        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        {[
                            { label: 'Total Applications', value: stats.totalApplications, icon: Briefcase, color: 'text-blue-400' },
                            { label: 'Pending', value: stats.pendingApplications, icon: Clock, color: 'text-yellow-400' },
                            { label: 'Interviews', value: stats.interviews, icon: CheckCircle, color: 'text-green-400' },
                            { label: 'Success Rate', value: `${stats.successRate}%`, icon: TrendingUp, color: 'text-purple-400' }
                        ].map((stat) => (
                            <Motion.div
                                key={stat.label}
                                className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg"
                                whileHover={{ scale: 1.02, y: -2 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm">{stat.label}</p>
                                        <p className="text-gray-800 text-2xl font-bold">{stat.value}</p>
                                    </div>
                                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                                </div>
                            </Motion.div>
                        ))}
                    </Motion.div>

                    {/* Tab Navigation */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {tabs.map((tab) => (
                            <Motion.button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                                    : 'bg-white/60 text-gray-600 hover:text-gray-800'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <tab.icon className="h-4 w-4" />
                                {tab.label}
                            </Motion.button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <Motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'applications' && (
                            <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
                                <h2 className="text-gray-800 text-xl font-semibold mb-4">Recent Applications</h2>
                                <div className="space-y-4">
                                    {appliedJobs.map((job) => (
                                        <Motion.div
                                            key={job.id}
                                            className="p-4 bg-white/50 rounded-lg border border-gray-300"
                                            whileHover={{ scale: 1.01 }}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-gray-800 font-semibold">{job.title}</h3>
                                                    <p className="text-gray-600">{job.company}</p>
                                                </div>
                                                <div className={`flex items-center gap-1 px-2 py-1 rounded-full border ${getStatusColor(job.status)}`}>
                                                    {getStatusIcon(job.status)}
                                                    <span className="text-xs capitalize">{job.status}</span>
                                                </div>
                                            </div>
                                            <div className="text-sm text-gray-500 space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4" />
                                                    {job.location}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4" />
                                                    Applied: {job.appliedDate}
                                                </div>
                                                <p>{job.salary}</p>
                                            </div>
                                        </Motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'saved' && (
                            <div className="bg-white/90 backdrop-blur-sm border-gray-200 border rounded-xl p-6">
                                <h2 className="text-gray-900 text-xl font-semibold mb-4">Saved Jobs</h2>
                                <div className="space-y-4">
                                    {savedJobs.map((job) => (
                                        <Motion.div
                                            key={job.id}
                                            className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                                            whileHover={{ scale: 1.01 }}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-gray-900 font-semibold">{job.title}</h3>
                                                    <p className="text-gray-600">{job.company}</p>
                                                </div>
                                                <button className="text-red-400 hover:text-red-300">
                                                    <Heart className="h-5 w-5 fill-current" />
                                                </button>
                                            </div>
                                            <div className="text-sm text-gray-500 space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4" />
                                                    {job.location}
                                                </div>
                                                <p>{job.salary}</p>
                                            </div>
                                            <div className="flex gap-2 mt-3">
                                                <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg text-sm hover:from-cyan-600 hover:to-purple-600 transition-all">
                                                    Apply Now
                                                </button>
                                                <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg text-sm transition-all">
                                                    View Details
                                                </button>
                                            </div>
                                        </Motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'profile' && (
                            <div className="bg-white/90 backdrop-blur-sm border-gray-200 border rounded-xl p-6">
                                <h2 className="text-gray-900 text-xl font-semibold mb-4">Profile Information</h2>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                                            <User className="h-8 w-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-gray-900 text-lg font-semibold">{user?.name || 'Your Name'}</h3>
                                            <p className="text-gray-600">Software Developer</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-500 text-sm mb-1">Email</label>
                                            <div className="flex items-center gap-2 p-3 bg-white/70 border-gray-200 border rounded-lg">
                                                <Mail className="h-4 w-4 text-gray-400" />
                                                <span className="text-gray-900">{user?.email || 'user@example.com'}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-gray-500 text-sm mb-1">Phone</label>
                                            <div className="flex items-center gap-2 p-3 bg-white/70 border-gray-200 border rounded-lg">
                                                <Phone className="h-4 w-4 text-gray-400" />
                                                <span className="text-gray-900">+1 (555) 123-4567</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'resume' && (
                            <div className="bg-white/90 backdrop-blur-sm border-gray-200 border rounded-xl p-6">
                                <h2 className="text-gray-900 text-xl font-semibold mb-4">Resume Management</h2>
                                <div className="space-y-6">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all">
                                            <Upload className="h-4 w-4" />
                                            Upload Resume
                                        </button>
                                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg transition-all">
                                            <Download className="h-4 w-4" />
                                            Download Current
                                        </button>
                                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg transition-all">
                                            <Eye className="h-4 w-4" />
                                            Preview
                                        </button>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <h3 className="text-gray-900 font-semibold mb-2">Current Resume</h3>
                                        <p className="text-gray-600">resume_2024.pdf</p>
                                        <p className="text-gray-500 text-sm">Last updated: January 15, 2024</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div className="bg-white/90 backdrop-blur-sm border-gray-200 border rounded-xl p-6">
                                    <h2 className="text-gray-900 text-xl font-semibold mb-4">Recent Activity</h2>
                                    <div className="space-y-3">
                                        {appliedJobs.slice(0, 3).map((job) => (
                                            <div key={job.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-100">
                                                <div className="flex-1">
                                                    <p className="text-gray-900">Applied to {job.title} at {job.company}</p>
                                                    <p className="text-gray-500 text-sm">{job.appliedDate}</p>
                                                </div>
                                                {getStatusIcon(job.status)}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </Motion.div>
                </div>
            </div>
        </ModernBackground>
    );
};

export default Dashboard;
