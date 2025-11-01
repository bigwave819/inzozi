import AddEmployees from "@/components/employees/AddEmployees";
import ViewEmployees from "@/components/employees/ViewEmployees";

function Employees() {
  return (
    <div className="w-full min-h-screen p-8 bg-white dark:bg-gray-950">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bold text-2xl text-gray-900 dark:text-gray-100">Employees</h1>
        <AddEmployees />
      </div>
      <div>
        <ViewEmployees />
      </div>
    </div>
  );
}

export default Employees;