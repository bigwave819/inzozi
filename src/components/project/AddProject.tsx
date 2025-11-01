'use client';

import { createProject } from "@/actions/adminActions";
import * as Dialog from "@radix-ui/react-dialog";
import { useState, useRef, useEffect } from "react";
import { getEmployees } from "@/actions/adminActions";
import { Upload, Users, Calendar, DollarSign, FileText, X } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  imageUrl: string;
  createdAt: Date;
}

function AddProjects() {
    const [employees, setEmployees] = useState<Employee[]>([]);
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
                setError("Failed to upload logo" + err);
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
            <Dialog.Trigger className="bg-[#2B4468] dark:bg-blue-600 hover:bg-[#1f3350] dark:hover:bg-blue-700 cursor-pointer px-4 py-2 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg">
                Add Project +
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 p-8 rounded-2xl max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto shadow-2xl dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 z-50">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <Dialog.Title className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#2B4468] dark:bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">+</span>
                            </div>
                            Add New Project
                        </Dialog.Title>
                        <Dialog.Close className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <X size={20} />
                        </Dialog.Close>
                    </div>

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                        {/* Project Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Project Name
                            </label>
                            <input 
                                name="name" 
                                type="text" 
                                required 
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B4468] dark:focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                                placeholder="Enter project name"
                            />
                        </div>

                        {/* Date Range */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                    <Calendar size={16} />
                                    Start Date
                                </label>
                                <input 
                                    name="startDate" 
                                    type="date" 
                                    required 
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B4468] dark:focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                    <Calendar size={16} />
                                    End Date
                                </label>
                                <input 
                                    name="endDate" 
                                    type="date" 
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B4468] dark:focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Price */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                <DollarSign size={16} />
                                Project Price
                            </label>
                            <input 
                                name="price" 
                                type="text" 
                                required 
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B4468] dark:focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                                placeholder="Enter project price"
                            />
                        </div>

                        {/* Details */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                <FileText size={16} />
                                Project Details
                            </label>
                            <textarea 
                                name="details" 
                                required 
                                rows={4}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B4468] dark:focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 resize-none transition-colors"
                                placeholder="Describe the project details..."
                            />
                        </div>

                        {/* Assign Employees */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                <Users size={16} />
                                Assign Team Members
                            </label>
                            <div className="max-h-48 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-xl p-4 bg-gray-50 dark:bg-gray-800">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {employees.map(emp => (
                                        <label 
                                            key={emp.id} 
                                            className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-[#2B4468] dark:hover:border-blue-400 transition-colors cursor-pointer"
                                        >
                                            <input 
                                                type="checkbox" 
                                                name="employees" 
                                                value={emp.id}
                                                className="rounded border-gray-300 dark:border-gray-600 text-[#2B4468] dark:text-blue-500 focus:ring-[#2B4468] dark:focus:ring-blue-500"
                                            />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {emp.name}
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                                                {emp.role}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                {employees.length === 0 && (
                                    <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                                        No employees available
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Project Logo */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                                <Upload size={16} />
                                Project Logo
                            </label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={e => setImageFile(e.target.files?.[0] || null)} 
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B4468] dark:focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#2B4468] dark:file:bg-blue-600 file:text-white hover:file:bg-[#1f3350] dark:hover:file:bg-blue-700 transition-colors"
                            />
                            {loading && (
                                <div className="mt-3">
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                        <div 
                                            className="bg-[#2B4468] dark:bg-blue-600 h-3 rounded-full transition-all duration-300"
                                            style={{ width: `${uploadProgress}%` }}
                                        />
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                                        Uploading... {uploadProgress}%
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full py-3 bg-[#2B4468] dark:bg-blue-600 hover:bg-[#1f3350] dark:hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-lg"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Creating Project...
                                </div>
                            ) : (
                                "Create Project"
                            )}
                        </button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default AddProjects;