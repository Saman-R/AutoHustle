import { Upload, FileEdit } from "lucide-react";

function ApproachSelector({ setApproach }) {
    return (
        <div className="text-center">
           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <button
                    onClick={() => setApproach("upload")}
                    className="group flex flex-col items-center gap-6 p-8 rounded-2xl bg-white border border-gray-200 text-gray-800 font-medium shadow-lg hover:bg-gray-50 hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                    <Upload
                        size={64}
                        className="text-blue-600 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-xl">Upload Resume</span>
                </button>
                <button
                    onClick={() => setApproach("form")}
                    className="group flex flex-col items-center gap-6 p-8 rounded-2xl bg-white border border-gray-200 text-gray-800 font-medium shadow-lg hover:bg-gray-50 hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                    <FileEdit
                        size={64}
                        className="text-cyan-600 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-xl">Create New Resume</span>
                </button>
            </div>
        </div>
    );
}

export default ApproachSelector;