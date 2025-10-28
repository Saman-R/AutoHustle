import React, { useState } from 'react';
import { Plus, Trash2, Upload, FileText } from 'lucide-react';
import ResumeUpload from '../components/ResumeUpload';
import ResumeForm from '../components/ResumeForm';
import ApproachSelector from '../components/ApproachSelector';

// Main Parent Component - Info.jsx
const Info = () => {
    const [selectedApproach, setSelectedApproach] = useState(null);
    const [file, setFile] = useState(null);
    const [dragOver, setDragOver] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 pt-20">
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