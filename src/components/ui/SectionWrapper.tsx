import React from "react";

interface SectionWrapperProps {
    id?: string;
    children: React.ReactNode;
    className?: string;
    background?: "white" | "light-gray" | "dark-blue";
}

export function SectionWrapper({
    id,
    children,
    className = "",
    background = "white"
}: SectionWrapperProps) {

    const bgClasses = {
        "white": "bg-white dark:bg-gray-950",
        "light-gray": "bg-gray-50 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800",
        "dark-blue": "bg-[#1e3a5f] dark:bg-gray-950 text-white",
    };

    return (
        <section id={id} className={`py-20 md:py-32 w-full transition-colors duration-200 ${bgClasses[background]} ${className}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {children}
            </div>
        </section>
    );
}
