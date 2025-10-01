import AddEmployees from "@/components/employees/AddEmployees";

function Employees() {
  
      

  return (
    <div className="w-full min-h-screen p-8 bg-gray-50">
      <div className="flex justify-between">
        <div><h1 className="font-bold text-2xl">Employees</h1></div>
        <div className="p-5"><AddEmployees /></div>
      </div>
    </div>
  );
}

export default Employees;
