import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-3"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/30">
                        <FileText size={22} className="text-white" />
                    </div>

                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-white">
                            ResumePilot
                        </h1>

                        <p className="text-xs text-slate-400">
                            AI Resume Platform
                        </p>
                    </div>
                </Link>

                {/* Navigation */}
                <nav className="hidden items-center gap-10 md:flex">

                    <a
                        href="#features"
                        className="text-slate-300 transition hover:text-white"
                    >
                        Features
                    </a>

                    <a
                        href="#how"
                        className="text-slate-300 transition hover:text-white"
                    >
                        How it Works
                    </a>

                    <a
                        href="#pricing"
                        className="text-slate-300 transition hover:text-white"
                    >
                        Pricing
                    </a>

                </nav>

                {/* Right Side */}
                <div className="flex items-center gap-4">

                    <Link
                        to="/login"
                        className="font-medium text-slate-300 transition hover:text-white"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30"
                    >
                        Get Started
                    </Link>

                </div>

            </div>
        </header>
    );
}

export default Navbar;