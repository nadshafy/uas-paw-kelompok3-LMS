import React from "react";
import { Book, TrendingUp, Plus, List, RotateCcw } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

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
    "div",
    {
      onClick: () => onNavigate(path),
      className: `${baseClass} ${activeClass}`,
    },
    React.createElement(icon, { size: 20 }),
    isSidebarOpen &&
      React.createElement("span", { className: "font-medium" }, label)
  );
};

const SidebarLibrarian = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarClass = isSidebarOpen ? "w-64" : "w-20";

  const handleNavigate = (path) => {
    navigate(path);
  };

  return React.createElement(
    "div",
    {
      className: `${sidebarClass} h-screen sticky top-0 flex flex-col py-4 px-2 shadow-xl transition-all duration-300
      bg-gradient-to-br from-indigo-900/60 to-blue-900/60 backdrop-blur-md border-r border-white/20`,
    },

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

      // 1. Dashboard
      React.createElement(NavItem, {
        icon: TrendingUp,
        label: "Dashboard",
        path: "/dashboard-librarian",
        isSidebarOpen,
        isActive: location.pathname === "/dashboard-librarian",
        onNavigate: handleNavigate,
      }),

      // 2. Manajemen Buku
      React.createElement(NavItem, {
        icon: Book,
        label: "Manajemen Buku",
        path: "/book-management",
        isSidebarOpen,
        isActive: location.pathname === "/book-management",
        onNavigate: handleNavigate,
      }),

      // 3. Peminjaman
      React.createElement(NavItem, {
        icon: Plus,
        label: "Peminjaman",
        path: "/peminjaman-buku",
        isSidebarOpen,
        isActive: location.pathname.includes("peminjaman"),
        onNavigate: handleNavigate,
      }),
      // 4. Riwayat Denda
      React.createElement(NavItem, {
        icon: List,
        label: "Riwayat Denda",
        path: "/transaksi-denda",
        isSidebarOpen,
        isActive: location.pathname === "/transaksi-denda",
        onNavigate: handleNavigate,
      })
    ),

    // Logout Button at bottom
    React.createElement(
      "div",
      { className: "mt-auto pt-4 border-t border-white/20 pl-1 pr-1" },
      React.createElement(
        "button",
        {
          onClick: () => {
            // CRITICAL: Clear all session data
            localStorage.clear();
            sessionStorage.clear();
            navigate("/");
          },
          className: `flex items-center space-x-3 p-3 rounded-lg text-white transition-colors cursor-pointer hover:bg-red-900/50 ${
            isSidebarOpen ? '' : 'justify-center'
          }`
        },
        React.createElement(RotateCcw, { size: 20 }),
        isSidebarOpen && React.createElement("span", { className: "font-medium" }, "Logout")
      )
    )
  );
};

export default SidebarLibrarian;
