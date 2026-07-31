import { motion } from "framer-motion";

function FeatureCard({ icon: Icon, title, description }) {
    return (
        <motion.div
            whileHover={{
                y: -8,
                scale: 1.02,
            }}
            transition={{
                duration: 0.3,
            }}
            className="group rounded-3xl border border-slate-800 bg-slate-900/80 p-8 backdrop-blur-xl transition hover:border-blue-500 hover:shadow-[0_20px_60px_rgba(37,99,235,0.15)]"
        >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white">

                <Icon size={30} />

            </div>

            <h3 className="mt-8 text-2xl font-bold text-white">

                {title}

            </h3>

            <p className="mt-4 leading-7 text-slate-400">

                {description}

            </p>

            <button className="mt-8 font-semibold text-blue-400 transition group-hover:translate-x-2">

                Learn More →

            </button>

        </motion.div>
    );
}

export default FeatureCard;