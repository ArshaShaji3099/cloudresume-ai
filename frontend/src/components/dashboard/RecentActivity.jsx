import {
    Upload,
    Sparkles,
    Briefcase,
    CheckCircle,
} from "lucide-react";

const activities = [
    {
        icon: Upload,
        text: "Uploaded Software_Engineer.pdf",
    },
    {
        icon: Sparkles,
        text: "AI analyzed your resume",
    },
    {
        icon: Briefcase,
        text: "Matched with 5 new jobs",
    },
    {
        icon: CheckCircle,
        text: "ATS score improved to 92%",
    },
];

function RecentActivity() {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="mb-6 text-xl font-bold text-white">
                Recent Activity
            </h2>

            <div className="space-y-5">

                {activities.map((activity, index) => {

                    const Icon = activity.icon;

                    return (

                        <div
                            key={index}
                            className="flex items-center gap-4"
                        >

                            <div className="rounded-full bg-blue-600/20 p-3">

                                <Icon
                                    size={18}
                                    className="text-blue-400"
                                />

                            </div>

                            <p className="text-slate-300">
                                {activity.text}
                            </p>

                        </div>

                    );

                })}

            </div>

        </div>
    );
}

export default RecentActivity;