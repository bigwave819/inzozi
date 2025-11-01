"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UsersRound,
  FolderKanban,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { signOut } from "@/lib/auth-client";

function SideBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { id: 1, name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { id: 2, name: "employees", path: "/admin/employees", icon: UsersRound },
    { id: 3, name: "projects", path: "/admin/projects", icon: FolderKanban },
    { id: 4, name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      window.location.href='/login';
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#2B4468] dark:bg-blue-600 text-white rounded-md shadow-lg hover:scale-105 transition-transform"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:sticky top-0 left-0 z-40
          w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-6
          transform transition-all duration-300 ease-in-out
          flex flex-col h-screen
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          shadow-xl lg:shadow-none
        `}
      >
        {/* Logo / Title */}
        <div className="mb-8 pt-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-[#2B4468] dark:bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">I</span>
            </div>
            <h1 className="font-extrabold text-xl text-[#2B4468] dark:text-blue-400 text-center">
              Inzozi Console
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {links.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              
              return (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    onClick={closeSidebar}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group
                      ${isActive 
                        ? "text-white bg-[#2B4468] dark:bg-blue-600 font-semibold shadow-lg" 
                        : "text-gray-700 dark:text-gray-300 hover:text-[#2B4468] dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }
                    `}
                  >
                    <Icon size={20} className={isActive ? "text-white" : "group-hover:scale-110 transition-transform"} />
                    <span className="capitalize">{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleSignOut}
            disabled={loading}
            className={`
              flex items-center justify-center w-full gap-3 py-3 px-4 
              font-semibold transition-all duration-200 rounded-xl
              ${loading
                ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-gray-600 dark:text-gray-400"
                : "bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105"
              }
            `}
          >
            <LogOut size={18} />
            {loading ? "Signing out..." : "Logout"}
          </button>
        </div>

        {/* Version Info */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            v1.0.0
          </p>
        </div>
      </div>
    </>
  );
}

export default SideBar;