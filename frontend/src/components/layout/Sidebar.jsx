import {
    LayoutDashboard,
    FileText,
    BrainCircuit,
    Briefcase,
    BarChart3,
    User,
    Settings,
    LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        title: "My Resumes",
        icon: FileText,
        path: "/resumes",
    },
    {
        title: "Resume Analysis",
        icon: BrainCircuit,
        path: "/resume-analysis",
    },
    {
        title: "Job Matching",
        icon: Briefcase,
        path: "/job-matching",
    },
    {
        title: "Match History",
        icon: Briefcase,
        path: "/match-history",
    },
    {
        title: "Analytics",
        icon: BarChart3,
        path: "/analytics",
    },
    {
        title: "Profile",
        icon: User,
        path: "/profile",
    },
    {
        title: "Settings",
        icon: Settings,
        path: "/settings",
    },
];

function Sidebar() {
    return (
        <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-900">

            {/* Logo */}

            <div className="border-b border-slate-800 px-8 py-8">

                <h1 className="text-3xl font-black text-white">
                    ResumePilot
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                    AI Resume Platform
                </p>

            </div>

            {/* Menu */}

            <nav className="flex-1 px-5 py-8">

                <div className="space-y-2">

                    {menuItems.map((item) => {

                        const Icon = item.icon;

                        return (

                            <NavLink
                                key={item.title}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 rounded-xl px-5 py-4 transition ${isActive
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                    }`
                                }
                            >

                                <Icon size={22} />

                                <span className="font-medium">
                                    {item.title}
                                </span>

                            </NavLink>

                        );
                    })}

                </div>

            </nav>

            {/* Logout */}

            <div className="border-t border-slate-800 p-5">

                <button
                    className="flex w-full items-center gap-4 rounded-xl px-5 py-4 text-red-400 transition hover:bg-red-500/10"
                >

                    <LogOut size={22} />

                    Logout

                </button>

            </div>

        </aside>
    );
}

export default Sidebar;