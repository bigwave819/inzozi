'use client';

import { createProject } from "@/actions/adminActions";
import * as Dialog from "@radix-ui/react-dialog";
import { useState, useRef, useEffect } from "react";
import { getEmployees } from "@/actions/adminActions";

function AddProjects() {
    const [employees, setEmployees] = useState<any[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedUrl, setUploadedUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                console.log("Fetching employees...");
                const emp = await getEmployees();
                console.log("Employees fetched:", emp);
                setEmployees(emp);
            } catch (err) {
                console.error("Failed to fetch employees:", err);
            }
        };
        fetchEmployees();
    }, []);

    // 🔹 Cloudinary signature
    async function getCloudinarySignature() {
        const res = await fetch("/api/cloudinary/signature");
        if (!res.ok) throw new Error("Failed to fetch signature");
        return res.json() as Promise<{
            signature: string;
            timestamp: number;
            apiKey: string;
            cloudName: string;
            folder: string;
        }>;
    }

    // 🔹 Upload file
    async function uploadToCloudinary(file: File) {
        setLoading(true);
        try {
            const { signature, timestamp, apiKey } = await getCloudinarySignature();
            return new Promise<string>((resolve, reject) => {
                const data = new FormData();
                data.append("file", file);
                data.append("api_key", apiKey);
                data.append("timestamp", timestamp.toString());
                data.append("signature", signature);
                data.append("folder", "inzozi-employees");

                const xhr = new XMLHttpRequest();
                xhr.open("POST", `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`);

                xhr.upload.addEventListener("progress", (e) => {
                    if (e.lengthComputable) {
                        setUploadProgress(Math.round((e.loaded * 100) / e.total));
                    }
                });

                xhr.onload = () => {
                    const res = JSON.parse(xhr.responseText);
                    if (xhr.status === 200) {
                        setUploadedUrl(res.secure_url);
                        setLoading(false);
                        resolve(res.secure_url);
                    } else {
                        reject(res.error?.message || "Upload failed");
                        setLoading(false);
                    }
                };

                xhr.onerror = () => {
                    setLoading(false);
                    reject("Network error during upload");
                };
                xhr.send(data);
            });
        } catch (err) {
            setLoading(false);
            throw err;
        }
    }

    // 🔹 Form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        let logoUrl = uploadedUrl;
        if (imageFile && !uploadedUrl) {
            try {
                logoUrl = await uploadToCloudinary(imageFile);
            } catch (err) {
                setError("Failed to upload logo");
                return;
            }
        }

        if (!formRef.current) {
            setError("Form not found");
            return;
        }

        const formData = new FormData(formRef.current);
        const projectData = {
            name: formData.get("name") as string,
            startDate: formData.get("startDate") as string,
            endDate: formData.get("endDate") as string,
            price: formData.get("price") as string,
            details: formData.get("details") as string,
            employees: formData.getAll("employees") as string[],
            logo: logoUrl
        };

        try {
            const result = await createProject(projectData);
            if (result?.success) {
                setOpen(false);
                formRef.current.reset();
                setImageFile(null);
                setUploadProgress(0);
                setUploadedUrl("");
            } else {
                setError("Error creating project.");
            }
        } catch (err) {
            console.error("Project creation failed:", err);
            setError("Failed to create project");
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger className="bg-[#2B4468] hover:bg-[#1f3350] cursor-pointer px-4 py-1 text-white">
                Add Project +
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md max-w-2xl w-[90vw] max-h-[85vh] overflow-y-auto shadow-lg z-50">
                    <Dialog.Title className="text-lg font-bold mb-4">Add Project</Dialog.Title>

                    {error && <p className="text-red-600 mb-2">{error}</p>}

                    <form ref={formRef} onSubmit={handleSubmit}>
                        <div>
                            <label>Name</label>
                            <input name="name" type="text" required className="w-full px-3 py-2 mt-2 mb-3 bg-blue-50 focus:outline-none" />
                        </div>
                        <div className="flex gap-4 mb-3">
                            <div className="flex-1">
                                <label>Start Date</label>
                                <input name="startDate" type="date" required className="w-full px-3 py-2 mt-2 bg-blue-50 focus:outline-none" />
                            </div>
                            <div className="flex-1">
                                <label>End Date</label>
                                <input name="endDate" type="date" className="w-full px-3 py-2 mt-2 bg-blue-50 focus:outline-none" />
                            </div>
                        </div>
                        <div>
                            <label>Price</label>
                            <input name="price" type="text" required className="w-full px-3 py-2 mt-2 mb-3 bg-blue-50 focus:outline-none" />
                        </div>
                        <div>
                            <label>Details</label>
                            <textarea name="details" required className="w-full px-3 py-2 mt-2 mb-3 bg-blue-50 focus:outline-none" />
                        </div>
                        <div>
                            <label>Assign Employees</label>
                            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border p-2 rounded mb-3">
                                {employees.map(emp => (
                                    <label key={emp.id} className="flex items-center gap-2 text-sm">
                                        <input type="checkbox" name="employees" value={emp.id} />
                                        {emp.name}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label>Project Logo</label>
                            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="mt-2 mb-3" />
                            {loading && (
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${uploadProgress}%` }} />
                                </div>
                            )}
                        </div>

                        <button type="submit" disabled={loading} className="w-full py-2 bg-[#2B4468] hover:bg-[#1f3350] text-white rounded-md disabled:opacity-50">
                            {loading ? "Uploading..." : "Add Project"}
                        </button>
                    </form>

                    <div className="mt-4 flex justify-end">
                        <Dialog.Close className="px-3 py-1 bg-gray-200 rounded-md">Close</Dialog.Close>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default AddProjects;
