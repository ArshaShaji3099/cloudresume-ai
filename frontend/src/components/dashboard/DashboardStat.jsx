import { motion } from "framer-motion";

function DashboardStat({ title, value, icon: Icon, color }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
        >
            <div className="flex items-center justify-between">

                <div>
                    <p className="text-sm text-slate-400">
                        {title}
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-white">
                        {value}
                    </h2>
                </div>

                <div
                    className="flex h-14 w-14 items-center justify-center rounded-xl"
                    style={{ backgroundColor: color }}
                >
                    <Icon className="text-white" size={28} />
                </div>

            </div>
        </motion.div>
    );
}

export default DashboardStat;