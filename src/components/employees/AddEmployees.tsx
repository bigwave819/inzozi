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
    const { signature, timestamp, apiKey, cloudName, folder } =
      await getCloudinarySignature();

    return new Promise<string>((resolve, reject) => {
      const data = new FormData();
      data.append("file", file);
      data.append("api_key", apiKey);
      data.append("timestamp", timestamp.toString());
      data.append("signature", signature);
      data.append("folder", folder);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`);

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
        }
      };

      xhr.onerror = () => reject("Network error during upload");
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
      <Dialog.Trigger className="bg-[#2B4468] hover:bg-[#1f3350] cursor-pointer px-4 py-1 text-white">
        Add Employee +
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md max-w-2xl w-[90vw] max-h-[85vh] overflow-y-auto shadow-lg z-50">
          <Dialog.Title className="text-lg font-bold mb-4">Add Employee</Dialog.Title>

          {error && <p className="text-red-600 mb-2">{error}</p>}

          <form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
              <input
                name="name"
                type="text"
                className="w-full px-3 py-2 mt-2 mb-3 bg-blue-50 focus:outline-none"
                placeholder="Enter Name"
                required
              />
            </div>
            <div>
              <label>Email</label>
              <input
                name="email"
                type="email"
                className="w-full px-3 py-2 mt-2 mb-3 bg-blue-50 focus:outline-none"
                placeholder="Enter Email"
                required
              />
            </div>
            <div>
              <label>Phone</label>
              <input
                name="phone"
                type="text"
                className="w-full px-3 py-2 mt-2 mb-3 bg-blue-50 focus:outline-none"
                placeholder="Enter Number"
                required
              />
            </div>
            <div className="flex flex-col">
              <label>Role</label>
              <select
                name="role"
                className="w-full px-3 py-2 mt-2 mb-3 bg-blue-50 focus:outline-none"
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
              <label>Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="mt-2 mb-3"
              />
              {loading && (
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-[#2B4468] hover:bg-[#1f3350] text-white rounded-md disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Add Employee"}
            </button>
          </form>

          <div className="mt-4 flex justify-end">
            <Dialog.Close className="px-3 py-1 bg-gray-200 rounded-md">
              Close
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default AddEmployees;