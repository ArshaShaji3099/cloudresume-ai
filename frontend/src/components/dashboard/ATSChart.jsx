import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { month: "Jan", score: 65 },
    { month: "Feb", score: 72 },
    { month: "Mar", score: 78 },
    { month: "Apr", score: 81 },
    { month: "May", score: 86 },
    { month: "Jun", score: 92 },
];

function ATSChart() {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="mb-6 text-xl font-bold text-white">
                ATS Score Trend
            </h2>

            <div className="h-72">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart data={data}>

                        <XAxis dataKey="month" stroke="#94a3b8" />

                        <YAxis stroke="#94a3b8" />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#2563EB"
                            strokeWidth={3}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default ATSChart;