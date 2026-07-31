import {
    FileSearch,
    Briefcase,
    Sparkles,
    BarChart3,
} from "lucide-react";

import FeatureCard from "./FeatureCard";

function Features() {
    return (
        <section className="bg-slate-950 py-28">

            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">

                    <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 text-sm text-blue-400">

                        AI FEATURES

                    </span>

                    <h2 className="mt-8 text-5xl font-black text-white">

                        Everything You Need
                        <br />
                        To Get Hired Faster

                    </h2>

                    <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-400">

                        ResumePilot AI combines resume analysis,
                        ATS optimization,
                        job matching,
                        and intelligent recommendations
                        into one powerful platform.

                    </p>

                </div>

                <div className="mt-20 grid gap-8 md:grid-cols-2">

                    <FeatureCard
                        icon={FileSearch}
                        title="ATS Resume Analysis"
                        description="Analyze your resume using modern ATS rules and discover how recruiters and applicant tracking systems evaluate your profile."
                    />

                    <FeatureCard
                        icon={Briefcase}
                        title="Job Description Matching"
                        description="Compare your resume against any job description and identify missing skills, keywords, and qualifications."
                    />

                    <FeatureCard
                        icon={Sparkles}
                        title="AI Resume Suggestions"
                        description="Receive intelligent recommendations to improve your resume, strengthen achievements, and increase interview opportunities."
                    />

                    <FeatureCard
                        icon={BarChart3}
                        title="Resume Analytics"
                        description="Track ATS scores, resume improvements, and application readiness with visual insights and progress reports."
                    />

                </div>

            </div>

        </section>
    );
}

export default Features;