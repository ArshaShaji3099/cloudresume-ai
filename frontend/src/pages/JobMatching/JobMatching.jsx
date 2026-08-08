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

            // ------------------------------------
            // 1. Create Job Description
            // ------------------------------------

            const job = await createJob({
                title: title.trim(),
                company: company.trim(),
                description: description.trim(),
            });

            console.log("Created job:", job);

            // ------------------------------------
            // 2. Match Resume With Job
            // ------------------------------------

            const result = await matchResume(
                job.id,
                selectedResume
            );

            console.log("Match result:", result);

            // ------------------------------------
            // 3. Display Result
            // ------------------------------------

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

    function getScoreColor(score) {
        if (score >= 80) {
            return "text-green-400";
        }

        if (score >= 60) {
            return "text-yellow-400";
        }

        return "text-red-400";
    }

    function getProgressColor(score) {
        if (score >= 80) {
            return "bg-green-500";
        }

        if (score >= 60) {
            return "bg-yellow-500";
        }

        return "bg-red-500";
    }

    return (
        <DashboardLayout>

            <div className="mx-auto max-w-6xl">

                {/* Header */}

                <h1 className="text-4xl font-bold text-white">
                    Job Matching
                </h1>

                <p className="mt-2 text-slate-400">
                    Compare your resume with any job description using AI.
                </p>

                <div className="mt-10 grid gap-8 lg:grid-cols-2">

                    {/* ===================================== */}
                    {/* LEFT SIDE */}
                    {/* ===================================== */}

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

                    {/* ===================================== */}
                    {/* RIGHT SIDE */}
                    {/* ===================================== */}

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

                                {/* ================================= */}
                                {/* FINAL SCORE */}
                                {/* ================================= */}

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

                                {/* ================================= */}
                                {/* SCORE BREAKDOWN */}
                                {/* ================================= */}

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

                                {/* ================================= */}
                                {/* MATCHED SKILLS */}
                                {/* ================================= */}

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

                                {/* ================================= */}
                                {/* MISSING SKILLS */}
                                {/* ================================= */}

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

                                {/* ================================= */}
                                {/* SUGGESTIONS */}
                                {/* ================================= */}

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