import DashboardLayout from "../../components/layout/DashboardLayout";
import StatCard from "../../components/dashboard/StatCard";
import DashboardChart from "../../components/dashboard/DashboardChart";
import RecentActivity from "../../components/dashboard/RecentActivity";

import {
    FileText,
    BarChart3,
    Briefcase,
    Users,
} from "lucide-react";

function Dashboard() {
    return (
        <DashboardLayout>
            <h1 className="text-4xl font-bold text-white">
                Dashboard
            </h1>

            <p className="text-slate-400 mt-2">
                Welcome to ResumePilot AI 🚀
            </p>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
                <StatCard
                    title="Total Resumes"
                    value="12"
                    icon={FileText}
                    color="#2563EB"
                />

                <StatCard
                    title="ATS Average"
                    value="87%"
                    icon={BarChart3}
                    color="#10B981"
                />

                <StatCard
                    title="Jobs"
                    value="18"
                    icon={Briefcase}
                    color="#F59E0B"
                />

                <StatCard
                    title="Matches"
                    value="24"
                    icon={Users}
                    color="#8B5CF6"
                />
            </div>

            {/* Chart & Recent Activity */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-10">
                <div className="xl:col-span-2">
                    <DashboardChart />
                </div>

                <RecentActivity />
            </div>

        </DashboardLayout>
    );
}

export default Dashboard;