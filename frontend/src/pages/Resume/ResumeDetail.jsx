import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    CheckCircle,
    AlertTriangle,
    Sparkles,
    FileText,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { getResume } from "../../services/resumeService";

function ResumeDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadResume();
    }, []);

    async function loadResume() {
        try {
            const data = await getResume(id);
            setResume(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <DashboardLayout>
                <p className="text-center text-white text-lg">
                    Loading...
                </p>
            </DashboardLayout>
        );
    }

    if (!resume) {
        return (
            <DashboardLayout>
                <p className="text-center text-red-400 text-lg">
                    Resume not found.
                </p>
            </DashboardLayout>
        );
    }

    const atsScore = resume.analysis?.ats_score ?? 0;

    const scoreColor =
        atsScore >= 90
            ? "text-green-400"
            : atsScore >= 70
                ? "text-yellow-400"
                : "text-red-400";

    const progressColor =
        atsScore >= 90
            ? "bg-green-500"
            : atsScore >= 70
                ? "bg-yellow-500"
                : "bg-red-500";

    return (
        <DashboardLayout>

            <div className="mx-auto max-w-5xl">

                {/* Back Button */}

                <button
                    onClick={() => navigate("/resumes")}
                    className="mb-6 flex items-center gap-2 text-slate-400 transition hover:text-white"
                >
                    <ArrowLeft size={18} />
                    Back to My Resumes
                </button>

                {/* Header */}

                <h1 className="text-4xl font-bold text-white">
                    {resume.title}
                </h1>

                <p className="mt-2 text-slate-400">
                    Uploaded on{" "}
                    {new Date(
                        resume.created_at
                    ).toLocaleDateString()}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                    Last analyzed:{" "}
                    {resume.analysis?.analyzed_at
                        ? new Date(
                            resume.analysis.analyzed_at
                        ).toLocaleString()
                        : "Not analyzed yet"}
                </p>

                {/* View Resume Button */}

                <div className="mt-6">

                    <a
                        href={resume.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                    >
                        <FileText size={18} />
                        View Resume
                    </a>

                </div>

                {/* ATS Score */}

                <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">

                    <h2 className="text-2xl font-bold text-white">
                        ATS Score
                    </h2>

                    <div className="mt-6 flex items-center gap-8">

                        <div
                            className={`text-6xl font-black ${scoreColor}`}
                        >
                            {atsScore}%
                        </div>

                        <div className="flex-1">

                            <div className="h-4 rounded-full bg-slate-800">

                                <div
                                    className={`h-4 rounded-full transition-all duration-500 ${progressColor}`}
                                    style={{
                                        width: `${atsScore}%`,
                                    }}
                                />

                            </div>

                        </div>

                    </div>

                </div>

                {/* Strengths */}

                <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">

                    <div className="flex items-center gap-3">

                        <CheckCircle
                            className="text-green-400"
                            size={24}
                        />

                        <h2 className="text-2xl font-bold text-white">
                            Strengths
                        </h2>

                    </div>

                    {resume.analysis?.strengths?.length ? (

                        <ul className="mt-5 space-y-3">

                            {resume.analysis.strengths.map(
                                (item, index) => (

                                    <li
                                        key={index}
                                        className="text-green-400"
                                    >
                                        ✓ {item}
                                    </li>

                                )
                            )}

                        </ul>

                    ) : (

                        <p className="mt-5 text-slate-400">
                            No strengths available.
                        </p>

                    )}

                </div>

                {/* Weaknesses */}

                <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">

                    <div className="flex items-center gap-3">

                        <AlertTriangle
                            className="text-yellow-400"
                            size={24}
                        />

                        <h2 className="text-2xl font-bold text-white">
                            Weaknesses
                        </h2>

                    </div>

                    {resume.analysis?.weaknesses?.length ? (

                        <ul className="mt-5 space-y-3">

                            {resume.analysis.weaknesses.map(
                                (item, index) => (

                                    <li
                                        key={index}
                                        className="text-yellow-400"
                                    >
                                        • {item}
                                    </li>

                                )
                            )}

                        </ul>

                    ) : (

                        <p className="mt-5 text-green-400">
                            🎉 Excellent! No weaknesses detected.
                        </p>

                    )}

                </div>

                {/* AI Suggestions */}

                <div className="mt-8 mb-12 rounded-3xl border border-slate-800 bg-slate-900 p-8">

                    <div className="flex items-center gap-3">

                        <Sparkles
                            className="text-blue-400"
                            size={24}
                        />

                        <h2 className="text-2xl font-bold text-white">
                            AI Suggestions
                        </h2>

                    </div>

                    {resume.analysis?.suggestions?.length ? (

                        <ul className="mt-5 space-y-3">

                            {resume.analysis.suggestions.map(
                                (item, index) => (

                                    <li
                                        key={index}
                                        className="text-blue-400"
                                    >
                                        ✓ {item}
                                    </li>

                                )
                            )}

                        </ul>

                    ) : (

                        <p className="mt-5 text-green-400">
                            🎉 Your resume looks excellent.
                        </p>

                    )}

                </div>

            </div>

        </DashboardLayout>
    );
}

export default ResumeDetail;