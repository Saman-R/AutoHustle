import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Upload, FileText } from 'lucide-react';
import { useSearchParams } from "react-router-dom";
import ResumeUpload from '../components/ResumeUpload';
import ResumeForm from '../components/ResumeForm';
import ApproachSelector from '../components/ApproachSelector';

// Main Parent Component - Info.jsx
const Info = () => {
    const [selectedApproach, setSelectedApproach] = useState(null);
    const [file, setFile] = useState(null);
    const [dragOver, setDragOver] = useState(false);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const approachFromURL = searchParams.get("approach");
        if (approachFromURL === "form" || approachFromURL === "upload") {
            setSelectedApproach(approachFromURL);
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 px-4 pt-20 pb-10">
            <div className="max-w-4xl mx-auto">
                {!selectedApproach && (
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">AI Resume Generator</h1>
                        <p className="text-gray-600">Choose how you'd like to create your resume</p>
                    </div>
                )}

                {!selectedApproach ? (
                    <ApproachSelector onSelect={setSelectedApproach} />
                ) : selectedApproach === 'upload' ? (
                    <ResumeUpload
                        setApproach={setSelectedApproach}
                        file={file}
                        setFile={setFile}
                        dragOver={dragOver}
                        setDragOver={setDragOver}
                    />
                ) : (
                    <ResumeForm setApproach={setSelectedApproach} />
                )}
            </div>
        </div>
    );
};
export default Info;