import { useState } from "react";
import {
    FileText,
    Download,
    Trash2,
    Sparkles,
} from "lucide-react";

import { analyzeResume } from "../../services/resumeService";

function ResumeCard({ resume }) {
    const [loading, setLoading] = useState(false);
    const [score, setScore] = useState(resume.ats_score);

    const handleAnalyze = async () => {
        try {
            setLoading(true);

            const data = await analyzeResume(resume.id);

            setScore(data.ats_score);

            alert("Resume analyzed successfully!");
        } catch (error) {
            console.error(error);
            alert("Analysis failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500 hover:shadow-xl">

            <div className="flex items-start justify-between">

                <div className="flex items-center gap-4">

                    <div className="rounded-xl bg-blue-600/20 p-3">
                        <FileText className="text-blue-400" />
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-white">
                            {resume.title}
                        </h3>

                        <p className="text-slate-400">
                            Uploaded {new Date(resume.created_at).toLocaleDateString()}
                        </p>
                    </div>

                </div>

                <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
                    ATS {score ?? "--"}%
                </span>

            </div>

            <div className="mt-6 flex gap-3">

                <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    <Sparkles size={16} />
                    {loading ? "Analyzing..." : "Analyze"}
                </button>

                <button className="rounded-xl bg-slate-800 p-2 hover:bg-slate-700">
                    <Download size={18} />
                </button>

                <button className="rounded-xl bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20">
                    <Trash2 size={18} />
                </button>

            </div>

            {score && (
                <div className="mt-5 rounded-xl bg-slate-800 p-4">
                    <h4 className="font-semibold text-white">
                        AI Analysis
                    </h4>

                    <p className="mt-3 text-green-400">
                        ATS Score: {score}%
                    </p>
                </div>
            )}

        </div>
    );
}

export default ResumeCard;