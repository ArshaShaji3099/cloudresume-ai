import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({ children }) {
    return (
        <div className="flex bg-slate-950 min-h-screen">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Navbar />

                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;