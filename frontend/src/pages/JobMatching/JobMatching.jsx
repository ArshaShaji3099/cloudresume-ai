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

    useEffect(() => {
        loadResumes();
    }, []);

    async function loadResumes() {
        try {
            setLoading(true);

            const data = await getResumes();

            console.log("Resume data:", data);

            setResumes(data);
        } catch (error) {
            console.error("Error loading resumes:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleAnalyze = async () => {

        if (!selectedResume) {
            alert("Please select a resume.");
            return;
        }

        try {

            setLoading(true);

            // Create Job Description
            const job = await createJob({
                title,
                company,
                description,
            });

            // Analyze Resume
            const result = await matchResume(
                job.id,
                selectedResume
            );

            console.log(result);

            setMatchResult(result);

        } catch (error) {

            console.error(error);

            alert("Analysis failed.");

        } finally {

            setLoading(false);

        }

    };

    return (
        <DashboardLayout>
            <div className="mx-auto max-w-6xl">

                <h1 className="text-4xl font-bold text-white">
                    Job Matching
                </h1>

                <p className="mt-2 text-slate-400">
                    Compare your resume with any job description using AI.
                </p>

                <div className="mt-10 grid gap-8 lg:grid-cols-2">

                    {/* Left Card */}
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
                                    onChange={(e) => setSelectedResume(e.target.value)}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
                                >
                                    <option value="">
                                        Select Resume
                                    </option>

                                    {resumes.length > 0 ? (
                                        resumes.map((resume) => (
                                            <option
                                                key={resume.id}
                                                value={resume.id}
                                            >
                                                {resume.title}
                                            </option>
                                        ))
                                    ) : (
                                        <option disabled>
                                            No resumes found
                                        </option>
                                    )}
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
                                    onChange={(e) => setCompany(e.target.value)}
                                    placeholder="Google"
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
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
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Software Engineer"
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="mb-2 block text-sm text-slate-300">
                                    Job Description
                                </label>

                                <textarea
                                    rows={8}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Paste the complete job description here..."
                                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
                                />
                            </div>

                            <button
                                onClick={handleAnalyze}
                                disabled={loading}
                                className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                            >
                                {loading ? "Loading..." : "Analyze Match"}
                            </button>

                        </div>

                    </div>

                    {/* Right Card */}

                    <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900 p-8">

                        <h2 className="text-2xl font-bold text-white">
                            Match Result
                        </h2>

                        {matchResult ? (
                            <div className="mt-10">
                                <h3 className="text-7xl font-black text-green-400">
                                    {matchResult.match_score}%
                                </h3>

                                <p className="mt-4 text-white">
                                    Match Score
                                </p>
                            </div>
                        ) : (
                            <div className="mt-20 text-center">

                                <h3 className="text-7xl font-black text-slate-700">
                                    --
                                </h3>

                                <p className="mt-4 text-slate-400">
                                    Select a resume and paste a job description
                                    to see your AI match score.
                                </p>

                            </div>
                        )}

                    </div>

                </div>

            </div>
        </DashboardLayout>
    );
}

export default JobMatching;