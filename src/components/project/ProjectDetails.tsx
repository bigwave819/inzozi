'use client';

import { useState } from "react";
import { updateStatus } from "@/actions/adminActions";
import { ProjectStatus } from "@/generated/prisma";
import Image from "next/image";

interface Employee {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
}

interface ProjectDetailsProps {
  project: {
    id: string;
    name: string;
    details: string;
    status: ProjectStatus;
    startDate: Date;
    endDate?: Date | null;
    employees: Employee[];
    logo?: string | null;
  };
}

export default function ProjectDetailsComponent({ project }: ProjectDetailsProps) {
  const [status, setStatus] = useState<ProjectStatus>(project.status);

  if (!project) return <p>Project not found</p>;

  const handleUpdateStatus = async (newStatus: ProjectStatus) => {
    try {
      const result = await updateStatus(project.id, newStatus);
      if (result.success) setStatus(newStatus);
      else alert("Failed to update status");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md max-w-2xl w-full mx-auto">
      {/* Project Logo */}
      {project.logo && (
        <div className="mb-4 flex justify-center">
          <Image
            src={project.logo}
            alt={`${project.name} Logo`}
            width={128}
            height={128}
            className="object-contain rounded-md"
            unoptimized
          />
        </div>
      )}

      {/* Project Name */}
      <h1 className="text-2xl font-bold mb-4 text-center">{project.name}</h1>

      {/* Details */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Details</h2>
        <p className="text-gray-700">{project.details}</p>
      </div>

      {/* Status */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Status</h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            status === "COMPLETED"
              ? "bg-green-100 text-green-800"
              : status === "CANCELED"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Timeline */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Timeline</h2>
        <p>Start Date: {project.startDate.toLocaleDateString()}</p>
        {project.endDate && <p>End Date: {project.endDate.toLocaleDateString()}</p>}
      </div>

      {/* Assigned Employees */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Assigned Employees</h2>
        {project.employees.length > 0 ? (
          <ul className="list-disc list-inside">
            {project.employees.map((emp) => (
              <li key={emp.id} className="flex items-center gap-2">
                {emp.imageUrl && (
                  <Image
                    src={emp.imageUrl}
                    alt={emp.name}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                    unoptimized
                  />
                )}
                <span>{emp.name} - {emp.role}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No employees assigned to this project</p>
        )}
      </div>

      {/* Status Update Buttons */}
      {status !== "COMPLETED" && (
        <div className="flex gap-4 mt-6 flex-wrap">
          {status !== "CANCELED" && (
            <button
              onClick={() => handleUpdateStatus("CANCELED")}
              className="flex-1 min-w-[120px] py-2 bg-red-700 text-white font-medium rounded hover:bg-red-800 transition"
            >
              CANCELED
            </button>
          )}

          <button
            onClick={() => handleUpdateStatus("COMPLETED")}
            className="flex-1 min-w-[120px] py-2 bg-[#2B4468] text-white font-medium rounded hover:bg-[#1f3350] transition"
          >
            COMPLETED
          </button>

          {status === "CANCELED" && (
            <button
              onClick={() => handleUpdateStatus("PENDING")}
              className="flex-1 min-w-[120px] py-2 bg-yellow-600 text-white font-medium rounded hover:bg-yellow-700 transition"
            >
              Set to PENDING
            </button>
          )}
        </div>
      )}
    </div>
  );
}
