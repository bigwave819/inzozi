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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#2B4468] text-white rounded-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-60 bg-[#f9fafb] border-r border-gray-200 p-6
          transform transition-transform duration-300 ease-in-out
          flex flex-col h-screen
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo / Title */}
        <div className="mb-8">
          <h1 className="font-extrabold text-xl text-[#2B4468] text-center">
            Inzozi Console
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-4">
            {links.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              
              return (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    onClick={closeSidebar}
                    className={`
                      flex items-center space-x-3 px-3 py-2 rounded-md transition
                      ${isActive 
                        ? "text-[#2B4468] bg-gray-100 font-semibold" 
                        : "text-gray-700 hover:text-[#2B4468] hover:bg-gray-100"
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="capitalize">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div>
          <button
            onClick={handleSignOut}
            disabled={loading}
            className={`
              flex items-center justify-center w-full gap-2 py-2 px-4 
              text-white font-semibold transition rounded-md
              ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#2B4468] hover:bg-[#1f3350] cursor-pointer"
              }
            `}
          >
            <LogOut size={18} />
            {loading ? "Signing out..." : "Logout"}
          </button>
        </div>
      </div>
    </>
  );
}

export default SideBar;