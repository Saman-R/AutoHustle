import { useMemo } from "react";

export default function MaterialBlobBackground({ shapeCount = 4 }) {
    // Material Design 3 inspired soft colors with lower opacity
    const colors = [
        "bg-gradient-to-br from-blue-300/20 to-blue-400/30",
        "bg-gradient-to-br from-purple-300/20 to-purple-400/30",
        "bg-gradient-to-br from-pink-300/20 to-pink-400/30",
        "bg-gradient-to-br from-teal-300/20 to-teal-400/30",
        "bg-gradient-to-br from-green-300/20 to-green-400/30",
        "bg-gradient-to-br from-amber-300/20 to-amber-400/30",
        "bg-gradient-to-br from-rose-300/20 to-rose-400/30",
        "bg-gradient-to-br from-indigo-300/20 to-indigo-400/30",
    ];

    // Simple, soft shapes
    const shapes = ["circle", "pill", "oval", "rounded"];

    const items = useMemo(() => {
        const placed = [];

        const isOverlapping = (x, y, size, shape) => {
            return placed.some(p => {
                const dist = Math.sqrt((x - p.x) ** 2 + (y - p.y) ** 2);

                // Calculate effective radius based on shape
                let currentRadius = size / 2;
                let placedRadius = p.effectiveSize / 2;

                if (shape === "pill") currentRadius = (size * 1.8) / 2;
                if (shape === "oval") currentRadius = (size * 1.4) / 2;

                // Minimum distance should be sum of radii + comfortable padding
                const minDistance = currentRadius + placedRadius + 40;
                return dist < minDistance;
            });
        };

        for (let i = 0; i < shapeCount; i++) {
            let size, top, left, shape, tries = 0;

            do {
                size = Math.floor(Math.random() * 120) + 100; // 100–220px
                shape = shapes[Math.floor(Math.random() * shapes.length)];
                top = Math.random() * 70 + 15;  // More conservative viewport positioning
                left = Math.random() * 70 + 15;
                tries++;
            } while (isOverlapping(left, top, size, shape) && tries < 100);

            // Calculate effective size for collision detection
            let effectiveSize = size;
            if (shape === "pill") effectiveSize = size * 1.8;
            if (shape === "oval") effectiveSize = size * 1.4;

            placed.push({
                size,
                effectiveSize,
                top,
                left,
                color: colors[Math.floor(Math.random() * colors.length)],
                shape,
                delay: Math.random() * 8,
                rotate: Math.random() * 360,
                duration: 12 + Math.random() * 8,
                x: left,
                y: top
            });
        }

        return placed;
    }, [shapeCount]);

    return (
        <>
            {/* Soft background overlay for additional Material 3 feel */}
            <div className="absolute inset-0 -z-20 bg-indigo-950" />

            <div className="absolute inset-0 -z-10 overflow-hidden">
                {items.map((item, i) => {
                    let shapeClass = "";
                    let shapeStyle = {};

                    if (item.shape === "circle") {
                        shapeClass = "rounded-full";
                    } else if (item.shape === "pill") {
                        shapeClass = "rounded-full";
                        shapeStyle.width = `${item.size * 1.8}px`;
                        shapeStyle.height = `${item.size * 0.6}px`;
                    } else if (item.shape === "oval") {
                        shapeClass = "rounded-full";
                        shapeStyle.width = `${item.size * 1.4}px`;
                        shapeStyle.height = `${item.size * 0.8}px`;
                    } else if (item.shape === "rounded") {
                        shapeClass = "rounded-3xl";
                    }

                    return (
                        <div
                            key={i}
                            className={`absolute ${item.color} backdrop-blur-3xl ${shapeClass}`}
                            style={{
                                width: item.shape === "pill" || item.shape === "oval" ? shapeStyle.width : `${item.size}px`,
                                height: item.shape === "pill" || item.shape === "oval" ? shapeStyle.height : `${item.size}px`,
                                top: `${item.top}%`,
                                left: `${item.left}%`,
                                transform: `translate(-50%, -50%) rotate(${item.rotate}deg)`,
                                filter: 'blur(2px) drop-shadow(0 8px 32px rgba(0, 0, 0, 0.08))',
                                animation: `materialFloat ${item.duration}s ease-in-out infinite`,
                                animationDelay: `${item.delay}s`,
                            }}
                        />
                    );
                })}

                {/* Additional blur overlay for softness */}
                <div
                    className="absolute inset-0 bg-white/10 backdrop-blur-sm"
                    style={{ mixBlendMode: 'overlay' }}
                />
            </div>

            <style jsx>{`
                @keyframes materialFloat {
                    0%, 100% { 
                        transform: translate(-50%, -50%) translateY(0) rotate(0deg) scale(1); 
                    }
                    25% { 
                        transform: translate(-50%, -50%) translateY(-15px) rotate(5deg) scale(1.02); 
                    }
                    50% { 
                        transform: translate(-50%, -50%) translateY(-30px) rotate(10deg) scale(0.98); 
                    }
                    75% { 
                        transform: translate(-50%, -50%) translateY(-15px) rotate(-5deg) scale(1.01); 
                    }
                }
            `}</style>
        </>
    );
}