import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

import Dashboard from "../pages/Dashboard/Dashboard";
import ResumeList from "../pages/Resume/ResumeList";
import ResumeAnalysis from "../pages/ATS/ResumeAnalysis";
import JobMatching from "../pages/Jobs/JobMatching";
import Analytics from "../pages/Analytics/Analytics";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import ResumeDetail from "../pages/Resume/ResumeDetail";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Landing Page */}
                <Route path="/" element={<Home />} />

                {/* Authentication */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/resumes"
                    element={
                        <ProtectedRoute>
                            <ResumeList />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/resume-analysis"
                    element={
                        <ProtectedRoute>
                            <ResumeAnalysis />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/job-matching"
                    element={
                        <ProtectedRoute>
                            <JobMatching />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/analytics"
                    element={
                        <ProtectedRoute>
                            <Analytics />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/resumes/:id"
                    element={
                        <ProtectedRoute>
                            <ResumeDetail />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/resumes/:id"
                    element={
                        <ProtectedRoute>
                            <ResumeDetail />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;