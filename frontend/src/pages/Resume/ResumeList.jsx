import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import UploadButton from "../../components/resume/UploadButton";
import ResumeGrid from "../../components/resume/ResumeGrid";
import UploadModal from "../../components/resume/UploadModal";

import { getResumes } from "../../services/resumeService";

function ResumeList() {
    const [resumes, setResumes] = useState([]);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadResumes();
    }, []);

    async function loadResumes() {
        try {
            setLoading(true);

            const data = await getResumes();

            setResumes(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <DashboardLayout>

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-4xl font-bold text-white">
                        My Resumes
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Upload and manage your resumes.
                    </p>

                </div>

                <div onClick={() => setShowUploadModal(true)}>
                    <UploadButton />
                </div>

            </div>

            {loading ? (
                <p className="mt-10 text-slate-400">
                    Loading...
                </p>
            ) : (
                <ResumeGrid resumes={resumes} />
            )}

            {showUploadModal && (
                <UploadModal
                    onClose={() => setShowUploadModal(false)}
                    onUploadSuccess={loadResumes}
                />
            )}

        </DashboardLayout>
    );
}

export default ResumeList;