import { getEmployees } from "@/actions/adminActions";
import Image from "next/image";

async function ViewEmployees() {
    const result = await getEmployees()
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:mt-8 gap-6">
            {
                result.map((item) => {
                    return (
                        <div key={item.id} className="bg-blue-50 dark:bg-gray-800 shadow-lg hover:shadow-2xl dark:shadow-gray-700/30 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105">
                            <div className="h-72 bg-slate-100 dark:bg-gray-700 relative">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.name}
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                            </div>
                            <div className="w-full p-5">
                                <h1 className="text-2xl font-bold text-[#2B4468] dark:text-blue-400">{item.name}</h1>
                                <h2 className="font-bold text-xl text-[#2B4468] dark:text-blue-400">{item.role} Developer</h2>
                                <p className="text-muted-foreground dark:text-gray-400">{item.email}</p>
                                <p className="text-muted-foreground dark:text-gray-400">{item.phone}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default ViewEmployees;