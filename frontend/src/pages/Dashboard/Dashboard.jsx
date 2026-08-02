import DashboardLayout from "../../components/layout/DashboardLayout";
import StatsGrid from "../../components/dashboard/StatsGrid";
import ATSChart from "../../components/dashboard/ATSChart";
import AIRecommendations from "../../components/dashboard/AIRecommendations";
import RecentResumes from "../../components/dashboard/RecentResumes";
import RecentActivity from "../../components/dashboard/RecentActivity";
function Dashboard() {
    return (
        <DashboardLayout>

            <div className="mb-10">

                <h1 className="text-4xl font-black text-white">
                    Good Evening 👋
                </h1>

                <p className="mt-2 text-slate-400">
                    Here's an overview of your resume performance today.
                </p>

            </div>

            <StatsGrid />

            <div className="mt-8 grid gap-8 lg:grid-cols-3">

                <div className="lg:col-span-2">
                    <ATSChart />
                </div>

                <AIRecommendations />

               

            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">

                <RecentResumes />

                <RecentActivity />

            </div>

        </DashboardLayout>
    );
}

export default Dashboard;