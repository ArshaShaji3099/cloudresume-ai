import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="border-t border-slate-800 bg-slate-950">

            <div className="mx-auto max-w-7xl px-6 py-16">

                <div className="flex flex-col items-center justify-between gap-8 md:flex-row">

                    <div>

                        <div className="flex items-center gap-3">

                            <FileText className="text-blue-500" />

                            <span className="text-2xl font-bold text-white">
                                ResumePilot AI
                            </span>

                        </div>

                        <p className="mt-4 max-w-md text-slate-400">
                            AI-powered resume optimization platform
                            helping professionals improve ATS scores,
                            analyze resumes, and land more interviews.
                        </p>

                    </div>

                    <div className="flex gap-10 text-slate-400">

                        <Link to="/">Home</Link>

                        <Link to="/login">Login</Link>

                        <Link to="/register">Register</Link>

                    </div>

                </div>

                <div className="mt-10 border-t border-slate-800 pt-8 text-center text-slate-500">

                    © 2026 ResumePilot AI. All rights reserved.

                </div>

            </div>

        </footer>
    );
}

export default Footer;