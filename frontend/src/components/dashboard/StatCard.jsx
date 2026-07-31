import { motion } from "framer-motion";

function StatCard({ title, value, icon: Icon, color }) {
    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-lg"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-slate-400 text-sm">{title}</p>

                    <h2 className="text-3xl font-bold text-white mt-2">
                        {value}
                    </h2>
                </div>

                <div
                    className="h-14 w-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: color }}
                >
                    <Icon size={28} color="white" />
                </div>
            </div>
        </motion.div>
    );
}

export default StatCard;