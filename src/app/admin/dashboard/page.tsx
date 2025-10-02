import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  UsersRound ,
  FolderKanban, 
} from "lucide-react";
import { getTotalEmployees } from "@/actions/adminActions"



async function dashboard() {

    const totalEmployees = await getTotalEmployees()

    const details = [
        {
            id: 1,
            label: "Total Employees",
            icon: UsersRound,
            description: 'All registered Employees here',
            total: totalEmployees
        },
        {
            id: 2,
            label: "Total completed projects",
            icon: FolderKanban,
            description: "All completed project here",
            total: 3
        },
    ]
    return (
        <div className="w-full min-h-screen p-10 flex justify-center">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-8 w-full">
                {
                    details.map((item) => {
                        const Icon = item.icon
                        return(
                            <div key={item.id} className="border-1 border-gray-200 p-5 h-44">
                                <div className="">
                                    <Icon size={40} className="font-bold text-[#2B4468]"/>
                                    <h1 className="font-bold text-[#2B4468]">{item.label}</h1>
                                </div>
                                <p className="text-muted-foreground">{item.description}</p>
                                <h1 className="text-3xl font-bold text-[#2B4468]">{item.total}</h1>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default dashboard;