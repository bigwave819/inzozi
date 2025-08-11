import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
            {/* 404 Image */}
            <Image
                src="/images/notFoundImage/404.png" // Change this to your image file name
                alt="Not Found"
                width={350}
                height={350}
                className="mb-6"
            />

            {/* 404 Text */}
            <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
            <p className="text-lg text-gray-600 mb-6">
                Oops! The page you’re looking for doesn’t exist.
            </p>

            {/* Button from Shadcn */}
            <Button className="px-20 cursor-pointer py-3 text-lg bg-blue-900 hover:bg-blue-950">
                <Link href={`/`}>Go Home</Link>
            </Button>
        </div>
    )
}

export default NotFound
