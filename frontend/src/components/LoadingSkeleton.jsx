import { motion as Motion } from "framer-motion";

export default function LoadingSkeleton({ count = 6 }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <Motion.div
                    key={index}
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 animate-pulse"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-5 bg-slate-700 rounded-md w-48"></div>
                                <div className="h-6 bg-slate-700 rounded-full w-20"></div>
                            </div>
                            <div className="h-4 bg-slate-700 rounded-md w-32 mb-2"></div>
                        </div>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        <div className="h-4 bg-slate-700 rounded-md w-24"></div>
                        <div className="h-4 bg-slate-700 rounded-md w-20"></div>
                        <div className="h-4 bg-slate-700 rounded-md w-16"></div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2 mb-4">
                        <div className="h-4 bg-slate-700 rounded-md w-full"></div>
                        <div className="h-4 bg-slate-700 rounded-md w-3/4"></div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        <div className="h-6 bg-slate-700 rounded-md w-16"></div>
                        <div className="h-6 bg-slate-700 rounded-md w-20"></div>
                        <div className="h-6 bg-slate-700 rounded-md w-14"></div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center">
                        <div className="h-3 bg-slate-700 rounded-md w-20"></div>
                        <div className="h-9 bg-slate-700 rounded-lg w-24"></div>
                    </div>
                </Motion.div>
            ))}
        </div>
    );
}
