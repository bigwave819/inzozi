"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  UsersRound ,
  FolderKanban ,
  Settings,
  LogOut,
} from "lucide-react";
import { signOut } from "@/lib/auth-client";

function SideBar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const links = [
    { id: 1, name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { id: 2, name: "employees", path: "/admin/employees", icon: UsersRound  },
    { id: 3, name: "projects", path: "/admin/projects", icon: FolderKanban  },
    { id: 4, name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      router.refresh(); // revalidate server components / paths
      router.push("/login"); // redirect to login
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between h-screen w-60 bg-[#f9fafb] border-r border-gray-200 p-6">
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
            return (
              <li key={item.id}>
                <Link
                  href={item.path}
                  className="flex items-center space-x-3 text-gray-700 hover:text-[#2B4468] hover:bg-gray-100 px-3 py-2 rounded-md transition"
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
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
          className={`flex items-center justify-center w-full gap-2 py-2 px-4 text-white font-semibold transition rounded-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#2B4468] hover:bg-[#1f3350] cursor-pointer"
          }`}
        >
          <LogOut size={18} />
          {loading ? "Signing out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}

export default SideBar;
