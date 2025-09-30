import Image from "next/image";

function Employees() {
  const workers = [
    {
      id: 1,
      name: "Alice Uwase",
      role: "Frontend Developer",
      email: "alice.uwase@inzozilabs.com",
      phone: "+250 784 123 456",
      image: "https://img.icons8.com/color/96/000000/user-female-circle.png",
    },
    {
      id: 2,
      name: "Eric Nshimiyimana",
      role: "Backend Developer",
      email: "eric.nshimiyimana@inzozilabs.com",
      phone: "+250 782 987 654",
      image: "https://img.icons8.com/color/96/000000/user-male-circle.png",
    },
    {
      id: 3,
      name: "Grace Mukamana",
      role: "UI/UX Designer",
      email: "grace.mukamana@inzozilabs.com",
      phone: "+250 789 555 222",
      image: "https://img.icons8.com/color/96/000000/businesswoman.png",
    },
    {
      id: 4,
      name: "Jean Bosco Habimana",
      role: "Project Manager",
      email: "jean.habimana@inzozilabs.com",
      phone: "+250 780 444 111",
      image: "https://img.icons8.com/color/96/000000/administrator-male.png",
    },
    {
      id: 5,
      name: "Claudine Ingabire",
      role: "QA Engineer",
      email: "claudine.ingabire@inzozilabs.com",
      phone: "+250 783 999 888",
      image: "https://img.icons8.com/color/96/000000/user-female.png",
    },
  ];

  return (
    <div className="w-full min-h-screen p-8 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workers.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={96}
              height={96}
              className="rounded-full object-cover mb-4"
            />
            <h1 className="text-[#2B4468] font-bold text-lg">{item.name}</h1>
            <p className="text-gray-600 text-sm">{item.email}</p>
            <p className="text-gray-600 text-sm">{item.phone}</p>
            <p className="text-[#2B4468] font-semibold mt-2">{item.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Employees;
