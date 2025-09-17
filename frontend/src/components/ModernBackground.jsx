/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

// FloatingBlob component
const FloatingBlob = ({ delay = 0, duration = 20, children, className = "" }) => {
    return (
        <div
            className={`absolute ${className}`}
            style={{
                animation: `morphFloat ${duration}s ease-in-out infinite ${delay}s`
            }}
        >
            {children}
        </div>
    );
};

// ModernBackground component
function ModernBackground({
    className = "",
    showMouseInteraction = true,
    intensity = "normal",
    colorScheme = "cool",
    style = "modern"
}) {
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

    useEffect(() => {
        if (!showMouseInteraction) return;

        const handleMouseMove = (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setMousePosition({
                x: ((e.clientX - rect.left) / rect.width) * 100,
                y: ((e.clientY - rect.top) / rect.height) * 100
            });
        };

        const container = document.getElementById('background-container');
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            return () => container.removeEventListener('mousemove', handleMouseMove);
        }
    }, [showMouseInteraction]);

    const coolScheme = {
        background: "from-blue-50 via-cyan-50 to-teal-100",
        blobs: {
            primary: "from-blue-500/20 to-cyan-600/30",
            secondary: "from-teal-500/25 to-blue-600/20",
            tertiary: "from-cyan-400/15 to-teal-500/25",
            accent1: "from-sky-500/20 to-blue-600/25",
            accent2: "from-teal-500/15 to-cyan-600/20",
            accent3: "from-blue-400/20 to-sky-500/15"
        },
        mouseBlob: "rgba(14, 165, 233, 0.3)"
    };

    return (
        <div
            id="background-container"
            className={`absolute inset-0 bg-gradient-to-br ${coolScheme.background} ${className} overflow-hidden`}
        >
            {/* Floating Blobs */}
            <div className="absolute inset-0 opacity-60">
                {/* Large Primary Blob */}
                <FloatingBlob delay={0} duration={25} className="top-[-15%] left-[-20%]">
                    <div
                        className={`w-[600px] h-[600px] bg-gradient-to-br ${coolScheme.blobs.primary} blur-3xl rounded-full`}
                        style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
                    />
                </FloatingBlob>

                {/* Secondary Blob */}
                <FloatingBlob delay={2} duration={30} className="top-[10%] right-[-25%]">
                    <div
                        className={`w-[500px] h-[500px] bg-gradient-to-tl ${coolScheme.blobs.secondary} blur-3xl rounded-full`}
                        style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
                    />
                </FloatingBlob>

                {/* Tertiary Blob */}
                <FloatingBlob delay={4} duration={35} className="bottom-[-20%] left-[20%]">
                    <div
                        className={`w-[450px] h-[450px] bg-gradient-to-tr ${coolScheme.blobs.tertiary} blur-3xl rounded-full`}
                        style={{ borderRadius: '70% 30% 50% 50% / 60% 40% 60% 40%' }}
                    />
                </FloatingBlob>

                {/* Accent Blobs */}
                <FloatingBlob delay={1} duration={28} className="top-[50%] right-[15%]">
                    <div
                        className={`w-[350px] h-[350px] bg-gradient-to-bl ${coolScheme.blobs.accent1} blur-2xl rounded-full`}
                    />
                </FloatingBlob>

                <FloatingBlob delay={3} duration={22} className="top-[25%] left-[65%]">
                    <div
                        className={`w-[280px] h-[280px] bg-gradient-to-r ${coolScheme.blobs.accent2} blur-xl rounded-full`}
                    />
                </FloatingBlob>

                <FloatingBlob delay={6} duration={26} className="bottom-[25%] right-[-10%]">
                    <div
                        className={`w-[320px] h-[320px] bg-gradient-to-t ${coolScheme.blobs.accent3} blur-2xl rounded-full`}
                    />
                </FloatingBlob>

                {/* Mouse Interactive Blob */}
                {showMouseInteraction && (
                    <div
                        className="absolute w-[300px] h-[300px] opacity-20 pointer-events-none transition-all duration-700 ease-out blur-3xl rounded-full"
                        style={{
                            background: `radial-gradient(circle, ${coolScheme.mouseBlob} 0%, transparent 70%)`,
                            left: `${mousePosition.x}%`,
                            top: `${mousePosition.y}%`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                )}
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes morphFloat {
                    0%, 100% { 
                        transform: translateY(0px) scale(1) rotate(0deg);
                    }
                    25% { 
                        transform: translateY(-20px) scale(1.05) rotate(2deg);
                    }
                    50% { 
                        transform: translateY(-12px) scale(0.95) rotate(1deg);
                    }
                    75% { 
                        transform: translateY(-25px) scale(1.02) rotate(-1deg);
                    }
                }
            `}</style>
        </div>
    );
}

export default ModernBackground