import React from "react";

function NavigationButtons({ currentStep, totalSteps, goToStep, onSubmit }) {
    return (
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
                disabled={currentStep === 1}
                onClick={() => goToStep(currentStep - 1)}
                className="px-6 py-3 rounded-xl bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all border border-gray-300"
            >
                Previous
            </button>
            {currentStep < totalSteps ? (
                <button
                    onClick={() => goToStep(currentStep + 1)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl"
                >
                    Next
                </button>
            ) : (
                <button
                    onClick={onSubmit}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl"
                >
                    Submit Resume
                </button>
            )}
        </div>
    );
}

export default NavigationButtons;