import { Bell, Search } from "lucide-react";

function Topbar() {
    return (
        <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-8 py-5">

            <div>

                <h1 className="text-2xl font-bold text-white">
                    Welcome Back 👋
                </h1>

                <p className="text-slate-400">
                    Manage your resumes and track your progress.
                </p>

            </div>

            <div className="flex items-center gap-5">

                <button className="rounded-xl bg-slate-800 p-3 hover:bg-slate-700">
                    <Search className="text-slate-300" />
                </button>

                <button className="rounded-xl bg-slate-800 p-3 hover:bg-slate-700">
                    <Bell className="text-slate-300" />
                </button>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                    A
                </div>

            </div>

        </header>
    );
}

export default Topbar;