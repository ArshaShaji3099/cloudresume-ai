import { Sparkles } from "lucide-react";

const tips = [
    "Add AWS to technical skills",
    "Improve project descriptions",
    "Include measurable achievements",
    "Optimize resume summary",
];

function AIRecommendations() {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center gap-3">

                <Sparkles className="text-yellow-400" />

                <h2 className="text-xl font-bold text-white">
                    AI Recommendations
                </h2>

            </div>

            <div className="mt-6 space-y-4">

                {tips.map((tip) => (

                    <div
                        key={tip}
                        className="rounded-xl bg-slate-800 p-4 text-slate-300"
                    >
                        ✓ {tip}
                    </div>

                ))}

            </div>

        </div>
    );
}

export default AIRecommendations;