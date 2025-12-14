import React from "react";
import { Book, TrendingUp, Plus, List, RotateCcw } from "lucide-react"; 

const NavItem = ({ icon, label, href, isSidebarOpen, isActive }) => {
  const baseClass = "flex items-center space-x-3 p-3 rounded-lg text-white transition-colors";
  
  const activeClass = isActive 
    ? "bg-indigo-600 font-semibold shadow-inner" 
    : "hover:bg-indigo-700/70"; 

  return React.createElement(
    "a",
    { 
      href: href, 
      className: `${baseClass} ${activeClass}`
    },
    React.createElement(icon, { size: 20 }),
    isSidebarOpen && React.createElement("span", { className: "font-medium" }, label)
  );
};

const SidebarLibrarian = ({ isSidebarOpen, toggleSidebar }) => {
  const sidebarClass = isSidebarOpen ? "w-64" : "w-20"; 
  
  return React.createElement(
    "div",
    { 
      className: `${sidebarClass} h-screen sticky top-0 flex flex-col py-4 px-2 shadow-xl transition-all duration-300
      bg-gradient-to-br from-indigo-900/60 to-blue-900/60 backdrop-blur-md border-r border-white/20` 
    },
    
    React.createElement(
      "div",
      { 
        className: "text-white text-2xl font-bold mb-6 flex items-center space-x-2 overflow-hidden border-b border-white/20 pb-3 pl-3 pr-2 cursor-pointer",
        onClick: toggleSidebar 
      },
      React.createElement(Book, { size: 28 }), 
      
      isSidebarOpen && React.createElement("span", null, "FRAND") 
    ),
    
    // Area Navigasi
    React.createElement(
      "nav",
      { className: "space-y-2 flex-grow pl-1 pr-1" }, 
      
      React.createElement(NavItem, { icon: TrendingUp, label: "Dashboard", href: "/dashboard-librarian", isSidebarOpen, isActive: true }),
      React.createElement(NavItem, { icon: Book, label: "Manajemen Buku", href: "/librarian/books", isSidebarOpen, isActive: false }),
      React.createElement(NavItem, { icon: Plus, label: "Peminjaman", href: "/librarian/borrow", isSidebarOpen, isActive: false }),
      React.createElement(NavItem, { icon: RotateCcw, label: "Pengembalian", href: "/librarian/return", isSidebarOpen, isActive: false }),
      React.createElement(NavItem, { icon: List, label: "Transaksi", href: "/librarian/transaction", isSidebarOpen, isActive: false })
    )
  );
};

export default SidebarLibrarian;