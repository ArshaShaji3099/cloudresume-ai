import { useEffect, useState } from "react";
import { BriefcaseBusiness, FileText } from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { getMatchHistory } from "../../services/jobService";

function MatchHistory() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMatchHistory();
    }, []);

    async function loadMatchHistory() {
        try {
            setLoading(true);

            const data = await getMatchHistory();

            console.log("Match history:", data);

            setMatches(data);
        } catch (error) {
            console.error("Failed to load match history:", error);
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

    return (
        <DashboardLayout>

            <div className="mx-auto max-w-6xl">

                {/* Header */}

                <h1 className="text-4xl font-bold text-white">
                    Match History
                </h1>

                <p className="mt-2 text-slate-400">
                    View your previous resume and job matches.
                </p>


                {/* Loading */}

                {loading && (
                    <div className="mt-10 text-slate-400">
                        Loading match history...
                    </div>
                )}


                {/* No matches */}

                {!loading && matches.length === 0 && (
                    <div className="mt-10 rounded-3xl border border-dashed border-slate-700 bg-slate-900 p-12 text-center">

                        <h2 className="text-2xl font-bold text-white">
                            No match history yet
                        </h2>

                        <p className="mt-3 text-slate-400">
                            Analyze your resume against a job description
                            to see your matches here.
                        </p>

                    </div>
                )}


                {/* Match Cards */}

                {!loading && matches.length > 0 && (

                    <div className="mt-8 space-y-6">

                        {matches.map((match) => (

                            <div
                                key={match.id}
                                className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500"
                            >

                                {/* Top */}

                                <div className="flex items-start justify-between gap-6">

                                    <div>

                                        <div className="flex items-center gap-3">

                                            <div className="rounded-xl bg-blue-600/20 p-3">
                                                <BriefcaseBusiness
                                                    size={24}
                                                    className="text-blue-400"
                                                />
                                            </div>

                                            <div>

                                                <h2 className="text-xl font-bold text-white">
                                                    {match.company ||
                                                        "Unknown Company"}
                                                </h2>

                                                <p className="mt-1 text-slate-300">
                                                    {match.job_title ||
                                                        "Unknown Position"}
                                                </p>

                                            </div>

                                        </div>


                                        {/* Resume */}

                                        <div className="mt-5 flex items-center gap-2 text-slate-300">

                                            <FileText
                                                size={18}
                                                className="text-slate-400"
                                            />

                                            <span>
                                                {match.resume_title ||
                                                    "Unknown Resume"}
                                            </span>

                                        </div>

                                    </div>


                                    {/* Score */}

                                    <div className="text-right">

                                        <div
                                            className={`text-5xl font-black ${getScoreColor(
                                                match.match_score
                                            )}`}
                                        >
                                            {match.match_score}%
                                        </div>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Match Score
                                        </p>

                                    </div>

                                </div>


                                {/* Skills */}

                                <div className="mt-8 grid gap-8 md:grid-cols-2">

                                    {/* Matched Skills */}

                                    <div>

                                        <h3 className="font-semibold text-white">
                                            ✅ Matched Skills
                                        </h3>

                                        {match.matched_skills?.length > 0 ? (

                                            <div className="mt-4 flex flex-wrap gap-2">

                                                {match.matched_skills.map(
                                                    (skill, index) => (

                                                        <span
                                                            key={index}
                                                            className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400"
                                                        >
                                                            {skill}
                                                        </span>

                                                    )
                                                )}

                                            </div>

                                        ) : (

                                            <p className="mt-3 text-slate-500">
                                                No matched skills.
                                            </p>

                                        )}

                                    </div>


                                    {/* Missing Skills */}

                                    <div>

                                        <h3 className="font-semibold text-white">
                                            ❌ Missing Skills
                                        </h3>

                                        {match.missing_skills?.length > 0 ? (

                                            <div className="mt-4 flex flex-wrap gap-2">

                                                {match.missing_skills.map(
                                                    (skill, index) => (

                                                        <span
                                                            key={index}
                                                            className="rounded-full bg-red-500/10 px-3 py-1 text-sm text-red-400"
                                                        >
                                                            {skill}
                                                        </span>

                                                    )
                                                )}

                                            </div>

                                        ) : (

                                            <p className="mt-3 text-green-400">
                                                No missing skills 🎉
                                            </p>

                                        )}

                                    </div>

                                </div>


                                {/* Bottom */}

                                <div className="mt-8 border-t border-slate-800 pt-5">

                                    <p className="text-sm text-slate-500">

                                        Analyzed{" "}

                                        {new Date(
                                            match.created_at
                                        ).toLocaleDateString()}

                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </DashboardLayout>
    );
}

export default MatchHistory;