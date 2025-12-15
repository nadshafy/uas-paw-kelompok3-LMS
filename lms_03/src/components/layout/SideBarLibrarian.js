import React from "react";
import { Book, TrendingUp, Plus, List, RotateCcw, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom"; // 1. Import Wajib

const NavItem = ({
  icon,
  label,
  path,
  isSidebarOpen,
  isActive,
  onNavigate,
}) => {
  const baseClass =
    "flex items-center space-x-3 p-3 rounded-lg text-white transition-colors cursor-pointer";

  const activeClass = isActive
    ? "bg-indigo-600 font-semibold shadow-inner"
    : "hover:bg-indigo-700/70";

  return React.createElement(
    "div", // 2. Gunakan DIV, bukan A (supaya tidak reload)
    {
      onClick: () => onNavigate(path), // 3. Panggil fungsi navigate
      className: `${baseClass} ${activeClass}`,
    },
    React.createElement(icon, { size: 20 }),
    isSidebarOpen &&
      React.createElement("span", { className: "font-medium" }, label)
  );
};

const SidebarLibrarian = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate(); // Hook navigasi
  const location = useLocation(); // Hook lokasi saat ini
  const sidebarClass = isSidebarOpen ? "w-64" : "w-20";

  // Fungsi untuk pindah halaman
  const handleNavigate = (path) => {
    navigate(path);
  };

  return React.createElement(
    "div",
    {
      className: `${sidebarClass} h-screen sticky top-0 flex flex-col py-4 px-2 shadow-xl transition-all duration-300
      bg-gradient-to-br from-indigo-900/60 to-blue-900/60 backdrop-blur-md border-r border-white/20`,
    },

    // --- LOGO ---
    React.createElement(
      "div",
      {
        className:
          "text-white text-2xl font-bold mb-6 flex items-center space-x-2 overflow-hidden border-b border-white/20 pb-3 pl-3 pr-2 cursor-pointer",
        onClick: toggleSidebar,
      },
      React.createElement(Book, { size: 28 }),
      isSidebarOpen && React.createElement("span", null, "FRAND")
    ),

    // --- MENU NAVIGASI ---
    React.createElement(
      "nav",
      { className: "space-y-2 flex-grow pl-1 pr-1" },

      // Dashboard
      React.createElement(NavItem, {
        icon: TrendingUp,
        label: "Dashboard",
        path: "/dashboard-librarian",
        isSidebarOpen,
        isActive: location.pathname === "/dashboard-librarian",
        onNavigate: handleNavigate,
      }),

      // Manajemen Buku (DIPERBAIKI PATH-NYA)
      React.createElement(NavItem, {
        icon: Book,
        label: "Manajemen Buku",
        path: "/book-management", // <--- INI YG PENTING (Harus sama dgn App.js)
        isSidebarOpen,
        isActive: location.pathname === "/book-management",
        onNavigate: handleNavigate,
      }),

      // Menu Lainnya
      React.createElement(NavItem, {
        icon: Plus,
        label: "Peminjaman",
        path: "/librarian/borrow",
        isSidebarOpen,
        isActive: location.pathname === "/librarian/borrow",
        onNavigate: handleNavigate,
      }),
      React.createElement(NavItem, {
        icon: RotateCcw,
        label: "Pengembalian",
        path: "/librarian/return",
        isSidebarOpen,
        isActive: location.pathname === "/librarian/return",
        onNavigate: handleNavigate,
      }),
      React.createElement(NavItem, {
        icon: List,
        label: "Transaksi",
        path: "/librarian/transaction",
        isSidebarOpen,
        isActive: location.pathname === "/librarian/transaction",
        onNavigate: handleNavigate,
      })
    )
  );
};

export default SidebarLibrarian;
