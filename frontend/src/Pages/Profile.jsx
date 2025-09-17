import { useEffect, useState } from "react";

export default function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const email = sessionStorage.getItem("userEmail");
        console.log("Email from sessionStorage:", email);
        if (!email) return;

        // Fetch from backend
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8000/users-email/${email}`);
                if (!response.ok) throw new Error("Failed to fetch user");

                const data = await response.json();
                console.log(data);
                
                setUser(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUser();
    }, []);

    if (!user) return <p className="text-center mt-10">Loading profile...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                My Profile
            </h1>

            <div className="bg-white shadow-md rounded-2xl p-6 space-y-6">
                {/* Basic Info */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-700">Basic Info</h2>
                    <p><span className="font-medium">Name:</span> {user.name}</p>
                    <p><span className="font-medium">Email:</span> {user.email}</p>
                </div>

                {/* Preferences */}
                {user.preferences && (
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700">Preferences</h2>
                        <pre className="bg-gray-100 p-4 rounded-xl overflow-x-auto text-sm">
                            {JSON.stringify(user.preferences, null, 2)}
                        </pre>
                    </div>
                )}

                {/* Resume */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-700">Resume</h2>
                    {user.resume ? (
                        <div className="max-h-60 overflow-y-auto bg-gray-50 p-4 rounded-xl text-sm text-gray-700">
                            {user.resume}
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">No resume uploaded yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
