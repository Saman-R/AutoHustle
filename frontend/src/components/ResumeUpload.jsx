// src/components/ResumeUpload.jsx
import { motion as Motion } from "framer-motion";
import { UploadCloud, ArrowLeft } from "lucide-react";
import { useState } from "react";

function ResumeUpload({ setApproach, file, setFile, dragOver, setDragOver }) {
    const [isUploading, setIsUploading] = useState(false);

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
        if (!file) return;
        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append("resume", file);

            const response = await fetch("http://localhost:5000/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to upload file");
            }

            const result = await response.json();
            alert("Resume uploaded successfully!");
            console.log("Server response:", result);
            // 👉 here you can redirect to next step (e.g., /userinfo) if needed
            // navigate("/userinfo");
        } catch (error) {
            console.error(error);
            alert("Error uploading resume. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
        >
            {/* Back button */}
            <button
                onClick={() => setApproach(null)}
                className="absolute top-0 left-0 p-3 rounded-full bg-white/80 backdrop-blur-sm hover:bg-gray-50 transition-all duration-300 group border border-gray-200 shadow-sm"
                aria-label="Go Back"
            >
                <ArrowLeft className="w-6 h-6 text-gray-700 group-hover:scale-110 transition-transform" />
            </button>

            {/* Heading */}
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Upload Your Resume
            </h2>

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
                <div className="mt-6 text-center">
                    <Motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleUpload}
                        disabled={isUploading}
                        className={`px-8 py-3 rounded-2xl text-white font-semibold shadow-lg transition-all 
                                   ${isUploading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                            }`}
                    >
                        {isUploading ? "Uploading..." : "Upload"}
                    </Motion.button>
                </div>
            )}
        </Motion.div>
    );
}

export default ResumeUpload;
