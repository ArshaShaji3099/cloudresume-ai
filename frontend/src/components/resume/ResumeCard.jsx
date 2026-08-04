import { useState } from "react";
import {
    FileText,
    Download,
    Trash2,
    Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
    analyzeResume,
    deleteResume,
} from "../../services/resumeService";

function ResumeCard({ resume, onResumeDeleted }) {

    console.log("ResumeCard rendered");
    const navigate = useNavigate();

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

    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this resume?"
        );

        if (!confirmed) return;

        try {
            await deleteResume(resume.id);

            alert("Resume deleted successfully!");

            onResumeDeleted();
        } catch (error) {
            console.error(error);

            alert("Failed to delete resume.");
        }
    };

    return (
        <div
            onClick={() => navigate(`/resumes/${resume.id}`)}
            className="cursor-pointer rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500 hover:shadow-xl"
        >
            {/* Header */}
            <div className="flex items-start justify-between">

                <div className="flex items-center gap-4">

                    <div className="rounded-xl bg-blue-600/20 p-3">
                        <FileText
                            className="text-blue-400"
                            size={24}
                        />
                    </div>

                    <div>

                        <h3 className="text-lg font-bold text-white">
                            {resume.title}
                        </h3>

                        <p className="text-sm text-slate-400">
                            Uploaded{" "}
                            {new Date(
                                resume.created_at
                            ).toLocaleDateString()}
                        </p>

                    </div>

                </div>

                <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm font-semibold text-green-400">
                    ATS {score ?? "--"}%
                </span>

            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleAnalyze();
                    }}
                    disabled={loading}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                    <Sparkles size={16} />

                    {loading ? "Analyzing..." : "Analyze"}

                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();

                        // Download functionality
                    }}
                    className="rounded-xl bg-slate-800 p-2 text-white transition hover:bg-slate-700"
                >
                    <Download size={18} />
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                    }}
                    className="rounded-xl bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500/20"
                >
                    <Trash2 size={18} />
                </button>

            </div>

            {/* AI Analysis */}
            {score && (
                <div className="mt-6 rounded-2xl bg-slate-800 p-4">

                    <h4 className="font-semibold text-white">
                        AI Analysis
                    </h4>

                    <p className="mt-2 text-green-400">
                        ATS Score: {score}%
                    </p>

                </div>
            )}

        </div>
    );
}

export default ResumeCard;