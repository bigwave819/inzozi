import { getProjects } from "@/actions/adminActions";
import Image from "next/image";
import { format, differenceInDays } from "date-fns";

async function ViewProjects() {
  const result = await getProjects();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {result.map((item) => {
        const startDateFormatted = format(new Date(item.startDate), "dd MMM yyyy");
        const remainingDays =
          item.endDate && differenceInDays(new Date(item.endDate), new Date(item.startDate));

        return (
          <div key={item.id} className="border rounded p-4 shadow">
            <div className="h-48 bg-slate-100 relative mb-4">
              {item.logo ? (
                <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  unoptimized
                  className="object-cover rounded"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  No Image
                </div>
              )}
            </div>

            <h1 className="text-xl font-bold mb-2">{item.name}</h1>
            <p className="mb-4">{item.details}</p>

            <div className="mb-4">
              <h2 className="underline font-bold text-lg">Assigned to</h2>
              <ul className="list-disc list-inside">
                {item.employees && item.employees.length > 0 ? (
                  item.employees.map((emp: any) => <li key={emp.id}>{emp.name}</li>)
                ) : (
                  <li>No employees assigned</li>
                )}
              </ul>
            </div>

            <div>
              <p>
                <strong>Starts At:</strong> {startDateFormatted}
              </p>
              <p>
                <strong>Remaining Days:</strong>{" "}
                {remainingDays != null ? `${remainingDays} day(s)` : "No end date"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ViewProjects;
