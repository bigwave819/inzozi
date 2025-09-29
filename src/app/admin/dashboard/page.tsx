import { auth } from "@/lib/auth";
import { headers } from "next/headers";



async function dashboard() {

    const session = await auth.api.getSession({
        headers: await headers() 
    })
    return (
        <div className="w-full min-h-screen">
            <h1>{session?.user.name}</h1>
        </div>
    );
}

export default dashboard;