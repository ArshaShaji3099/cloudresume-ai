import { motion } from "framer-motion";

const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Meta",
    "Netflix",
    "IBM",
];

function Trusted() {
    return (
        <section className="bg-slate-950 py-24">

            <div className="mx-auto max-w-7xl px-6">

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >

                    <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
                        Helping job seekers prepare for opportunities at
                    </p>

                    <h2 className="mt-4 text-4xl font-bold text-white">
                        Leading Global Companies
                    </h2>

                </motion.div>

                <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">

                    {companies.map((company, index) => (

                        <motion.div
                            key={company}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.08,
                            }}
                            whileHover={{
                                y: -5,
                                scale: 1.03,
                            }}
                            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center text-lg font-semibold text-slate-300 transition hover:border-blue-500"
                        >

                            {company}

                        </motion.div>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default Trusted;