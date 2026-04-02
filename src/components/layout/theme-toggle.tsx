'use client'
import { useTheme } from 'next-themes'
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleThemeToggle = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    }

    if (!mounted) {
        return <div className="h-9 w-9" />; // Placeholder to avoid hydration mismatch
    }

    return (
        <button
            className="cursor-pointer rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-[#1e3a5f] dark:text-gray-300"
            onClick={handleThemeToggle}
            aria-label="Toggle theme"
        >
            {resolvedTheme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
                <Moon className="h-5 w-5 text-[#1e3a5f]" />
            )}
        </button>
    );
}

export default ThemeToggle;
