import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Frontend Developer",
        review:
            "ResumePilot AI helped me improve my ATS score from 68% to 91%. I received interview calls within two weeks!",
    },
    {
        name: "Michael Chen",
        role: "Software Engineer",
        review:
            "The AI suggestions were incredibly useful. My resume became much more professional and keyword optimized.",
    },
    {
        name: "Priya Nair",
        role: "Data Analyst",
        review:
            "The Job Match feature showed exactly what skills I was missing. It saved me hours of manual editing.",
    },
];

function Testimonials() {
    return (
        <section className="bg-slate-950 py-28">

            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">

                    <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm text-blue-400">
                        TESTIMONIALS
                    </span>

                    <h2 className="mt-8 text-5xl font-black text-white">
                        Loved by Job Seekers
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-400">
                        See how ResumePilot AI helps professionals create
                        stronger resumes and land more interviews.
                    </p>

                </div>

                <div className="mt-20 grid gap-8 lg:grid-cols-3">

                    {testimonials.map((item, index) => (

                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.15,
                            }}
                            whileHover={{
                                y: -8,
                            }}
                            className="rounded-3xl border border-slate-800 bg-slate-900 p-8"
                        >

                            <div className="flex gap-1 text-yellow-400">

                                <Star fill="currentColor" size={18} />
                                <Star fill="currentColor" size={18} />
                                <Star fill="currentColor" size={18} />
                                <Star fill="currentColor" size={18} />
                                <Star fill="currentColor" size={18} />

                            </div>

                            <p className="mt-6 leading-8 text-slate-300">
                                "{item.review}"
                            </p>

                            <div className="mt-8">

                                <h4 className="font-bold text-white">
                                    {item.name}
                                </h4>

                                <p className="text-slate-400">
                                    {item.role}
                                </p>

                            </div>

                        </motion.div>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default Testimonials;