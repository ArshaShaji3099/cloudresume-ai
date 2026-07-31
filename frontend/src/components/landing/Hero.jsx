import { ArrowRight, UploadCloud, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import HeroCard from "./HeroCard";

function Hero() {
    return (
        <section className="relative overflow-hidden bg-slate-950">

            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">

                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.35, 0.55, 0.35],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[150px]"
                />

                <motion.div
                    animate={{
                        scale: [1.15, 1, 1.15],
                        opacity: [0.4, 0.2, 0.4],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute right-0 bottom-0 h-[600px] w-[600px] rounded-full bg-purple-600/20 blur-[180px]"
                />

            </div>

            <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-24">

                <div className="grid w-full items-center gap-20 lg:grid-cols-2">

                    {/* LEFT CONTENT */}

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >

                        {/* Badge */}

                        <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-400">

                            🚀 Powered by AI Resume Intelligence

                        </div>

                        {/* Heading */}

                        <h1 className="mt-8 text-5xl font-black leading-tight text-white md:text-7xl">

                            Land More
                            <br />

                            Interviews with
                            <br />

                            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">

                                ResumePilot AI

                            </span>

                        </h1>

                        {/* Description */}

                        <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">

                            Upload your resume, instantly analyze ATS compatibility,
                            compare against job descriptions,
                            receive AI-powered recommendations,
                            and maximize your chances of getting shortlisted.

                        </p>

                        {/* Buttons */}

                        <div className="mt-12 flex flex-wrap gap-5">

                            <button className="flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:scale-105 hover:bg-blue-700">

                                <UploadCloud size={20} />

                                Analyze My Resume

                            </button>

                            <button className="flex items-center gap-3 rounded-xl border border-slate-700 px-8 py-4 font-semibold text-white transition hover:border-blue-500 hover:bg-slate-900">

                                <PlayCircle size={20} />

                                Watch Demo

                                <ArrowRight size={18} />

                            </button>

                        </div>

                        {/* Trust */}

                        <div className="mt-8 flex items-center gap-3">

                            <div className="text-yellow-400 text-lg">

                                ★★★★★

                            </div>

                            <span className="text-slate-400">

                                Trusted by
                                <span className="ml-2 font-semibold text-white">

                                    10,000+

                                </span>

                                job seekers

                            </span>

                        </div>

                        {/* Stats */}

                        <div className="mt-12 flex flex-wrap gap-12">

                            <Stat number="98%" label="ATS Success" />

                            <Stat number="10K+" label="Resume Reviews" />

                            <Stat number="24/7" label="AI Assistant" />

                        </div>

                    </motion.div>

                    {/* RIGHT */}

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="flex justify-center"
                    >

                        <HeroCard />

                    </motion.div>

                </div>

            </div>

        </section>
    );
}

function Stat({ number, label }) {
    return (
        <div>

            <h2 className="text-4xl font-black text-white">

                {number}

            </h2>

            <p className="mt-2 text-sm text-slate-400">

                {label}

            </p>

        </div>
    );
}

export default Hero;