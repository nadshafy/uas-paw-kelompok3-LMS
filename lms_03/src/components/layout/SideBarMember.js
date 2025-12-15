import React from "react";
import { User, Search, List, LogOut, BookOpen } from "lucide-react";

const NavItem = ({ icon, label, href, isActive }) => {
  return React.createElement(
    "a",
    { 
      href: href,
      className: `flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group ${isActive ? "bg-gray-800 text-teal-400" : "text-gray-400 hover:bg-gray-800 hover:text-teal-400"}`
    },

    React.createElement(icon, { size: 20, className: "transition-colors" }),
    React.createElement("span", { className: "font-medium" }, label)
  );
};

const SidebarMember = () => {
  const currentPath = "/dashboard-member";

  return React.createElement(
    "div",
    { 
      className: "w-64 h-screen sticky top-0 flex flex-col p-6 shadow-xl bg-gray-900 border-r border-gray-800" 
    },
    
    // Header Sidebar
    React.createElement(
      "div",
      { className: "flex items-center space-x-3 mb-10 px-2" },
      // Logo menggunakan warna Hijau Lemon
      React.createElement(BookOpen, { size: 32, className: "text-teal-400" }),
      React.createElement("span", { className: "text-2xl font-bold text-white tracking-wide" }, "FRAND")
    ),
    
    // Navigasi
    React.createElement(
      "nav",
      { className: "space-y-3 flex-grow" },
      React.createElement(NavItem, { 
        icon: User, 
        label: "Halaman Utama", 
        href: "/dashboard-member",
        isActive: currentPath === "/dashboard-member" 
      }),
      React.createElement(NavItem, { 
        icon: List, 
        label: "Riwayat Peminjaman", 
        href: "/member/myborrows" 
      }),
      React.createElement(NavItem, { 
        icon: LogOut, 
        label: "Profil & Pengaturan", 
        href: "/member/profile" 
      })
    )
  );
};

export default SidebarMember;