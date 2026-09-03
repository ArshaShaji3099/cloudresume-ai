import DashboardLayout from "../../components/layout/DashboardLayout";
import { useEffect, useState } from "react";
import { getResumes } from "../../services/resumeService";
import {
    createJob,
    matchResume,
} from "../../services/jobService";

function JobMatching() {
    const [resumes, setResumes] = useState([]);

    const [selectedResume, setSelectedResume] = useState("");
    const [company, setCompany] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [matchResult, setMatchResult] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadResumes();
    }, []);

    async function loadResumes() {
        try {
            const data = await getResumes();

            console.log("Resume data:", data);

            setResumes(data);
        } catch (error) {
            console.error("Failed to load resumes:", error);
            setError("Failed to load resumes.");
        }
    }

    async function handleAnalyze() {
        setError("");
        setMatchResult(null);

        // Validation
        if (!selectedResume) {
            setError("Please select a resume.");
            return;
        }

        if (!title.trim()) {
            setError("Please enter a job title.");
            return;
        }

        if (!description.trim()) {
            setError("Please enter a job description.");
            return;
        }

        try {
            setLoading(true);

            // =========================================
            // 1. CREATE JOB
            // =========================================

            const job = await createJob({
                title: title.trim(),
                company: company.trim(),
                description: description.trim(),
            });

            console.log("Created job:", job);

            // =========================================
            // 2. MATCH RESUME
            // =========================================

            const result = await matchResume(
                job.id,
                selectedResume
            );

            console.log("Match result:", result);

            // =========================================
            // 3. DISPLAY RESULT
            // =========================================

            setMatchResult(result);

        } catch (error) {
            console.error("Job matching failed:", error);

            setError(
                error?.response?.data?.detail ||
                "Failed to analyze the resume."
            );
        } finally {
            setLoading(false);
        }
    }

    // =========================================
    // SCORE COLOR
    // =========================================

    function getScoreColor(score) {
        if (score >= 80) {
            return "text-green-400";
        }

        if (score >= 60) {
            return "text-yellow-400";
        }

        return "text-red-400";
    }

    // =========================================
    // PROGRESS COLOR
    // =========================================

    function getProgressColor(score) {
        if (score >= 80) {
            return "bg-green-500";
        }

        if (score >= 60) {
            return "bg-yellow-500";
        }

        return "bg-red-500";
    }

    // =========================================
    // PRIORITY COLOR
    // =========================================

    function getPriorityStyle(priority) {
        if (priority === "high") {
            return {
                badge: "bg-red-500/10 text-red-400 border-red-500/20",
                border: "border-red-500/20",
            };
        }

        if (priority === "medium") {
            return {
                badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
                border: "border-yellow-500/20",
            };
        }

        return {
            badge: "bg-green-500/10 text-green-400 border-green-500/20",
            border: "border-green-500/20",
        };
    }

    return (
        <DashboardLayout>

            <h2 className="bg-red-950 text-amber-300">Job Matching</h2>

            <div className="mx-auto max-w-6xl">

                {/* ========================================= */}
                {/* HEADER */}
                {/* ========================================= */}

                <h1 className="text-4xl font-bold text-white">
                    Job Matching
                </h1>

                <p className="mt-2 text-slate-400">
                    Compare your resume with any job description using AI.
                </p>

                <div className="mt-10 grid gap-8 lg:grid-cols-2">

                    {/* ========================================= */}
                    {/* LEFT SIDE */}
                    {/* ========================================= */}

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

                        <h2 className="text-2xl font-bold text-white">
                            Job Information
                        </h2>

                        <div className="mt-8 space-y-6">

                            {/* Resume */}

                            <div>

                                <label className="mb-2 block text-sm text-slate-300">
                                    Select Resume
                                </label>

                                <select
                                    value={selectedResume}
                                    onChange={(e) =>
                                        setSelectedResume(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                                >

                                    <option value="">
                                        Select Resume
                                    </option>

                                    {resumes.map((resume) => (
                                        <option
                                            key={resume.id}
                                            value={resume.id}
                                        >
                                            {resume.title}
                                        </option>
                                    ))}

                                </select>

                            </div>

                            {/* Company */}

                            <div>

                                <label className="mb-2 block text-sm text-slate-300">
                                    Company Name
                                </label>

                                <input
                                    type="text"
                                    value={company}
                                    onChange={(e) =>
                                        setCompany(e.target.value)
                                    }
                                    placeholder="Microsoft"
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                                />

                            </div>

                            <h2 className="bg-red-950 text-amber-300">Job Matching</h2>

                            {/* Job Title */}

                            <div>

                                <label className="mb-2 block text-sm text-slate-300">
                                    Job Title
                                </label>

                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) =>
                                        setTitle(e.target.value)
                                    }
                                    placeholder="Software Developer"
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                                />

                            </div>

                            {/* Job Description */}

                            <div>

                                <label className="mb-2 block text-sm text-slate-300">
                                    Job Description
                                </label>

                                <textarea
                                    rows={8}
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    placeholder="Paste the complete job description here..."
                                    className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                                />

                            </div>

                            {/* Error */}

                            {error && (
                                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                    {error}
                                </div>
                            )}

                            {/* Analyze Button */}

                            <button
                                onClick={handleAnalyze}
                                disabled={loading}
                                className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading
                                    ? "Analyzing..."
                                    : "Analyze Match"}
                            </button>

                        </div>

                    </div>

                    {/* ========================================= */}
                    {/* RIGHT SIDE */}
                    {/* ========================================= */}

                    <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900 p-8">

                        <h2 className="text-2xl font-bold text-white">
                            Match Result
                        </h2>

                        {!matchResult ? (

                            <div className="mt-20 text-center">

                                <h3 className="text-7xl font-black text-slate-700">
                                    --
                                </h3>

                                <p className="mt-4 text-slate-400">
                                    Select a resume and paste a job description
                                    to see your match score.
                                </p>

                            </div>

                        ) : (

                            <div className="mt-8">

                                {/* ========================================= */}
                                {/* FINAL SCORE */}
                                {/* ========================================= */}

                                <div>

                                    <p className="text-sm text-slate-400">
                                        Match Score
                                    </p>

                                    <h3
                                        className={`mt-2 text-7xl font-black ${getScoreColor(
                                            matchResult.match_score
                                        )}`}
                                    >
                                        {matchResult.match_score}%
                                    </h3>

                                    <div className="mt-5 h-4 overflow-hidden rounded-full bg-slate-800">

                                        <div
                                            className={`h-full rounded-full transition-all duration-700 ${getProgressColor(
                                                matchResult.match_score
                                            )}`}
                                            style={{
                                                width: `${matchResult.match_score}%`,
                                            }}
                                        />

                                    </div>

                                </div>

                                {/* ========================================= */}
                                {/* SCORE BREAKDOWN */}
                                {/* ========================================= */}

                                <div className="mt-10">

                                    <h3 className="text-xl font-bold text-white">
                                        Score Breakdown
                                    </h3>

                                    <div className="mt-6 space-y-6">

                                        {/* Skills */}

                                        <div>

                                            <div className="mb-2 flex justify-between">

                                                <span className="text-slate-300">
                                                    Skills Match
                                                </span>

                                                <span
                                                    className={`font-semibold ${getScoreColor(
                                                        matchResult.skills_score
                                                    )}`}
                                                >
                                                    {matchResult.skills_score}%
                                                </span>

                                            </div>

                                            <div className="h-3 rounded-full bg-slate-800">

                                                <div
                                                    className={`h-3 rounded-full ${getProgressColor(
                                                        matchResult.skills_score
                                                    )}`}
                                                    style={{
                                                        width: `${matchResult.skills_score}%`,
                                                    }}
                                                />

                                            </div>

                                        </div>

                                        {/* Keywords */}

                                        <div>

                                            <div className="mb-2 flex justify-between">

                                                <span className="text-slate-300">
                                                    Keyword Match
                                                </span>

                                                <span
                                                    className={`font-semibold ${getScoreColor(
                                                        matchResult.keyword_score
                                                    )}`}
                                                >
                                                    {matchResult.keyword_score}%
                                                </span>

                                            </div>

                                            <div className="h-3 rounded-full bg-slate-800">

                                                <div
                                                    className={`h-3 rounded-full ${getProgressColor(
                                                        matchResult.keyword_score
                                                    )}`}
                                                    style={{
                                                        width: `${matchResult.keyword_score}%`,
                                                    }}
                                                />

                                            </div>

                                        </div>

                                        {/* Experience */}

                                        <div>

                                            <div className="mb-2 flex justify-between">

                                                <span className="text-slate-300">
                                                    Experience Match
                                                </span>

                                                <span
                                                    className={`font-semibold ${getScoreColor(
                                                        matchResult.experience_score
                                                    )}`}
                                                >
                                                    {matchResult.experience_score}%
                                                </span>

                                            </div>

                                            <div className="h-3 rounded-full bg-slate-800">

                                                <div
                                                    className={`h-3 rounded-full ${getProgressColor(
                                                        matchResult.experience_score
                                                    )}`}
                                                    style={{
                                                        width: `${matchResult.experience_score}%`,
                                                    }}
                                                />

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* ========================================= */}
                                {/* MATCHED SKILLS */}
                                {/* ========================================= */}

                                <div className="mt-10">

                                    <h3 className="text-xl font-bold text-white">
                                        ✅ Matched Skills
                                    </h3>

                                    {matchResult.matched_skills?.length > 0 ? (

                                        <div className="mt-4 flex flex-wrap gap-3">

                                            {matchResult.matched_skills.map(
                                                (skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="rounded-full bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400"
                                                    >
                                                        {skill}
                                                    </span>
                                                )
                                            )}

                                        </div>

                                    ) : (

                                        <p className="mt-3 text-slate-500">
                                            No matching skills found.
                                        </p>

                                    )}

                                </div>

                                {/* ========================================= */}
                                {/* MISSING SKILLS */}
                                {/* ========================================= */}

                                <div className="mt-10">

                                    <h3 className="text-xl font-bold text-white">
                                        ❌ Missing Skills
                                    </h3>

                                    {matchResult.missing_skills?.length > 0 ? (

                                        <div className="mt-4 flex flex-wrap gap-3">

                                            {matchResult.missing_skills.map(
                                                (skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="rounded-full bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400"
                                                    >
                                                        {skill}
                                                    </span>
                                                )
                                            )}

                                        </div>

                                    ) : (

                                        <p className="mt-3 text-green-400">
                                            🎉 No missing skills!
                                        </p>

                                    )}

                                </div>

                                {/* ========================================= */}
                                {/* RECOMMENDATIONS */}
                                {/* ========================================= */}

                                {matchResult.recommendations?.length > 0 && (

                                    <div className="mt-10">

                                        <h3 className="text-xl font-bold text-white">
                                            🎯 Recommendations
                                        </h3>

                                        <div className="mt-5 space-y-4">

                                            {matchResult.recommendations.map(
                                                (recommendation, index) => {

                                                    const style =
                                                        getPriorityStyle(
                                                            recommendation.priority
                                                        );

                                                    return (
                                                        <div
                                                            key={index}
                                                            className={`rounded-2xl border ${style.border} bg-slate-800/50 p-5`}
                                                        >

                                                            <div className="flex items-start justify-between gap-4">

                                                                <div>

                                                                    <h4 className="font-semibold text-white">
                                                                        {recommendation.title}
                                                                    </h4>

                                                                    <p className="mt-2 text-sm leading-6 text-slate-400">
                                                                        {recommendation.message}
                                                                    </p>

                                                                </div>

                                                                <span
                                                                    className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold uppercase ${style.badge}`}
                                                                >
                                                                    {recommendation.priority}
                                                                </span>

                                                            </div>

                                                        </div>
                                                    );
                                                }
                                            )}

                                        </div>

                                    </div>

                                )}

                                {/* ========================================= */}
                                {/* OLD SUGGESTIONS */}
                                {/* ========================================= */}

                                {matchResult.suggestions?.length > 0 && (

                                    <div className="mt-10">

                                        <h3 className="text-xl font-bold text-white">
                                            💡 Suggestions
                                        </h3>

                                        <div className="mt-4 space-y-3">

                                            {matchResult.suggestions.map(
                                                (suggestion, index) => (
                                                    <div
                                                        key={index}
                                                        className="rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3 text-sm text-blue-300"
                                                    >
                                                        {suggestion}
                                                    </div>
                                                )
                                            )}

                                        </div>

                                    </div>

                                )}

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </DashboardLayout>
    );
}

export default JobMatching;