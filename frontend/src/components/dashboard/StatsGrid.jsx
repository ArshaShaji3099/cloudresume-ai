import {
    FileText,
    BarChart3,
    Briefcase,
    Sparkles,
} from "lucide-react";

import DashboardStat from "./DashboardStat";

function StatsGrid() {
    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <DashboardStat
                title="ATS Score"
                value="92%"
                icon={BarChart3}
                color="#2563EB"
            />

            <DashboardStat
                title="Resumes"
                value="5"
                icon={FileText}
                color="#10B981"
            />

            <DashboardStat
                title="Job Matches"
                value="18"
                icon={Briefcase}
                color="#F59E0B"
            />

            <DashboardStat
                title="AI Suggestions"
                value="12"
                icon={Sparkles}
                color="#8B5CF6"
            />

        </div>
    );
}

export default StatsGrid;