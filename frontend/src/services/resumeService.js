import api from "../api/axios";

// Get all resumes
export const getResumes = async () => {
    const response = await api.get("/resumes/");
    return response.data;
};

// Upload a resume
export const uploadResume = async (formData) => {
    const response = await api.post("/resumes/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

// Delete a resume
export const deleteResume = async (id) => {
    await api.delete(`/resumes/${id}/`);
};

// Analyze a resume
export const analyzeResume = async (id) => {
    const response = await api.post(`/resumes/${id}/analyze/`);
    return response.data;
};