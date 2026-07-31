import {
    LayoutDashboard,
    FileText,
    Briefcase,
    BarChart3,
    User,
    Settings,
    LogOut,
} from "lucide-react";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: FileText, label: "My Resumes" },
    { icon: BarChart3, label: "ATS Analysis" },
    { icon: Briefcase, label: "Jobs" },
    { icon: User, label: "Profile" },
    { icon: Settings, label: "Settings" },
];

function Sidebar() {
    return (
        <aside className="w-64 bg-slate-900 border-r border-slate-800 min-h-screen p-6 flex flex-col">
            <h1 className="text-2xl font-bold text-white mb-10">
                ☁ ResumePilot
            </h1>

            <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.label}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-blue-600 hover:text-white transition-all duration-300"
                    >
                        <item.icon size={20} />
                        {item.label}
                    </button>
                ))}
            </nav>

            <button className="flex items-center gap-3 rounded-xl px-4 py-3 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300">
                <LogOut size={20} />
                Logout
            </button>
        </aside>
    );
}

export default Sidebar;