import { CheckCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function HeroCard() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{
                opacity: 1,
                x: 0,
                y: [0, -10, 0],
            }}
            transition={{
                opacity: { duration: 0.8 },
                x: { duration: 0.8 },
                y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                },
            }}
            className="w-full max-w-md rounded-3xl border border-slate-700/50 bg-slate-900/80 backdrop-blur-xl p-7 shadow-[0_20px_60px_rgba(37,99,235,0.15)]"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-white">
                        Resume Analysis
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                        AI Resume Report
                    </p>
                </div>

                <div className="rounded-xl bg-blue-600/20 p-3">
                    ✨
                </div>
            </div>

            {/* ATS Score */}
            <div className="mt-8">
                <div className="flex justify-between text-sm">
                    <span className="text-slate-300">
                        ATS Score
                    </span>

                    <span className="font-bold text-green-400">
                        92%
                    </span>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-700">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "92%" }}
                        transition={{ duration: 1.5 }}
                        className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-500"
                    />
                </div>
            </div>

            {/* Match Score */}
            <div className="mt-7">
                <div className="flex justify-between text-sm">
                    <span className="text-slate-300">
                        Job Match
                    </span>

                    <span className="font-bold text-blue-400">
                        87%
                    </span>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-700">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "87%" }}
                        transition={{
                            duration: 1.8,
                            delay: 0.3,
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                    />
                </div>
            </div>

            {/* Skills */}
            <div className="mt-8">
                <h4 className="mb-4 font-semibold text-white">
                    Skills Detected
                </h4>

                <div className="grid grid-cols-2 gap-3">
                    <Skill text="Python" />
                    <Skill text="Django" />
                    <Skill text="React" />
                    <Skill text="Docker" />
                </div>
            </div>

            {/* AI Suggestions */}
            <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-800/70 p-5">

                <div className="flex items-center gap-2">

                    <Sparkles
                        size={18}
                        className="text-yellow-400"
                    />

                    <span className="font-semibold text-white">
                        AI Suggestions
                    </span>

                </div>

                <div className="mt-5 space-y-4">

                    <Suggestion text="Add AWS to technical skills" />

                    <Suggestion text="Improve project descriptions" />

                    <Suggestion text="Quantify achievements" />

                </div>

            </div>
        </motion.div>
    );
}

function Skill({ text }) {
    return (
        <motion.div
            whileHover={{
                scale: 1.05,
            }}
            className="cursor-pointer rounded-xl border border-slate-700 bg-slate-800 py-3 text-center font-medium text-slate-200 transition"
        >
            {text}
        </motion.div>
    );
}

function Suggestion({ text }) {
    return (
        <motion.div
            whileHover={{ x: 5 }}
            className="flex items-center gap-3 text-slate-300"
        >
            <CheckCircle
                size={18}
                className="text-green-400"
            />

            <span>{text}</span>
        </motion.div>
    );
}

export default HeroCard;