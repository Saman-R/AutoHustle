import React, { useState } from 'react';
import { Plus, Trash2, User, Briefcase, GraduationCap, Award, Lightbulb, Code } from 'lucide-react';
import { ArrowLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom';

// Resume Form Component
const ResumeForm = ({ setApproach }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        linkedin: '',
        github: '',
        jobDescription: '',
        education: [{ institution: '', degree: '', startMonth: '', startYear: '', endMonth: '', endYear: '', grade: '' }],
        experience: [{ company: '', position: '', startMonth: '', startYear: '', endMonth: '', endYear: '', description: '' }],
        certifications: [''],
        softSkills: [''],
        hardSkills: ['']
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 60 }, (_, i) => currentYear + 10 - i);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleArrayItemChange = (section, index, field, value) => {
        const updated = [...formData[section]];
        if (typeof updated[index] === 'object') {
            updated[index][field] = value;
        } else {
            updated[index] = value;
        }
        setFormData({ ...formData, [section]: updated });
    };

    const addArrayItem = (section, template) => {
        setFormData({ ...formData, [section]: [...formData[section], template] });
    };

    const removeArrayItem = (section, index) => {
        const updated = formData[section].filter((_, i) => i !== index);
        setFormData({ ...formData, [section]: updated });
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.email) {
            alert('Please fill in at least name and email.');
            return;
        }

        setIsSubmitting(true);

        try {
            const payload = {
                personal_info: {
                    name: formData.name,
                    email: formData.email,
                    linkedin: formData.linkedin,
                    github: formData.github
                },
                job_description: formData.jobDescription,
                education: formData.education.filter(e => e.institution),
                experience: formData.experience.filter(e => e.company),
                certifications: formData.certifications.filter(c => c.trim()),
                soft_skills: formData.softSkills.filter(s => s.trim()),
                hard_skills: formData.hardSkills.filter(s => s.trim())
            };

            const response = await fetch('http://localhost:8000/api/generate-ats-resume', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Failed to generate resume');

            const result = await response.json();

            // Store the data
            const resumeData = {
                id: Date.now(),
                timestamp: new Date().toLocaleString(),
                personal_info: payload.personal_info,
                education: payload.education,
                experience: payload.experience,
                certifications: payload.certifications,
                soft_skills: payload.soft_skills,
                hard_skills: payload.hard_skills,
                job_description: payload.job_description,
                resume_html: result.resume_html
            };

            localStorage.setItem('latestResume', JSON.stringify(resumeData));

            navigate('/profile'); // redirect to profile
        } catch (error) {
            console.error('Error generating resume:', error);
            alert('Error generating resume. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative max-w-5xl mx-auto">
            {/* Back Button */}
            <button
                onClick={() => setApproach(null)}
                className="absolute top-0 left-0 p-3 rounded-full backdrop-blur-sm hover:bg-gray-50 transition-all duration-300 group border border-gray-200 shadow-sm z-10"
            >
                <ArrowLeft className="w-6 h-6 text-gray-700 group-hover:scale-110 transition-transform" />
            </button>

            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    Build Your Resume
                </h2>
                <p className="text-gray-600">Fill in your details to generate an AI-powered resume</p>
            </div>

            <div className="space-y-6">
                {/* Basic Information */}
                <section className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-500">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                            <User className="w-6 h-6 text-indigo-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">Personal Information</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name *"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email *"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                        <input
                            type="url"
                            name="linkedin"
                            placeholder="LinkedIn Profile"
                            value={formData.linkedin}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                        <input
                            type="url"
                            name="github"
                            placeholder="GitHub Profile"
                            value={formData.github}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                    </div>
                </section>

                {/* Education */}
                <section className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <GraduationCap className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">Education</h3>
                        </div>
                        <button
                            type="button"
                            onClick={() => addArrayItem('education', { institution: '', degree: '', startMonth: '', startYear: '', endMonth: '', endYear: '', grade: '' })}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                        >
                            <Plus className="w-4 h-4" /> Add Education
                        </button>
                    </div>
                    <div className="space-y-4">
                        {formData.education.map((edu, i) => (
                            <div key={i} className="p-5 border-2 border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white hover:border-blue-300 transition-all">
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <input
                                        type="text"
                                        placeholder="Institution"
                                        value={edu.institution}
                                        onChange={(e) => handleArrayItemChange('education', i, 'institution', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Degree/Program"
                                        value={edu.degree}
                                        onChange={(e) => handleArrayItemChange('education', i, 'degree', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <select
                                                value={edu.startMonth}
                                                onChange={(e) => handleArrayItemChange('education', i, 'startMonth', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="">Month</option>
                                                {months.map(month => (
                                                    <option key={month} value={month}>{month}</option>
                                                ))}
                                            </select>
                                            <select
                                                value={edu.startYear}
                                                onChange={(e) => handleArrayItemChange('education', i, 'startYear', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="">Year</option>
                                                {years.map(year => (
                                                    <option key={year} value={year}>{year}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <select
                                                value={edu.endMonth}
                                                onChange={(e) => handleArrayItemChange('education', i, 'endMonth', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="">Month</option>
                                                {months.map(month => (
                                                    <option key={month} value={month}>{month}</option>
                                                ))}
                                            </select>
                                            <select
                                                value={edu.endYear}
                                                onChange={(e) => handleArrayItemChange('education', i, 'endYear', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="">Year</option>
                                                {years.map(year => (
                                                    <option key={year} value={year}>{year}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <input
                                    type="text"
                                    placeholder="Grade/GPA (e.g., 3.8/4.0, First Class)"
                                    value={edu.grade}
                                    onChange={(e) => handleArrayItemChange('education', i, 'grade', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
                                />

                                {formData.education.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('education', i)}
                                        className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium text-sm"
                                    >
                                        <Trash2 className="w-4 h-4" /> Remove
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Experience */}
                <section className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Briefcase className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">Work Experience</h3>
                        </div>
                        <button
                            type="button"
                            onClick={() => addArrayItem('experience', { company: '', position: '', startMonth: '', startYear: '', endMonth: '', endYear: '', description: '' })}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
                        >
                            <Plus className="w-4 h-4" /> Add Experience
                        </button>
                    </div>
                    <div className="space-y-4">
                        {formData.experience.map((exp, i) => (
                            <div key={i} className="p-5 border-2 border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white hover:border-green-300 transition-all">
                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                    <input
                                        type="text"
                                        placeholder="Company"
                                        value={exp.company}
                                        onChange={(e) => handleArrayItemChange('experience', i, 'company', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Position/Role"
                                        value={exp.position}
                                        onChange={(e) => handleArrayItemChange('experience', i, 'position', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <select
                                                value={exp.startMonth}
                                                onChange={(e) => handleArrayItemChange('experience', i, 'startMonth', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            >
                                                <option value="">Month</option>
                                                {months.map(month => (
                                                    <option key={month} value={month}>{month}</option>
                                                ))}
                                            </select>
                                            <select
                                                value={exp.startYear}
                                                onChange={(e) => handleArrayItemChange('experience', i, 'startYear', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            >
                                                <option value="">Year</option>
                                                {years.map(year => (
                                                    <option key={year} value={year}>{year}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">End Date (or Present)</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <select
                                                value={exp.endMonth}
                                                onChange={(e) => handleArrayItemChange('experience', i, 'endMonth', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            >
                                                <option value="">Month</option>
                                                <option value="Present">Present</option>
                                                {months.map(month => (
                                                    <option key={month} value={month}>{month}</option>
                                                ))}
                                            </select>
                                            <select
                                                value={exp.endYear}
                                                onChange={(e) => handleArrayItemChange('experience', i, 'endYear', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                                disabled={exp.endMonth === 'Present'}
                                            >
                                                <option value="">Year</option>
                                                {years.map(year => (
                                                    <option key={year} value={year}>{year}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <textarea
                                    placeholder="Describe your responsibilities and achievements..."
                                    value={exp.description}
                                    onChange={(e) => handleArrayItemChange('experience', i, 'description', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-2"
                                />
                                {formData.experience.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('experience', i)}
                                        className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium text-sm"
                                    >
                                        <Trash2 className="w-4 h-4" /> Remove
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Certifications */}
                <section className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <Award className="w-6 h-6 text-yellow-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800">Certifications</h3>
                        </div>
                        <button
                            type="button"
                            onClick={() => addArrayItem('certifications', '')}
                            className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all shadow-md hover:shadow-lg"
                        >
                            <Plus className="w-4 h-4" /> Add Certification
                        </button>
                    </div>
                    <div className="space-y-3">
                        {formData.certifications.map((cert, i) => (
                            <div key={i} className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Certification name"
                                    value={cert}
                                    onChange={(e) => handleArrayItemChange('certifications', i, null, e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                />
                                {formData.certifications.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem('certifications', i)}
                                        className="p-2 text-red-600 hover:text-red-700 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Skills Section */}
                <section className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-pink-500">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-pink-100 rounded-lg">
                            <Lightbulb className="w-6 h-6 text-pink-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">Skills</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Soft Skills */}
                        <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                            <div className="flex items-center gap-2 mb-3">
                                <Lightbulb className="w-5 h-5 text-blue-600" />
                                <h4 className="text-lg font-bold text-gray-800">Soft Skills</h4>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">Type and press Enter to add</p>
                            <input
                                type="text"
                                placeholder="e.g., Leadership, Communication..."
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && e.target.value.trim()) {
                                        e.preventDefault();
                                        const newSkills = [...formData.softSkills.filter(s => s.trim())];
                                        newSkills.push(e.target.value.trim());
                                        setFormData({ ...formData, softSkills: newSkills });
                                        e.target.value = '';
                                    }
                                }}
                                className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                            />
                            <div className="flex flex-wrap gap-2">
                                {formData.softSkills.filter(s => s.trim()).map((skill, i) => (
                                    <div
                                        key={i}
                                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all"
                                    >
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const updated = formData.softSkills.filter((_, idx) => idx !== i);
                                                setFormData({ ...formData, softSkills: updated.length ? updated : [''] });
                                            }}
                                            className="hover:bg-blue-600 rounded-full w-5 h-5 flex items-center justify-center"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hard Skills */}
                        <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                            <div className="flex items-center gap-2 mb-3">
                                <Code className="w-5 h-5 text-green-600" />
                                <h4 className="text-lg font-bold text-gray-800">Hard Skills</h4>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">Type and press Enter to add</p>
                            <input
                                type="text"
                                placeholder="e.g., Python, React, SQL..."
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && e.target.value.trim()) {
                                        e.preventDefault();
                                        const newSkills = [...formData.hardSkills.filter(s => s.trim())];
                                        newSkills.push(e.target.value.trim());
                                        setFormData({ ...formData, hardSkills: newSkills });
                                        e.target.value = '';
                                    }
                                }}
                                className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-3"
                            />
                            <div className="flex flex-wrap gap-2">
                                {formData.hardSkills.filter(s => s.trim()).map((skill, i) => (
                                    <div
                                        key={i}
                                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500 text-white rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all"
                                    >
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const updated = formData.hardSkills.filter((_, idx) => idx !== i);
                                                setFormData({ ...formData, hardSkills: updated.length ? updated : [''] });
                                            }}
                                            className="hover:bg-green-600 rounded-full w-5 h-5 flex items-center justify-center"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-12 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-lg font-semibold rounded-xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Generating Resume...
                            </span>
                        ) : (
                            'Generate AI Resume ✨'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResumeForm;