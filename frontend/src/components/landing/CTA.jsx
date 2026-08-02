import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function CTA() {
    return (
        <section className="bg-slate-950 py-28">
            <div className="mx-auto max-w-6xl px-6">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="rounded-3xl border border-slate-800 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-16 text-center"
                >

                    <h2 className="text-5xl font-black text-white">
                        Ready to Build Your
                        <br />
                        Dream Resume?
                    </h2>

                    <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-blue-100">
                        Analyze your resume, improve ATS compatibility,
                        and increase your chances of landing interviews
                        with ResumePilot AI.
                    </p>

                    <div className="mt-12">

                        <Link
                            to="/register"
                            className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 transition hover:scale-105"
                        >

                            Get Started Free

                            <ArrowRight size={20} />

                        </Link>

                    </div>

                </motion.div>

            </div>
        </section>
    );
}

export default CTA;