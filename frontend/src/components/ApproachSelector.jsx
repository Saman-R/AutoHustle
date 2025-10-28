// Approach Selector Component
import React from 'react';
import { Upload, FileText } from 'lucide-react';

// Approach Selector Component
const ApproachSelector = ({ onSelect }) => {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            <div
                onClick={() => onSelect('upload')}
                className="bg-white rounded-xl shadow-lg p-8 cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-indigo-500"
            >
                <div className="flex flex-col items-center text-center">
                    <div className="bg-indigo-100 p-4 rounded-full mb-4">
                        <Upload className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Resume</h2>
                    <p className="text-gray-600">
                        Upload your existing resume and let AI enhance it
                    </p>
                </div>
            </div>

            <div
                onClick={() => onSelect('form')}
                className="bg-white rounded-xl shadow-lg p-8 cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-indigo-500"
            >
                <div className="flex flex-col items-center text-center">
                    <div className="bg-green-100 p-4 rounded-full mb-4">
                        <FileText className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Fill Form</h2>
                    <p className="text-gray-600">
                        Enter your information manually and generate a resume
                    </p>
                </div>
            </div>
        </div>
    );
};
export default ApproachSelector;