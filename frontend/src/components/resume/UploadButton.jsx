import { Upload } from "lucide-react";

function UploadButton() {
    return (
        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">

            <Upload size={18} />

            Upload Resume

        </button>
    );
}

export default UploadButton;