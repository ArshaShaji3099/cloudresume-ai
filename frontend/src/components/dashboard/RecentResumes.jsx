import { FileText, ArrowRight } from "lucide-react";

const resumes = [
    {
        id: 1,
        name: "Software_Engineer.pdf",
        score: 92,
        date: "Today",
    },
    {
        id: 2,
        name: "Frontend_Developer.pdf",
        score: 88,
        date: "Yesterday",
    },
    {
        id: 3,
        name: "Python_Django.pdf",
        score: 85,
        date: "2 days ago",
    },
];

function RecentResumes() {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="mb-6 flex items-center justify-between">

                <h2 className="text-xl font-bold text-white">
                    Recent Resumes
                </h2>

                <button className="text-blue-400 hover:text-blue-300">
                    View All
                </button>

            </div>

            <div className="space-y-4">

                {resumes.map((resume) => (

                    <div
                        key={resume.id}
                        className="flex items-center justify-between rounded-xl bg-slate-800 p-4 hover:bg-slate-700 transition"
                    >

                        <div className="flex items-center gap-4">

                            <div className="rounded-lg bg-blue-600/20 p-2">
                                <FileText className="text-blue-400" />
                            </div>

                            <div>

                                <h3 className="font-semibold text-white">
                                    {resume.name}
                                </h3>

                                <p className="text-sm text-slate-400">
                                    Uploaded {resume.date}
                                </p>

                            </div>

                        </div>

                        <div className="text-right">

                            <div className="font-bold text-green-400">
                                {resume.score}%
                            </div>

                            <ArrowRight
                                className="ml-auto mt-2 text-slate-500"
                                size={18}
                            />

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default RecentResumes;