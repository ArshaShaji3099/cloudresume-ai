import { motion } from "framer-motion";
import {
    FileText,
    BarChart3,
    Sparkles,
    Briefcase,
} from "lucide-react";

function DashboardPreview() {
    return (
        <section className="bg-slate-950 py-28">
            <div className="mx-auto max-w-7xl px-6">

                {/* Section Header */}
                <div className="text-center">

                    <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm text-blue-400">
                        PRODUCT PREVIEW
                    </span>

                    <h2 className="mt-8 text-5xl font-black text-white">
                        Experience ResumePilot AI
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
                        Everything you need to analyze resumes,
                        optimize ATS scores, and prepare for your
                        next opportunity—all in one dashboard.
                    </p>

                </div>

                {/* Dashboard Card */}

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-20 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl"
                >

                    {/* Top Stats */}

                    <div className="grid gap-6 md:grid-cols-4">

                        <Stat
                            icon={<FileText size={22} />}
                            title="Resumes"
                            value="28"
                        />

                        <Stat
                            icon={<BarChart3 size={22} />}
                            title="ATS Score"
                            value="92%"
                        />

                        <Stat
                            icon={<Briefcase size={22} />}
                            title="Job Matches"
                            value="41"
                        />

                        <Stat
                            icon={<Sparkles size={22} />}
                            title="AI Tips"
                            value="18"
                        />

                    </div>

                    {/* Bottom Grid */}

                    <div className="mt-10 grid gap-8 lg:grid-cols-2">

                        {/* Resume List */}

                        <div className="rounded-2xl bg-slate-800 p-6">

                            <h3 className="text-xl font-semibold text-white">
                                Recent Resumes
                            </h3>

                            <div className="mt-6 space-y-4">

                                <ResumeItem name="Software_Engineer.pdf" />
                                <ResumeItem name="Frontend_Developer.pdf" />
                                <ResumeItem name="Python_Django.pdf" />

                            </div>

                        </div>

                        {/* AI Suggestions */}

                        <div className="rounded-2xl bg-slate-800 p-6">

                            <h3 className="text-xl font-semibold text-white">
                                AI Suggestions
                            </h3>

                            <div className="mt-6 space-y-4">

                                <Suggestion text="Add AWS certification" />
                                <Suggestion text="Improve project metrics" />
                                <Suggestion text="Include leadership experience" />
                                <Suggestion text="Increase keyword density" />

                            </div>

                        </div>

                    </div>

                </motion.div>

            </div>
        </section>
    );
}

function Stat({ icon, title, value }) {
    return (
        <div className="rounded-2xl bg-slate-800 p-6">

            <div className="text-blue-400">
                {icon}
            </div>

            <p className="mt-4 text-sm text-slate-400">
                {title}
            </p>

            <h3 className="mt-2 text-3xl font-bold text-white">
                {value}
            </h3>

        </div>
    );
}

function ResumeItem({ name }) {
    return (
        <div className="flex items-center justify-between rounded-xl bg-slate-700 px-4 py-3">

            <span className="text-slate-200">
                {name}
            </span>

            <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-400">
                Analyzed
            </span>

        </div>
    );
}

function Suggestion({ text }) {
    return (
        <div className="rounded-xl border border-slate-700 bg-slate-700/40 p-4 text-slate-300">
            ✓ {text}
        </div>
    );
}

export default DashboardPreview;