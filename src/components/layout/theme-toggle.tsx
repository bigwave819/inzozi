'use client'
import { useThemeStore } from "@/store/theme-store";
import { useEffect } from "react";
import { useTheme } from 'next-themes'
import { Moon, Sun } from "lucide-react";

function ThemeToggle() {
    const { isDarkMode, setDarkMode } = useThemeStore();
    const { setTheme, resolvedTheme } = useTheme();

    // Sync Zustand store with next-themes
    useEffect(() => {
        if (resolvedTheme === 'dark' && !isDarkMode) {
            setDarkMode(true);
        } else if (resolvedTheme === 'light' && isDarkMode) {
            setDarkMode(false);
        }
    }, [resolvedTheme, isDarkMode, setDarkMode]);

    const handleThemeToggle = () => {
        const newDarkMode = !isDarkMode;
        setDarkMode(newDarkMode);
        setTheme(newDarkMode ? 'dark' : 'light');
    }

    return (
        <button 
            className="cursor-pointer rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            onClick={handleThemeToggle}
            aria-label="Toggle theme"
        >
            {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            )}
        </button>
    );
}

export default ThemeToggle;
