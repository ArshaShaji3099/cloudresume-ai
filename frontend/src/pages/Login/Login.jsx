import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setMessage("");

        if (!email || !password) {
            setMessage("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post("auth/login/", {
                email,
                password,
            });

            localStorage.setItem(
                "access",
                response.data.access
            );

            localStorage.setItem(
                "refresh",
                response.data.refresh
            );

            setMessage("Login successful!");

            navigate("/dashboard");

        } catch (error) {
            console.error(error);

            setMessage(
                error?.response?.data?.detail ||
                "Invalid email or password."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950">

            {/* Background Effects */}

            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

            <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />

            {/* Main */}

            <div className="relative flex min-h-screen items-center justify-center px-6 py-12">

                <div className="w-full max-w-md">

                    {/* Logo */}

                    <div className="mb-8 text-center">

                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-xl shadow-blue-600/20">

                            <Sparkles
                                size={30}
                                className="text-white"
                            />

                        </div>

                        <h1 className="text-3xl font-black tracking-tight text-white">
                            ResumePilot
                        </h1>

                        <p className="mt-2 text-sm text-slate-400">
                            AI-powered resume optimization
                        </p>

                    </div>

                    {/* Card */}

                    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">

                        {/* Heading */}

                        <div className="mb-8">

                            <h2 className="text-2xl font-bold text-white">
                                Welcome back
                            </h2>

                            <p className="mt-2 text-sm text-slate-400">
                                Sign in to continue to your ResumePilot dashboard.
                            </p>

                        </div>

                        {/* Error / Success */}

                        {message && (
                            <div
                                className={`mb-6 rounded-xl border px-4 py-3 text-sm ${message.toLowerCase().includes("successful")
                                        ? "border-green-500/20 bg-green-500/10 text-green-400"
                                        : "border-red-500/20 bg-red-500/10 text-red-400"
                                    }`}
                            >
                                {message}
                            </div>
                        )}

                        {/* Form */}

                        <form
                            onSubmit={handleLogin}
                            className="space-y-5"
                        >

                            {/* Email */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Email address
                                </label>

                                <div className="relative">

                                    <Mail
                                        size={19}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                                    />

                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="w-full rounded-xl border border-slate-700 bg-slate-800/70 py-3.5 pl-12 pr-4 text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />

                                </div>

                            </div>

                            {/* Password */}

                            <div>

                                <div className="mb-2 flex items-center justify-between">

                                    <label className="text-sm font-medium text-slate-300">
                                        Password
                                    </label>

                                    <button
                                        type="button"
                                        className="text-xs font-medium text-blue-400 transition hover:text-blue-300"
                                    >
                                        Forgot password?
                                    </button>

                                </div>

                                <div className="relative">

                                    <Lock
                                        size={19}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                                    />

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        className="w-full rounded-xl border border-slate-700 bg-slate-800/70 py-3.5 pl-12 pr-12 text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-300"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={19} />
                                        ) : (
                                            <Eye size={19} />
                                        )}
                                    </button>

                                </div>

                            </div>

                            {/* Remember */}

                            <div className="flex items-center gap-3">

                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500"
                                />

                                <label
                                    htmlFor="remember"
                                    className="text-sm text-slate-400"
                                >
                                    Remember me
                                </label>

                            </div>

                            {/* Login */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">

                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                                        Signing in...

                                    </div>
                                ) : (
                                    "Sign in"
                                )}
                            </button>

                        </form>

                        {/* Register */}

                        <div className="mt-8 border-t border-slate-800 pt-6 text-center">

                            <p className="text-sm text-slate-400">
                                Don't have an account?{" "}

                                <Link
                                    to="/register"
                                    className="font-semibold text-blue-400 transition hover:text-blue-300"
                                >
                                    Create account
                                </Link>

                            </p>

                        </div>

                    </div>

                    {/* Footer */}

                    <p className="mt-6 text-center text-xs text-slate-600">
                        © {new Date().getFullYear()} ResumePilot. All rights reserved.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;