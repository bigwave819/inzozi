'use client';

import { useState } from "react";
import { updateStatus } from "@/actions/adminActions";
import { ProjectStatus } from "@prisma/client";
import Image from "next/image";
import { Calendar, Users, FileText, Target, CheckCircle, XCircle, Clock, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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

  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="w-5 h-5" />;
      case "CANCELED":
        return <XCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800";
      case "CANCELED":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800";
      default:
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#2B4468] dark:hover:text-blue-400 mb-6 transition-colors duration-200 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Projects
      </button>

      {/* Main Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-2xl dark:hover:shadow-gray-900/70">
        
        {/* Header Section with Gradient */}
        <div className="bg-gradient-to-r from-[#2B4468] to-blue-700 dark:from-gray-900 dark:to-blue-900 p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -translate-x-12 translate-y-12"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Project Logo */}
            {project.logo && (
              <div className="flex-shrink-0">
                <Image
                  src={project.logo}
                  alt={`${project.name} Logo`}
                  width={80}
                  height={80}
                  className="object-contain rounded-xl bg-white/10 p-2 backdrop-blur-sm border border-white/20"
                  unoptimized
                />
              </div>
            )}
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
              
              {/* Status Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(status)} backdrop-blur-sm`}>
                {getStatusIcon(status)}
                <span className="font-semibold capitalize">{status.toLowerCase()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-8">
          {/* Project Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Details Card */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-5 h-5 text-[#2B4468] dark:text-blue-400" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Project Details</h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{project.details}</p>
              </div>

              {/* Timeline Card */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-[#2B4468] dark:text-blue-400" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Timeline</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">Start Date</span>
                    <span className="text-gray-900 dark:text-gray-100 font-semibold">
                      {project.startDate.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  {project.endDate && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">End Date</span>
                      <span className="text-gray-900 dark:text-gray-100 font-semibold">
                        {project.endDate.toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Employees Card */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 h-fit">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-[#2B4468] dark:text-blue-400" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Team Members ({project.employees.length})
                  </h2>
                </div>
                
                {project.employees.length > 0 ? (
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {project.employees.map((emp) => (
                      <div 
                        key={emp.id} 
                        className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#2B4468] dark:hover:border-blue-400 transition-colors duration-200"
                      >
                        <div className="flex-shrink-0">
                          {emp.imageUrl ? (
                            <Image
                              src={emp.imageUrl}
                              alt={emp.name}
                              width={40}
                              height={40}
                              className="rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                              unoptimized
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-[#2B4468] dark:bg-blue-600 flex items-center justify-center text-white font-semibold">
                              {emp.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-gray-100 truncate">{emp.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{emp.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No team members assigned</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Status Update Section */}
          {status !== "COMPLETED" && (
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-5 h-5 text-[#2B4468] dark:text-blue-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Update Project Status</h2>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {status !== "CANCELED" && (
                  <button
                    onClick={() => handleUpdateStatus("CANCELED")}
                    className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-500/25"
                  >
                    <XCircle className="w-4 h-4" />
                    Mark as Canceled
                  </button>
                )}

                <button
                  onClick={() => handleUpdateStatus("COMPLETED")}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-green-500/25"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark as Completed
                </button>

                {status === "CANCELED" && (
                  <button
                    onClick={() => handleUpdateStatus("PENDING")}
                    className="flex items-center gap-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
                  >
                    <Clock className="w-4 h-4" />
                    Set to Pending
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}