import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// --- IMPORT HALAMAN ---
import AuthPage from "./pages/AuthPage";
import DashboardMember from "./pages/DashboardMember";
import DashboardLibrarian from "./pages/DashboardLibrarian";
import BookManagement from "./pages/BookManagement";
import PeminjamanBuku from "./pages/PeminjamanBuku";
import DetailPeminjaman from "./pages/DetailPeminjaman";
import MemberHistory from "./pages/HistoryMember";
import TransaksiDenda from "./pages/TransaksiDenda"; // <-- 1. IMPORT FILE BARU DISINI

// --- IMPORT LAYOUT & SIDEBAR ---
import DashboardLayout from "./components/layout/DashboardLayout";
import SidebarLibrarian from "./components/layout/SideBarLibrarian";
import SidebarMember from "./components/layout/SideBarMember";

function App() {
  return (
    <Router>
      <Routes>
        {/* --- ROUTE UNTUK MEMBER --- */}

        {/* 1. Dashboard Member */}
        <Route
          path="/dashboard-member"
          element={
            <DashboardLayout sidebar={<SidebarMember />}>
              <DashboardMember />
            </DashboardLayout>
          }
        />

        {/* 2. Riwayat Peminjaman Member */}
        <Route
          path="/member/myborrows"
          element={
            <DashboardLayout sidebar={<SidebarMember />}>
              <MemberHistory />
            </DashboardLayout>
          }
        />

        {/* --- ROUTE UNTUK LIBRARIAN --- */}

        {/* 1. Dashboard Librarian */}
        <Route
          path="/dashboard-librarian"
          element={
            <DashboardLayout sidebar={<SidebarLibrarian />}>
              <DashboardLibrarian />
            </DashboardLayout>
          }
        />

        {/* 2. Manajemen Buku */}
        <Route
          path="/book-management"
          element={
            <DashboardLayout sidebar={<SidebarLibrarian />}>
              <BookManagement />
            </DashboardLayout>
          }
        />

        {/* 3. Peminjaman Buku (Input Form) */}
        <Route
          path="/peminjaman-buku"
          element={
            <DashboardLayout sidebar={<SidebarLibrarian />}>
              <PeminjamanBuku />
            </DashboardLayout>
          }
        />

        {/* 4. Detail Peminjaman */}
        <Route
          path="/peminjaman/detail"
          element={
            <DashboardLayout sidebar={<SidebarLibrarian />}>
              <DetailPeminjaman />
            </DashboardLayout>
          }
        />

        {/* 5. Transaksi Denda (BARU DITAMBAHKAN) */}
        <Route
          path="/transaksi-denda"
          element={
            <DashboardLayout sidebar={<SidebarLibrarian />}>
              <TransaksiDenda />
            </DashboardLayout>
          }
        />

        {/* --- DEFAULT / LOGIN --- */}
        <Route path="/" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
