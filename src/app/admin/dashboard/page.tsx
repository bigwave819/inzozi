"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  getEmployeesByRole,
  getProjectsByStatus,
  getTotalEmployees,
} from "@/actions/adminActions";
import { UsersRound, FolderKanban } from "lucide-react";

// ✅ Types
interface EmployeeRoleData {
  role: string;
  count: number;
}
interface ProjectStatusData {
  status: string;
  count: number;
  [key: string]: string | number;
}

export default function Dashboard() {
  const [employeesByRole, setEmployeesByRole] = useState<EmployeeRoleData[]>([]);
  const [projectsByStatus, setProjectsByStatus] = useState<ProjectStatusData[]>([]);
  const [totalEmployees, setTotalEmployees] = useState<number>(0);

  useEffect(() => {
    async function fetchData() {
      const [empData, projData, totalEmp] = await Promise.all([
        getEmployeesByRole(),
        getProjectsByStatus(),
        getTotalEmployees(),
      ]);
      setEmployeesByRole(empData);
      setProjectsByStatus(projData);
      setTotalEmployees(totalEmp ?? 0);
    }

    fetchData();
  }, []);

  const details = [
    {
      id: 1,
      label: "Total Employees",
      icon: UsersRound,
      description: "All registered employees",
      total: totalEmployees,
    },
    {
      id: 2,
      label: "Total Completed Projects",
      icon: FolderKanban,
      description: "All completed projects",
      total: projectsByStatus.find((p) => p.status === "COMPLETED")?.count || 0,
    },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="w-full min-h-screen p-6 md:p-10 flex flex-col gap-10 bg-gray-50">
      {/* ✅ Summary Cards */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {details.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl p-5 h-44 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <Icon size={36} className="text-[#2B4468]" />
                <h1 className="font-semibold text-[#2B4468] text-lg">
                  {item.label}
                </h1>
              </div>
              <p className="text-gray-500 mb-2">{item.description}</p>
              <h1 className="text-3xl font-bold text-[#2B4468]">{item.total}</h1>
            </div>
          );
        })}
      </div>

      {/* ✅ Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Employees per Role (Bar) */}
        <div className="p-4 bg-white rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Employees per Role
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={employeesByRole}>
                <XAxis dataKey="role" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Projects by Status (Pie) */}
        <div className="p-4 bg-white rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Projects by Status
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectsByStatus}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  label
                >
                  {projectsByStatus.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
