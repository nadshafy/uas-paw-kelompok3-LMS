import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Wajib ada

// Import Halaman
import AuthPage from "./pages/AuthPage";
import DashboardMember from "./pages/DashboardMember";
import DashboardLibrarian from "./pages/DashboardLibrarian";
import BookManagement from "./pages/BookManagement"; // Jangan lupa ini

// Import Layout & Sidebar
import DashboardLayout from "./components/layout/DashboardLayout";
import SidebarLibrarian from "./components/layout/SideBarLibrarian";
import SidebarMember from "./components/layout/SideBarMember";

function App() {
  return (
    // 1. Router membungkus seluruh aplikasi
    <Router>
      <Routes>
        {/* LOGIC 1: Jika user ke /dashboard-member */}
        <Route
          path="/dashboard-member"
          element={
            <DashboardLayout sidebar={<SidebarMember />}>
              <DashboardMember />
            </DashboardLayout>
          }
        />

        {/* LOGIC 2: Jika user ke /dashboard-librarian */}
        <Route
          path="/dashboard-librarian"
          element={
            <DashboardLayout sidebar={<SidebarLibrarian />}>
              <DashboardLibrarian />
            </DashboardLayout>
          }
        />

        {/* LOGIC 3: Halaman Manajemen Buku (DIPERBAIKI: Sekarang pakai Sidebar) */}
        <Route
          path="/book-management"
          element={
            <DashboardLayout sidebar={<SidebarLibrarian />}>
              <BookManagement />
            </DashboardLayout>
          }
        />

        {/* LOGIC 4: Default / Halaman Login (pengganti 'else') */}
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
