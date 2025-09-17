// src/Pages/UserInfo.jsx
import { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import ResumeUpload from "../components/ResumeUpload";
import FormStep from "../components/FormStep";
import ProgressBar from "../components/ProgressBar";
import NavigationButtons from "../components/NavigationButtons";
import ApproachSelector from "../components/ApproachSelector";
import ModernBackground from "../components/ModernBackground"; // ✅ reuse background

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
    const totalSteps = 5;

    // Load saved state
    useEffect(() => {
        const savedData = localStorage.getItem("resumeFormData");
        const savedStep = localStorage.getItem("resumeCurrentStep");
        const savedApproach = localStorage.getItem("resumeApproach");
        if (savedData) setFormData(JSON.parse(savedData));
        if (savedStep) setCurrentStep(parseInt(savedStep));
        if (savedApproach) setApproach(savedApproach);
    }, []);

    // Save state
    useEffect(() => {
        localStorage.setItem("resumeFormData", JSON.stringify(formData));
        localStorage.setItem("resumeCurrentStep", currentStep.toString());
        localStorage.setItem("resumeApproach", approach || "");
    }, [formData, currentStep, approach]);

    const addSkill = (type, value) => {
        if (value.trim()) {
            if (type === "hard") {
                setFormData((prev) => ({
                    ...prev,
                    hardSkills: [...prev.hardSkills, value.trim()],
                }));
                setHardSkillInput("");
            } else {
                setFormData((prev) => ({
                    ...prev,
                    softSkills: [...prev.softSkills, value.trim()],
                }));
                setSoftSkillInput("");
            }
        }
    };

    const removeSkill = (type, index) => {
        if (type === "hard") {
            setFormData((prev) => ({
                ...prev,
                hardSkills: prev.hardSkills.filter((_, i) => i !== index),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                softSkills: prev.softSkills.filter((_, i) => i !== index),
            }));
        }
    };

    const handleKeyPress = (e, type) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (type === "hard") addSkill("hard", hardSkillInput);
            else addSkill("soft", softSkillInput);
        }
    };

    const goToStep = (step) => {
        if (step >= 1 && step <= totalSteps) setCurrentStep(step);
    };

    return (
        <div className="relative min-h-screen">
            {/* Background */}
            <ModernBackground
                colorScheme="default"
                intensity="normal"
                showMouseInteraction={true}
            />

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
                <Motion.div
                    className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-200 p-8 w-full max-w-3xl relative z-10"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {/* Header */}
                    {!approach ? (
                        <>
                            <Motion.h2
                                className="text-3xl font-bold text-gray-800 text-center mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                Set Up Your Profile
                            </Motion.h2>
                            <Motion.p
                                className="text-gray-600 text-center mb-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                Choose how you’d like to provide your information.
                            </Motion.p>
                            <ApproachSelector setApproach={setApproach} />
                        </>
                    ) : approach === "upload" ? (
                        <ResumeUpload
                            setApproach={setApproach}
                            file={file}
                            setFile={setFile}
                            dragOver={dragOver}
                            setDragOver={setDragOver}
                        />
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setApproach(null)}
                                className="absolute top-0 left-0 p-3 rounded-full bg-white hover:bg-gray-50 transition-all duration-300 group z-10 border border-gray-200"
                                aria-label="Go Back"
                            >
                                <ArrowLeft className="w-6 h-6 text-gray-700 group-hover:scale-110 transition-transform" />
                            </button>
                            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                                Fill Out Your Info
                            </h2>
                            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} goToStep={goToStep} />
                            <FormStep
                                currentStep={currentStep}
                                formData={formData}
                                setFormData={setFormData}
                                hardSkillInput={hardSkillInput}
                                setHardSkillInput={setHardSkillInput}
                                softSkillInput={softSkillInput}
                                setSoftSkillInput={setSoftSkillInput}
                                handleKeyPress={handleKeyPress}
                                removeSkill={removeSkill}
                            />
                            <NavigationButtons
                                currentStep={currentStep}
                                totalSteps={totalSteps}
                                goToStep={goToStep}
                                onSubmit={() => {
                                    localStorage.removeItem("resumeFormData");
                                    localStorage.removeItem("resumeCurrentStep");
                                    localStorage.removeItem("resumeApproach");
                                    alert("Resume submitted successfully!");
                                }}
                            />
                        </div>
                    )}
                </Motion.div>
            </div>
        </div>
    );
}

export default UserInfo;
