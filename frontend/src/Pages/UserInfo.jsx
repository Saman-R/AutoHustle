import React, { useState, useEffect } from "react";
import {
    Upload,
    FileEdit,
    UploadCloud,
    ArrowLeft,
    User,
    Mail,
    Phone,
    Linkedin,
    X,
    Plus
} from "lucide-react";
import bg from '../assets/bg.jpg';

function UserInfo() {
    const [approach, setApproach] = useState(null);
    const [file, setFile] = useState(null);
    const [dragOver, setDragOver] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        hardSkills: [],
        softSkills: [],
        educationList: [],
        experienceList: [],
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [hardSkillInput, setHardSkillInput] = useState("");
    const [softSkillInput, setSoftSkillInput] = useState("");
    const totalSteps = 6; // Added review step

    // Auto-save functionality
    useEffect(() => {
        const savedData = localStorage.getItem('resumeFormData');
        const savedStep = localStorage.getItem('resumeCurrentStep');
        const savedApproach = localStorage.getItem('resumeApproach');

        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
        if (savedStep) {
            setCurrentStep(parseInt(savedStep));
        }
        if (savedApproach) {
            setApproach(savedApproach);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('resumeFormData', JSON.stringify(formData));
        localStorage.setItem('resumeCurrentStep', currentStep.toString());
        localStorage.setItem('resumeApproach', approach || '');
    }, [formData, currentStep, approach]);

    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile && ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(uploadedFile.type)) {
            setFile(uploadedFile);
        } else {
            alert('Please upload only PDF, DOC, or DOCX files.');
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const uploadedFile = e.dataTransfer.files[0];
        if (uploadedFile && ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(uploadedFile.type)) {
            setFile(uploadedFile);
        } else {
            alert('Please upload only PDF, DOC, or DOCX files.');
        }
    };

    const goToStep = (step) => {
        if (step >= 1 && step <= totalSteps) setCurrentStep(step);
    };

    const addSkill = (type, value) => {
        if (value.trim()) {
            if (type === 'hard') {
                setFormData(prev => ({
                    ...prev,
                    hardSkills: [...prev.hardSkills, value.trim()]
                }));
                setHardSkillInput("");
            } else {
                setFormData(prev => ({
                    ...prev,
                    softSkills: [...prev.softSkills, value.trim()]
                }));
                setSoftSkillInput("");
            }
        }
    };

    const removeSkill = (type, index) => {
        if (type === 'hard') {
            setFormData(prev => ({
                ...prev,
                hardSkills: prev.hardSkills.filter((_, i) => i !== index)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                softSkills: prev.softSkills.filter((_, i) => i !== index)
            }));
        }
    };

    const handleKeyPress = (e, type) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (type === 'hard') {
                addSkill('hard', hardSkillInput);
            } else {
                addSkill('soft', softSkillInput);
            }
        }
    };

    // Helper to render list inputs
    const renderListFields = (list, setList, fields, title) => {
        const inputClasses = "w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all";

        const handleChange = (index, field, value) => {
            const updated = [...list];
            updated[index][field] = value;
            setList(updated);
        };

        const addEntry = () => {
            const newEntry = fields.reduce((acc, f) => ({ ...acc, [f]: "" }), {});
            setList([...list, newEntry]);
        };

        const removeEntry = (index) => {
            const updated = list.filter((_, i) => i !== index);
            setList(updated);
        };

        return (
            <div className="space-y-6">
                {list.map((item, index) => (
                    <div key={index} className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl space-y-4">
                        {fields.map((field) => (
                            <div key={field}>
                                <label className="block mb-2 text-white/90 capitalize font-medium">
                                    {field.replace(/_/g, " ")}
                                </label>
                                {field.includes("date") ? (
                                    <input
                                        type="date"
                                        value={item[field]}
                                        onChange={(e) => handleChange(index, field, e.target.value)}
                                        className={inputClasses}
                                    />
                                ) : field === "description" ? (
                                    <textarea
                                        placeholder={`Enter ${field.replace(/_/g, " ")}`}
                                        value={item[field]}
                                        onChange={(e) => handleChange(index, field, e.target.value)}
                                        className={`${inputClasses} min-h-[100px] resize-none`}
                                        rows={4}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        placeholder={`Enter ${field.replace(/_/g, " ")}`}
                                        value={item[field]}
                                        onChange={(e) => handleChange(index, field, e.target.value)}
                                        className={inputClasses}
                                    />
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => removeEntry(index)}
                            className="inline-flex items-center px-3 py-1 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                            <X size={16} className="mr-1" />
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addEntry}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
                >
                    <Plus size={20} className="mr-2" />
                    Add {title}
                </button>
            </div>
        );
    };

    const renderStep = () => {
        const inputClasses = "w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all";

        switch (currentStep) {
            case 1: // Personal Info
                return (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white mb-6">Personal Information</h3>

                        <div className="space-y-4">
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={20} />
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className={`${inputClasses} pl-12`}
                                />
                            </div>

                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={20} />
                                <input
                                    type="email"
                                    placeholder="example@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className={`${inputClasses} pl-12`}
                                />
                            </div>

                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={20} />
                                <input
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className={`${inputClasses} pl-12`}
                                />
                            </div>

                            <div className="relative">
                                <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={20} />
                                <input
                                    type="url"
                                    placeholder="https://linkedin.com/in/username"
                                    value={formData.linkedin}
                                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                    className={`${inputClasses} pl-12`}
                                />
                            </div>
                        </div>
                    </div>
                );

            case 2: // Education
                return (
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-6">Education</h3>
                        {renderListFields(
                            formData.educationList,
                            (val) => setFormData({ ...formData, educationList: val }),
                            ["institute_name", "degree", "score", "start_date", "end_date", "description"],
                            "Education"
                        )}
                    </div>
                );

            case 3: // Experience
                return (
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-6">Experience</h3>
                        {renderListFields(
                            formData.experienceList,
                            (val) => setFormData({ ...formData, experienceList: val }),
                            ["company_name", "position", "start_date", "end_date", "description"],
                            "Experience"
                        )}
                    </div>
                );

            case 4: // Skills
                return (
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-white mb-6">Skills</h3>

                        <div>
                            <label className="block mb-3 text-white/90 font-medium">Hard Skills</label>
                            <input
                                type="text"
                                placeholder="Type a skill and press Enter..."
                                value={hardSkillInput}
                                onChange={(e) => setHardSkillInput(e.target.value)}
                                onKeyPress={(e) => handleKeyPress(e, 'hard')}
                                className={inputClasses}
                            />
                            <div className="flex flex-wrap gap-2 mt-4">
                                {formData.hardSkills.map((skill, index) => (
                                    <div key={index} className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-full border border-cyan-500/30">
                                        <span className="mr-2">{skill}</span>
                                        <button
                                            onClick={() => removeSkill('hard', index)}
                                            className="text-cyan-400 hover:text-red-400 transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block mb-3 text-white/90 font-medium">Soft Skills</label>
                            <input
                                type="text"
                                placeholder="Type a skill and press Enter..."
                                value={softSkillInput}
                                onChange={(e) => setSoftSkillInput(e.target.value)}
                                onKeyPress={(e) => handleKeyPress(e, 'soft')}
                                className={inputClasses}
                            />
                            <div className="flex flex-wrap gap-2 mt-4">
                                {formData.softSkills.map((skill, index) => (
                                    <div key={index} className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full border border-purple-500/30">
                                        <span className="mr-2">{skill}</span>
                                        <button
                                            onClick={() => removeSkill('soft', index)}
                                            className="text-purple-400 hover:text-red-400 transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 5: // Review
                return (
                    <div className="space-y-8">
                        <h3 className="text-2xl font-bold text-white mb-6">Review Your Information</h3>

                        <div className="space-y-6">
                            {/* Personal Info */}
                            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                                <h4 className="text-lg font-semibold text-white mb-4">Personal Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                                    <p><span className="text-white font-medium">Name:</span> {formData.name || 'Not provided'}</p>
                                    <p><span className="text-white font-medium">Email:</span> {formData.email || 'Not provided'}</p>
                                    <p><span className="text-white font-medium">Phone:</span> {formData.phone || 'Not provided'}</p>
                                    <p><span className="text-white font-medium">LinkedIn:</span> {formData.linkedin || 'Not provided'}</p>
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                                <h4 className="text-lg font-semibold text-white mb-4">Skills</h4>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-white font-medium mb-2">Hard Skills:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.hardSkills.map((skill, index) => (
                                                <span key={index} className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30 text-sm">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-white font-medium mb-2">Soft Skills:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.softSkills.map((skill, index) => (
                                                <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30 text-sm">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Education */}
                            {formData.educationList.length > 0 && (
                                <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                                    <h4 className="text-lg font-semibold text-white mb-4">Education</h4>
                                    <div className="space-y-4">
                                        {formData.educationList.map((edu, index) => (
                                            <div key={index} className="border-l-4 border-cyan-500 pl-4">
                                                <p className="text-white font-medium">{edu.degree} - {edu.institute_name}</p>
                                                <p className="text-gray-300 text-sm">{edu.start_date} - {edu.end_date}</p>
                                                <p className="text-gray-400 text-sm">{edu.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Experience */}
                            {formData.experienceList.length > 0 && (
                                <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                                    <h4 className="text-lg font-semibold text-white mb-4">Experience</h4>
                                    <div className="space-y-4">
                                        {formData.experienceList.map((exp, index) => (
                                            <div key={index} className="border-l-4 border-purple-500 pl-4">
                                                <p className="text-white font-medium">{exp.position} - {exp.company_name}</p>
                                                <p className="text-gray-300 text-sm">{exp.start_date} - {exp.end_date}</p>
                                                <p className="text-gray-400 text-sm">{exp.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const progressPercentage = (currentStep / totalSteps) * 100;

    return (
        <div
            className="relative min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
            style={{ backgroundImage: `url(${bg})`, paddingTop: "80px" }}
        >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

            <div className="relative z-10 w-full max-w-4xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8">
                {/* Choice Page */}
                {!approach && (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white mb-8">Choose an Option</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                            {/* Upload Resume Option */}
                            <button
                                onClick={() => setApproach("upload")}
                                className="group flex flex-col items-center gap-6 p-8 rounded-2xl bg-white/10 border border-white/20 text-white font-medium shadow-lg hover:bg-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300"
                            >
                                <Upload size={64} className="group-hover:scale-110 transition-transform duration-300" />
                                <span className="text-xl">Upload Resume</span>
                            </button>

                            {/* Fill Form Option */}
                            <button
                                onClick={() => setApproach("form")}
                                className="group flex flex-col items-center gap-6 p-8 rounded-2xl bg-white/10 border border-white/20 text-white font-medium shadow-lg hover:bg-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300"
                            >
                                <FileEdit size={64} className="group-hover:scale-110 transition-transform duration-300" />
                                <span className="text-xl">Fill Form Step-by-Step</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Upload Resume */}
                {approach === "upload" && (
                    <div className="relative">
                        {/* Back Icon */}
                        <button
                            onClick={() => setApproach(null)}
                            className="absolute top-0 left-0 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group"
                            aria-label="Go Back"
                        >
                            <ArrowLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                        </button>

                        <h2 className="text-3xl font-bold text-white mb-8 text-center">Upload Your Resume</h2>

                        <label
                            onDragOver={(e) => {
                                e.preventDefault();
                                setDragOver(true);
                            }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={handleDrop}
                            className={`block w-full min-h-[300px] p-12 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all duration-300 ${dragOver
                                    ? "border-cyan-400 bg-cyan-500/10 scale-105"
                                    : "border-gray-400 hover:border-white hover:bg-white/5"
                                }`}
                        >
                            <div className="flex flex-col items-center justify-center h-full gap-6">
                                <UploadCloud
                                    className="w-20 h-20 text-white transition-all duration-300 hover:scale-110"
                                    strokeWidth={1.5}
                                />
                                <div className="space-y-2">
                                    <p className="text-white text-xl font-medium">
                                        {file ? `✓ Uploaded: ${file.name}` : "Drag & drop your resume here"}
                                    </p>
                                    <p className="text-gray-300 text-sm">Only PDF, DOC, or DOCX files allowed (Max 10MB)</p>
                                    <p className="text-gray-300 text-sm">or click to browse</p>
                                </div>
                            </div>
                            <input
                                type="file"
                                accept=".pdf, .doc, .docx"
                                className="hidden"
                                onChange={handleFileUpload}
                            />
                        </label>

                        {file && (
                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => alert("Resume uploaded successfully! Processing...")}
                                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl"
                                >
                                    Process Resume
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {approach === "form" && (
                    <div className="relative">
                        {/* Back Icon */}
                        <button
                            onClick={() => setApproach(null)}
                            className="absolute top-0 left-0 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group z-10"
                            aria-label="Go Back"
                        >
                            <ArrowLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                        </button>

                        <h2 className="text-3xl font-bold text-white mb-8 text-center">Fill Out Your Info</h2>

                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between text-sm text-gray-300 mb-2">
                                <span>Step {currentStep} of {totalSteps}</span>
                                <span>{Math.round(progressPercentage)}% Complete</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-3 backdrop-blur-sm border border-white/20">
                                <div
                                    className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 h-full rounded-full transition-all duration-500 ease-out shadow-lg"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Steps Navigation */}
                        <div className="flex justify-center mb-8 space-x-3">
                            {Array.from({ length: totalSteps }, (_, i) => (
                                <div
                                    key={i}
                                    onClick={() => goToStep(i + 1)}
                                    className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 ${currentStep === i + 1
                                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white scale-110 shadow-lg"
                                            : currentStep > i + 1
                                                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                                                : "bg-white/20 text-gray-300 hover:bg-white/30"
                                        }`}
                                >
                                    {currentStep > i + 1 ? "✓" : i + 1}
                                </div>
                            ))}
                        </div>

                        <div className="min-h-[400px]">
                            {renderStep()}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                            <button
                                disabled={currentStep === 1}
                                onClick={() => goToStep(currentStep - 1)}
                                className="px-6 py-3 rounded-xl bg-white/10 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-all border border-white/20"
                            >
                                Previous
                            </button>
                            {currentStep < totalSteps ? (
                                <button
                                    onClick={() => goToStep(currentStep + 1)}
                                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('resumeFormData');
                                        localStorage.removeItem('resumeCurrentStep');
                                        localStorage.removeItem('resumeApproach');
                                        alert("Resume submitted successfully!");
                                    }}
                                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl"
                                >
                                    Submit Resume
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserInfo;