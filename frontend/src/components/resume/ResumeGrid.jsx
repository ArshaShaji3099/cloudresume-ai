import ResumeCard from "./ResumeCard";

function ResumeGrid({ resumes, onResumeDeleted }) {

    if (resumes.length === 0) {
        return (
            <div className="mt-10 rounded-2xl border border-dashed border-slate-700 p-12 text-center">
                <h2 className="text-2xl font-semibold text-white">
                    No resumes uploaded yet
                </h2>

                <p className="mt-3 text-slate-400">
                    Upload your first resume to start analyzing it.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">

            {resumes.map((resume) => (
                <ResumeCard
                    key={resume.id}
                    resume={resume}
                    onResumeDeleted={onResumeDeleted}
                />
            ))}

        </div>
    );
}

export default ResumeGrid;