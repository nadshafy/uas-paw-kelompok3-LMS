import React from "react";
import { User, List, LogOut, BookOpen } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const NavItem = ({ icon, label, path, isActive, onClick }) => {
  return React.createElement(
    "div", 
    { 
      onClick: () => onClick(path), // Panggil fungsi navigasi saat diklik
      className: `flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group cursor-pointer ${
        isActive 
          ? "bg-gray-800 text-teal-400 font-semibold shadow-md border-l-4 border-teal-400" 
          : "text-gray-400 hover:bg-gray-800 hover:text-teal-400" 
      }`
    },

    React.createElement(icon, { size: 20, className: "transition-colors" }),
    React.createElement("span", { className: "font-medium" }, label)
  );
};

const SidebarMember = () => {
  const navigate = useNavigate(); // Hook untuk pindah halaman
  const location = useLocation(); // Hook untuk mengambil URL saat ini

  // Fungsi navigasi
  const handleNavigate = (path) => {
    navigate(path);
  };

  return React.createElement(
    "div",
    { 
      className: "w-64 h-screen sticky top-0 flex flex-col p-6 shadow-xl bg-gray-900 border-r border-gray-800" 
    },
    
    // Header Sidebar
    React.createElement(
      "div",
      { className: "flex items-center space-x-3 mb-10 px-2 cursor-pointer", onClick: () => navigate('/dashboard-member') },
      React.createElement(BookOpen, { size: 32, className: "text-teal-400" }),
      React.createElement("span", { className: "text-2xl font-bold text-white tracking-wide" }, "FRAND")
    ),
    
    // Navigasi
    React.createElement(
      "nav",
      { className: "space-y-3 flex-grow" },
      
      //DASHBOARD
      React.createElement(NavItem, { 
        icon: User, 
        label: "Halaman Utama", 
        path: "/dashboard-member",
        // Logic: Aktif jika URL sama persis
        isActive: location.pathname === "/dashboard-member", 
        onClick: handleNavigate
      }),

      //RIWAYAT PEMINJAMAN 
      React.createElement(NavItem, { 
        icon: List, 
        label: "Riwayat Peminjaman", 
        path: "/member/myborrows", 
        isActive: location.pathname === "/member/myborrows", 
        onClick: handleNavigate
      }),
    )
  );
};

export default SidebarMember;