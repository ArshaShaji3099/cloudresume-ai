import { useState } from "react";
import { uploadResume } from "../../services/resumeService";

function UploadModal({ onClose, onUploadSuccess }) {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !file) {
            alert("Please enter a title and select a PDF.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);

        try {
            setLoading(true);

            await uploadResume(formData);

            alert("Resume uploaded successfully!");

            onUploadSuccess();
            onClose();

        } catch (error) {
            console.error(error);
            alert("Upload failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">

            <div className="w-full max-w-md rounded-2xl bg-slate-900 p-6">

                <h2 className="mb-6 text-2xl font-bold text-white">
                    Upload Resume
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <input
                        type="text"
                        placeholder="Resume Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-xl bg-slate-800 p-3 text-white"
                    />

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="w-full text-slate-300"
                    />

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl bg-slate-700 px-5 py-2 text-white"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl bg-blue-600 px-5 py-2 text-white"
                        >
                            {loading ? "Uploading..." : "Upload"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default UploadModal;