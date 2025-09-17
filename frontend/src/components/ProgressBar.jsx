import React from "react";

function ProgressBar({ currentStep, totalSteps, goToStep }) {
    const progressPercentage = (currentStep / totalSteps) * 100;

    return (
        <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Step {currentStep} of {totalSteps}</span>
                <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 border border-gray-300">
                <div
                    className="bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 h-full rounded-full transition-all duration-500 ease-out shadow-lg"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
            {/* <div className="flex justify-center mb-8 space-x-3">
                {Array.from({ length: totalSteps }, (_, i) => (
                    <div
                        key={i}
                        onClick={() => goToStep(i + 1)}
                        className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 border ${currentStep === i + 1
                                ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white scale-110 shadow-lg border-transparent"
                                : currentStep > i + 1
                                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-transparent"
                                    : "bg-white text-gray-600 hover:bg-gray-50 border-gray-300"
                            }`}
                    >
                        {currentStep > i + 1 ? "✓" : i + 1}
                    </div>
                ))}
            </div> */}
        </div>
    );
}

export default ProgressBar;