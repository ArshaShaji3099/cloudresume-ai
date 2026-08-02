import { motion } from "framer-motion";
import {
    Upload,
    Brain,
    BarChart3,
    Briefcase,
} from "lucide-react";

const steps = [
    {
        icon: Upload,
        title: "Upload Resume",
        description:
            "Upload your resume in PDF format securely.",
    },
    {
        icon: Brain,
        title: "AI Analysis",
        description:
            "Our AI analyzes ATS compatibility and content quality.",
    },
    {
        icon: BarChart3,
        title: "Improve ATS Score",
        description:
            "Receive personalized suggestions to improve your resume.",
    },
    {
        icon: Briefcase,
        title: "Apply with Confidence",
        description:
            "Submit a stronger resume tailored for your dream job.",
    },
];

function HowItWorks() {
    return (
        <section className="bg-slate-950 py-28">
            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">

                    <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm text-blue-400">
                        HOW IT WORKS
                    </span>

                    <h2 className="mt-8 text-5xl font-black text-white">
                        Improve Your Resume
                        <br />
                        in Four Simple Steps
                    </h2>

                    <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-400">
                        ResumePilot AI guides you from resume upload
                        to a stronger application with intelligent,
                        ATS-focused recommendations.
                    </p>

                </div>

                <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.15,
                            }}
                            className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center hover:border-blue-500 transition"
                        >

                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white">
                                <step.icon size={30} />
                            </div>

                            <div className="mt-6 text-blue-400 font-semibold">
                                Step {index + 1}
                            </div>

                            <h3 className="mt-4 text-2xl font-bold text-white">
                                {step.title}
                            </h3>

                            <p className="mt-4 leading-7 text-slate-400">
                                {step.description}
                            </p>

                        </motion.div>
                    ))}

                </div>

            </div>
        </section>
    );
}

export default HowItWorks;