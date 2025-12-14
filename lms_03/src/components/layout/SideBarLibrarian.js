import React from "react";
import { Book, Users, TrendingUp, AlertCircle, Plus, List, RotateCcw } from "lucide-react";

const NavItem = ({ icon, label, href }) => {
  return React.createElement(
    "a",
    { 
      href: href, 
      className: "flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-indigo-700 transition-colors" 
    },
    React.createElement(icon, { size: 20 }),
    React.createElement("span", { className: "font-medium" }, label)
  );
};

const SidebarLibrarian = () => {
  return React.createElement(
    "div",
    { className: "w-64 bg-indigo-800 h-screen sticky top-0 flex flex-col p-4 shadow-xl" },
    React.createElement(
      "div",
      { className: "text-white text-2xl font-bold mb-8 flex items-center space-x-2" },
      React.createElement(Book, { size: 40 }),
      React.createElement("span", null, "Perpustakaan FRAND")
    ),
    
    // Navigasi
    React.createElement(
      "nav",
      { className: "space-y-2 flex-grow" },
      React.createElement(NavItem, { 
        icon: TrendingUp, 
        label: "Dashboard", 
        href: "/librarian/dashboard" 
      }),
      React.createElement(NavItem, { 
        icon: Book, 
        label: "Manajemen Buku", 
        href: "/librarian/books" 
      }),
      React.createElement(NavItem, { 
        icon: Plus, 
        label: "Peminjaman", 
        href: "/librarian/borrow" 
      }),
      React.createElement(NavItem, { 
        icon: RotateCcw, 
        label: "Pengembalian", 
        href: "/librarian/return" 
      }),
      React.createElement(NavItem, { 
        icon: List, 
        label: "Transaksi", 
        href: "/librarian/transaction" 
      })
    )
  );
};

export default SidebarLibrarian;