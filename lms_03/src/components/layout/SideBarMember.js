// src/components/layouts/SidebarMember.js
import React from "react";
import { User, Search, List, LogOut, BookOpen } from "lucide-react";

const NavItem = ({ icon, label, href }) => {
  return React.createElement(
    "a",
    { 
      href: href,
      // Menggunakan warna yang berbeda (misal: teal) untuk membedakan dari Librarian (indigo)
      className: "flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-teal-700 transition-colors" 
    },
    React.createElement(icon, { size: 20 }),
    React.createElement("span", { className: "font-medium" }, label)
  );
};

const SidebarMember = () => {
  return React.createElement(
    "div",
    { className: "w-64 bg-teal-800 h-screen sticky top-0 flex flex-col p-4 shadow-xl" },
    
    // Header Sidebar
    React.createElement(
      "div",
      { className: "text-white text-2xl font-bold mb-8 flex items-center space-x-2" },
      React.createElement(BookOpen, { size: 28 }),
      React.createElement("span", null, "Member Portal")
    ),
    
    // Navigasi
    React.createElement(
      "nav",
      { className: "space-y-2 flex-grow" },
      React.createElement(NavItem, { 
        icon: User, 
        label: "Halaman Utama", 
        href: "/dashboard-member" 
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