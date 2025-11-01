'use client';

import { createEmployee } from "@/actions/adminActions";
import * as Dialog from "@radix-ui/react-dialog";
import { useState, useRef } from "react";

function AddEmployees() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);

  // 🔹 Call our Next.js API to get Cloudinary signature
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

  // 🔹 Upload with progress
  async function uploadToCloudinary(file: File) {
    setLoading(true);
    const { signature, timestamp, apiKey } = await getCloudinarySignature();

    return new Promise<string>((resolve, reject) => {
      const data = new FormData();
      data.append("file", file);
      data.append("api_key", apiKey);
      data.append("timestamp", timestamp.toString());
      data.append("signature", signature);
      data.append('folder', 'inzozi-employees');

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
  }

  // 🔹 Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    let imageUrl = uploadedUrl;
    if (imageFile && !uploadedUrl) {
      try {
        imageUrl = await uploadToCloudinary(imageFile);
      } catch (err) {
        console.error("Upload error:", err);
        setError("Failed to upload image");
        return;
      }
    }

    // Use the formRef to get the form element
    if (!formRef.current) {
      setError("Form not found");
      return;
    }

    const formData = new FormData(formRef.current);
    const employeeData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      role: formData.get("role") as string,
      image: imageUrl,
    };

    const result = await createEmployee(employeeData);
    if (result?.success) {
      setOpen(false); // Close dialog on success
      // Reset form
      formRef.current?.reset();
      setImageFile(null);
      setUploadProgress(0);
      setUploadedUrl("");
    } else {
      setError(result?.message || "Error creating employee.");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="bg-[#2B4468] dark:bg-blue-600 hover:bg-[#1f3350] dark:hover:bg-blue-700 cursor-pointer px-4 py-1 text-white rounded transition-colors">
        Add Employee +
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 dark:bg-black/60" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 p-6 rounded-md max-w-2xl w-[90vw] max-h-[85vh] overflow-y-auto shadow-lg z-50 border border-gray-200 dark:border-gray-700">
          <Dialog.Title className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
            Add Employee
          </Dialog.Title>

          {error && <p className="text-red-600 dark:text-red-400 mb-2">{error}</p>}

          <form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <label className="text-gray-700 dark:text-gray-300">Name</label>
              <input
                name="name"
                type="text"
                className="w-full px-3 py-2 mt-2 mb-3 bg-blue-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2B4468] dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded border border-gray-300 dark:border-gray-600 transition-colors"
                placeholder="Enter Name"
                required
              />
            </div>
            <div>
              <label className="text-gray-700 dark:text-gray-300">Email</label>
              <input
                name="email"
                type="email"
                className="w-full px-3 py-2 mt-2 mb-3 bg-blue-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2B4468] dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded border border-gray-300 dark:border-gray-600 transition-colors"
                placeholder="Enter Email"
                required
              />
            </div>
            <div>
              <label className="text-gray-700 dark:text-gray-300">Phone</label>
              <input
                name="phone"
                type="text"
                className="w-full px-3 py-2 mt-2 mb-3 bg-blue-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2B4468] dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded border border-gray-300 dark:border-gray-600 transition-colors"
                placeholder="Enter Number"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 dark:text-gray-300">Role</label>
              <select
                name="role"
                className="w-full px-3 py-2 mt-2 mb-3 bg-blue-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2B4468] dark:focus:ring-blue-400 text-gray-900 dark:text-gray-100 rounded border border-gray-300 dark:border-gray-600 transition-colors"
                required
              >
                <option value="">Select a role</option>
                <option value="Backend">Backend</option>
                <option value="Frontend">Frontend</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Project Manager">Project Manager</option>
                <option value="QA Manager">QA Manager</option>
              </select>
            </div>

            {/* Profile Image Upload */}
            <div>
              <label className="text-gray-700 dark:text-gray-300">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="mt-2 mb-3 text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#2B4468] dark:file:bg-blue-600 file:text-white hover:file:bg-[#1f3350] dark:hover:file:bg-blue-700 transition-colors"
              />
              {loading && (
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                  <div
                    className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-[#2B4468] dark:bg-blue-600 hover:bg-[#1f3350] dark:hover:bg-blue-700 text-white rounded-md disabled:opacity-50 transition-colors"
            >
              {loading ? "Uploading..." : "Add Employee"}
            </button>
          </form>

          <div className="mt-4 flex justify-end">
            <Dialog.Close className="px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors">
              Close
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default AddEmployees;