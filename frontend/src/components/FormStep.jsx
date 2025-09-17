import { User, Mail, Phone, Linkedin, X, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function FormStep({
    currentStep,
    formData,
    setFormData,
    hardSkillInput,
    setHardSkillInput,
    softSkillInput,
    setSoftSkillInput,
    handleKeyPress,
    removeSkill,
}) {
    const navigate = useNavigate();

    const inputClasses =
        "w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm";

    // Helper for dynamic list fields (Education, Experience)
    const renderListFields = (list, setList, fields, title) => {
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
            setList(list.filter((_, i) => i !== index));
        };

        return (
            <div className="space-y-6">
                {list.map((item, index) => (
                    <div
                        key={index}
                        className="p-6 bg-white border border-gray-200 rounded-2xl space-y-4 shadow-sm"
                    >
                        {fields.map((field) => (
                            <div key={field}>
                                <label className="block mb-2 text-gray-700 capitalize font-medium">
                                    {field.replace(/_/g, " ")}
                                </label>
                                {field.includes("date") ? (
                                    <input
                                        type="date"
                                        value={item[field]}
                                        onChange={(e) =>
                                            handleChange(index, field, e.target.value)
                                        }
                                        className={inputClasses}
                                    />
                                ) : field === "description" ? (
                                    <textarea
                                        placeholder={`Enter ${field.replace(/_/g, " ")}`}
                                        value={item[field]}
                                        onChange={(e) =>
                                            handleChange(index, field, e.target.value)
                                        }
                                        className={`${inputClasses} min-h-[100px] resize-none`}
                                        rows={4}
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        placeholder={`Enter ${field.replace(/_/g, " ")}`}
                                        value={item[field]}
                                        onChange={(e) =>
                                            handleChange(index, field, e.target.value)
                                        }
                                        className={inputClasses}
                                    />
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => removeEntry(index)}
                            className="inline-flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                        >
                            <X size={16} className="mr-1" />
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addEntry}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl"
                >
                    <Plus size={20} className="mr-2" />
                    Add {title}
                </button>
            </div>
        );
    };

    switch (currentStep) {
        case 1: // Personal Information
            return (
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">
                        Personal Information
                    </h3>
                    <div className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className={`${inputClasses} pl-12`}
                            />
                        </div>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className={`${inputClasses} pl-12`}
                            />
                        </div>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="tel"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className={`${inputClasses} pl-12`}
                            />
                        </div>
                        <div className="relative">
                            <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="text"
                                placeholder="LinkedIn profile link"
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
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Education</h3>
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
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Work Experience</h3>
                    {renderListFields(
                        formData.experienceList,
                        (val) => setFormData({ ...formData, experienceList: val }),
                        ["company_name", "role", "start_date", "end_date", "description"],
                        "Experience"
                    )}
                </div>
            );

        case 4: // Skills
            return (
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Skills</h3>
                    <div className="space-y-6">
                        {/* Hard Skills */}
                        <div>
                            <label className="block mb-2 text-gray-700 font-medium">Hard Skills</label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {formData.hardSkills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-lg"
                                    >
                                        {skill}
                                        <X
                                            size={14}
                                            className="ml-2 cursor-pointer"
                                            onClick={() => removeSkill("hard", index)}
                                        />
                                    </span>
                                ))}
                            </div>
                            <input
                                type="text"
                                placeholder="Add a hard skill and press Enter"
                                value={hardSkillInput}
                                onChange={(e) => setHardSkillInput(e.target.value)}
                                onKeyDown={(e) => handleKeyPress(e, "hard")}
                                className={inputClasses}
                            />
                        </div>

                        {/* Soft Skills */}
                        <div>
                            <label className="block mb-2 text-gray-700 font-medium">Soft Skills</label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {formData.softSkills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-lg"
                                    >
                                        {skill}
                                        <X
                                            size={14}
                                            className="ml-2 cursor-pointer"
                                            onClick={() => removeSkill("soft", index)}
                                        />
                                    </span>
                                ))}
                            </div>
                            <input
                                type="text"
                                placeholder="Add a soft skill and press Enter"
                                value={softSkillInput}
                                onChange={(e) => setSoftSkillInput(e.target.value)}
                                onKeyDown={(e) => handleKeyPress(e, "soft")}
                                className={inputClasses}
                            />
                        </div>
                    </div>
                </div>
            );

        case 5: // Review / Final Step
            return (
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6">Review Your Info</h3>
                    <p className="text-gray-600 mb-6">Preview all your entered details before submission.</p>

                    <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-2">
                        <p><strong>Name:</strong> {formData.name}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Phone:</strong> {formData.phone}</p>
                        <p><strong>LinkedIn:</strong> {formData.linkedin}</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/userinfo")}
                        className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-700 transition-all"
                    >
                        Continue
                    </button>
                </div>
            );

        default:
            return null;
    }
}

export default FormStep;
