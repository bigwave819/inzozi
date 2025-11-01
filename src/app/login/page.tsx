import LoginCard from "@/components/auth/LoginCard";

function Login() {
    return ( 
        <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 p-5 transition-colors duration-300">
            <LoginCard />
        </div>
     );
}

export default Login;