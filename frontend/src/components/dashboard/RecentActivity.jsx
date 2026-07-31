const activities = [
    "Resume uploaded successfully",
    "ATS score improved to 87%",
    "Matched with Software Engineer role",
    "New job description analyzed",
];

function RecentActivity() {
    return (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">
                Recent Activity
            </h2>

            <div className="space-y-4">
                {activities.map((activity, index) => (
                    <div
                        key={index}
                        className="rounded-lg bg-slate-800 p-4 text-slate-300"
                    >
                        {activity}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecentActivity;