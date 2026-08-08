import { useEffect, useState } from "react";
import {
    BarChart3,
    TrendingUp,
    Award,
    Target,
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { getMatchAnalytics } from "../../services/jobService";

function Analytics() {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAnalytics();
    }, []);

    async function loadAnalytics() {
        try {
            setLoading(true);

            const data = await getMatchAnalytics();

            console.log("Analytics:", data);

            setAnalytics(data);
        } catch (error) {
            console.error("Failed to load analytics:", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <DashboardLayout>
                <p className="text-slate-400">
                    Loading analytics...
                </p>
            </DashboardLayout>
        );
    }

    if (!analytics) {
        return (
            <DashboardLayout>
                <p className="text-red-400">
                    Failed to load analytics.
                </p>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>

            <div className="mx-auto max-w-6xl">

                {/* Header */}

                <div>

                    <h1 className="text-4xl font-bold text-white">
                        Analytics
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Track your resume performance and job matching
                        progress.
                    </p>

                </div>


                {/* Statistics */}

                <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                    {/* Total Matches */}

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-slate-400">
                                    Total Matches
                                </p>

                                <h2 className="mt-2 text-4xl font-black text-white">
                                    {analytics.total_matches}
                                </h2>
                            </div>

                            <div className="rounded-2xl bg-blue-600/20 p-3">
                                <BarChart3
                                    className="text-blue-400"
                                    size={26}
                                />
                            </div>

                        </div>

                    </div>


                    {/* Average Score */}

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-slate-400">
                                    Average Score
                                </p>

                                <h2 className="mt-2 text-4xl font-black text-green-400">
                                    {analytics.average_score}%
                                </h2>

                            </div>

                            <div className="rounded-2xl bg-green-500/20 p-3">

                                <TrendingUp
                                    className="text-green-400"
                                    size={26}
                                />

                            </div>

                        </div>

                    </div>


                    {/* Best Score */}

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-slate-400">
                                    Best Match
                                </p>

                                <h2 className="mt-2 text-4xl font-black text-yellow-400">
                                    {analytics.best_score}%
                                </h2>

                            </div>

                            <div className="rounded-2xl bg-yellow-500/20 p-3">

                                <Award
                                    className="text-yellow-400"
                                    size={26}
                                />

                            </div>

                        </div>

                    </div>


                    {/* Lowest Score */}

                    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-slate-400">
                                    Lowest Match
                                </p>

                                <h2 className="mt-2 text-4xl font-black text-red-400">
                                    {analytics.lowest_score}%
                                </h2>

                            </div>

                            <div className="rounded-2xl bg-red-500/20 p-3">

                                <Target
                                    className="text-red-400"
                                    size={26}
                                />

                            </div>

                        </div>

                    </div>

                </div>


                {/* Missing Skills */}

                <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">

                    <h2 className="text-2xl font-bold text-white">
                        Most Frequently Missing Skills
                    </h2>

                    <p className="mt-2 text-slate-400">
                        Skills that appear most often in jobs but are missing
                        from your resume.
                    </p>


                    {analytics.most_missing_skills?.length > 0 ? (

                        <div className="mt-8 space-y-5">

                            {analytics.most_missing_skills.map(
                                (item, index) => {

                                    const maxCount =
                                        analytics.most_missing_skills[0]
                                            .count;

                                    const percentage =
                                        (item.count / maxCount) * 100;

                                    return (
                                        <div key={index}>

                                            <div className="mb-2 flex items-center justify-between">

                                                <span className="font-medium text-white">
                                                    {item.skill}
                                                </span>

                                                <span className="text-sm text-slate-400">
                                                    {item.count}{" "}
                                                    {item.count === 1
                                                        ? "time"
                                                        : "times"}
                                                </span>

                                            </div>

                                            <div className="h-3 rounded-full bg-slate-800">

                                                <div
                                                    className="h-3 rounded-full bg-blue-500 transition-all duration-500"
                                                    style={{
                                                        width: `${percentage}%`,
                                                    }}
                                                />

                                            </div>

                                        </div>
                                    );
                                }
                            )}

                        </div>

                    ) : (

                        <div className="mt-8 rounded-2xl bg-slate-800 p-6 text-center">

                            <p className="text-green-400">
                                🎉 No missing skills found yet.
                            </p>

                        </div>

                    )}

                </div>


                {/* Empty State */}

                {analytics.total_matches === 0 && (

                    <div className="mt-8 rounded-3xl border border-dashed border-slate-700 p-10 text-center">

                        <p className="text-slate-400">
                            Analyze some jobs to start building your analytics.
                        </p>

                    </div>

                )}

            </div>

        </DashboardLayout>
    );
}

export default Analytics;