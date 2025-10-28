import { motion as Motion } from "framer-motion";
import { UploadCloud, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResumeUpload({ setApproach, file, setFile, dragOver, setDragOver }) {
    const [isUploading, setIsUploading] = useState(false);
    const [jobDescription, setJobDescription] = useState("");
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const navigate = useNavigate();

    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        if (
            uploadedFile &&
            [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ].includes(uploadedFile.type)
        ) {
            setFile(uploadedFile);
        } else {
            alert("Please upload only PDF, DOC, or DOCX files.");
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const uploadedFile = e.dataTransfer.files[0];
        if (
            uploadedFile &&
            [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ].includes(uploadedFile.type)
        ) {
            setFile(uploadedFile);
        } else {
            alert("Please upload only PDF, DOC, or DOCX files.");
        }
    };

    const handleUpload = async () => {
        if (!file || !jobDescription.trim()) {
            alert("Please upload a resume and provide a job description.");
            return;
        }

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("resume_file", file);
            formData.append("job_description", jobDescription);
            formData.append("profile_text", ""); // optional text
            formData.append("name", name);
            formData.append("contact", contact);

            const response = await fetch("http://localhost:8000/api/generate-resume", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to generate resume");

            const result = await response.json();

            const storedResumes = JSON.parse(localStorage.getItem("resumes") || "[]");
            storedResumes.push({
                id: Date.now(),
                timestamp: new Date().toLocaleString(),
                resume_html: result.resume_html,
                cold_email: result.cold_email,
                resume_json: result.resume_json,
                personal_info: result.personal_info,
            });
            localStorage.setItem("resumes", JSON.stringify(storedResumes));

            alert("✅ Resume generated successfully!");
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            alert("Error generating resume. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="relative max-w-4xl mx-auto mt-10 p-6">
            {/* White Card Container */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 relative">
                {/* Back Button */}
                <button
                    onClick={() => setApproach(null)}
                    className="absolute top-4 left-4 p-3 rounded-full backdrop-blur-sm hover:bg-gray-50 transition-all duration-300 group border border-gray-200 shadow-sm z-10"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-700 group-hover:scale-110 transition-transform" />
                </button>

                <Motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Upload Your Resume & Job Details
                    </h2>

                    {/* Job Description */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Job Description / Role
                        </label>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste job description or role details here..."
                            rows={4}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Name & Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Contact Info (optional)"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Upload Box */}
                    <label
                        onDragOver={(e) => {
                            e.preventDefault();
                            setDragOver(true);
                        }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={handleDrop}
                        className={`block w-full min-h-[250px] p-8 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all duration-300 ${dragOver
                            ? "border-blue-400 bg-blue-50 scale-[1.02]"
                            : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                            }`}
                    >
                        <div className="flex flex-col items-center justify-center h-full gap-5">
                            <UploadCloud
                                className="w-20 h-20 text-blue-600 transition-all duration-300 hover:scale-110"
                                strokeWidth={1.5}
                            />
                            <div className="space-y-2">
                                <p className="text-gray-800 text-lg font-medium">
                                    {file ? `✓ Uploaded: ${file.name}` : "Drag & drop your resume here"}
                                </p>
                                <p className="text-gray-600 text-sm">
                                    Only PDF, DOC, or DOCX files allowed (Max 10MB)
                                </p>
                                <p className="text-gray-500 text-sm">or click to browse</p>
                            </div>
                        </div>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                    </label>

                    {/* Upload Button */}
                    {file && (
                        <div className="text-center">
                            <Motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={handleUpload}
                                disabled={isUploading}
                                className={`px-8 py-3 rounded-2xl text-white font-semibold shadow-lg transition-all ${isUploading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                                    }`}
                            >
                                {isUploading ? "Generating..." : "Generate Resume"}
                            </Motion.button>
                        </div>
                    )}
                </Motion.div>
            </div>
        </div>
    );
}

export default ResumeUpload;
