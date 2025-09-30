"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// ✅ Sample JSON projects data
const sampleProjects = [
  {
    id: 1,
    name: "SmartPark CRPMS",
    description: "A Car Repair Process Management System built with MERN stack.",
    status: "Ongoing",
    startDate: "2025-03-01",
    endDate: null,
    team: ["Tresor Christian", "Aline Uwase", "Eric Niyonkuru"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/47/React.svg",
  },
  {
    id: 2,
    name: "Inzozi E-Commerce",
    description: "A mobile marketplace for artisans and small businesses.",
    status: "Completed",
    startDate: "2024-08-15",
    endDate: "2025-02-01",
    team: ["Kevin Mugisha", "Grace Uwera"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg",
  },
  {
    id: 3,
    name: "School Fee & Communication App",
    description: "A platform for schools to manage fees and communicate with parents.",
    status: "Planning",
    startDate: "2025-09-01",
    endDate: null,
    team: ["Sarah Irakoze"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState(sampleProjects);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button>Add Project</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="shadow-md hover:shadow-lg transition rounded-2xl"
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src={project.logo}
                  alt={project.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <h2 className="text-lg font-semibold">{project.name}</h2>
              </div>

              <p className="text-sm text-gray-600 mb-2">{project.description}</p>

              <div className="flex flex-col text-sm mb-3">
                <span>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      project.status === "Ongoing"
                        ? "bg-blue-500"
                        : project.status === "Completed"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {project.status}
                  </span>
                </span>
                <span>
                  <strong>Start:</strong> {project.startDate}
                </span>
                <span>
                  <strong>End:</strong> {project.endDate || "Not finished"}
                </span>
              </div>

              <div className="mb-3">
                <strong>Team:</strong>
                <ul className="list-disc ml-5 text-sm text-gray-700">
                  {project.team.map((member, i) => (
                    <li key={i}>{member}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
