import { getProjects } from "@/actions/adminActions";
import Image from "next/image";
import { format, differenceInDays } from "date-fns";
import Link from "next/link";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  imageUrl: string;
}

interface Project {
  id: string;
  name: string;
  logo: string | null;
  startDate: Date;
  endDate: Date | null;
  details: string;
  employees: Employee[];
}

async function ViewProjects() {
  const result = (await getProjects()) as Project[];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {result.map((item) => {
        const startDateFormatted = format(new Date(item.startDate), "dd MMM yyyy");
        const remainingDays =
          item.endDate && differenceInDays(new Date(item.endDate), new Date(item.startDate));

        return (
          <Link key={item.id} href={`/admin/projects/${item.id}`}>
            <div className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer">
              
              {/* Logo Container */}
              <div className="relative w-full h-48 mb-4 rounded overflow-hidden bg-slate-100 flex items-center justify-center">
                {item.logo ? (
                  <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    unoptimized
                    className="object-contain"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>

              {/* Project Info */}
              <h1 className="text-xl font-bold mb-2">{item.name}</h1>
              <p className="text-gray-700 mb-4 line-clamp-3">{item.details}</p>

              {/* Assigned Employees */}
              <div className="mb-4">
                <h2 className="underline font-bold text-lg mb-1">Assigned to</h2>
                <ul className="list-disc list-inside text-gray-600">
                  {item.employees && item.employees.length > 0 ? (
                    item.employees.map((emp: Employee) => <li key={emp.id}>{emp.name}</li>)
                  ) : (
                    <li>No employees assigned</li>
                  )}
                </ul>
              </div>

              {/* Timeline */}
              <div className="text-gray-700">
                <p>
                  <strong>Starts At:</strong> {startDateFormatted}
                </p>
                <p>
                  <strong>Remaining Days:</strong>{" "}
                  {remainingDays != null ? `${remainingDays} day(s)` : "No end date"}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ViewProjects;
