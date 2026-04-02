import React from "react";

interface CardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  subtitle?: string;
}

export function Card({ title, description, icon, subtitle }: CardProps) {
  return (
    <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 hover:shadow-xl hover:border-blue-400/50 dark:hover:border-blue-500/50 transition-all duration-300">
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-[#1e3a5f] dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">{title}</h3>
      {subtitle && <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3 uppercase tracking-wider">{subtitle}</p>}
      {description && <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>}
    </div>
  );
}
