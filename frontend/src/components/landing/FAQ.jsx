import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "What is ResumePilot AI?",
        answer:
            "ResumePilot AI is an AI-powered platform that helps you optimize your resume, improve ATS scores, and match resumes with job descriptions.",
    },
    {
        question: "How does ATS analysis work?",
        answer:
            "Our system analyzes your resume using modern ATS principles and provides suggestions to improve readability, keywords, and formatting.",
    },
    {
        question: "Can I compare my resume with a job description?",
        answer:
            "Yes. Simply upload your resume and paste a job description to receive a compatibility score and missing keywords.",
    },
    {
        question: "Is my resume secure?",
        answer:
            "Yes. Your uploaded resumes are securely stored and only accessible from your account.",
    },
];

function FAQ() {
    const [open, setOpen] = useState(0);

    return (
        <section className="bg-slate-950 py-28">
            <div className="mx-auto max-w-4xl px-6">

                <div className="text-center">

                    <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm text-blue-400">
                        FAQ
                    </span>

                    <h2 className="mt-8 text-5xl font-black text-white">
                        Frequently Asked Questions
                    </h2>

                </div>

                <div className="mt-16 space-y-5">

                    {faqs.map((faq, index) => (

                        <div
                            key={faq.question}
                            className="rounded-2xl border border-slate-800 bg-slate-900"
                        >

                            <button
                                onClick={() => setOpen(open === index ? -1 : index)}
                                className="flex w-full items-center justify-between p-6"
                            >

                                <span className="text-left text-lg font-semibold text-white">
                                    {faq.question}
                                </span>

                                <ChevronDown
                                    className={`transition ${open === index ? "rotate-180" : ""
                                        }`}
                                />

                            </button>

                            <AnimatePresence>

                                {open === index && (

                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >

                                        <p className="px-6 pb-6 text-slate-400">
                                            {faq.answer}
                                        </p>

                                    </motion.div>

                                )}

                            </AnimatePresence>

                        </div>

                    ))}

                </div>

            </div>
        </section>
    );
}

export default FAQ;