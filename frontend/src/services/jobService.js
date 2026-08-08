import api from "./api";

// Create a new job description
export const createJob = async (jobData) => {
    const response = await api.post("/jobs/", jobData);
    return response.data;
};

// Match a resume with a job description
export const matchResume = async (jobId, resumeId) => {
    const response = await api.post(
        `/jobs/${jobId}/match/?resume_id=${resumeId}`
    );

    return response.data;
};

// Get all job descriptions
export const getJobs = async () => {
    const response = await api.get("/jobs/");
    return response.data;
};

// Get a single job description (optional, useful later)
export const getJob = async (id) => {
    const response = await api.get(`/jobs/${id}/`);
    return response.data;
};

// Delete a job description
export const deleteJob = async (id) => {
    const response = await api.delete(`/jobs/${id}/`);
    return response.data;
};

export const getMatchHistory = async () => {
    const response = await api.get("/jobs/matches/");
    return response.data;
};

export const getMatchAnalytics = async () => {
    const response = await api.get("/jobs/analytics/");
    return response.data;
};