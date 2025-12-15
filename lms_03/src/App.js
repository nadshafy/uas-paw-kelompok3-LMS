import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import AuthPage from "./pages/AuthPage";
import DashboardMember from "./pages/DashboardMember";
import DashboardLibrarian from "./pages/DashboardLibrarian";
import BookManagement from "./pages/BookManagement"; 
import PeminjamanBuku from "./pages/PeminjamanBuku"; 
import DetailPeminjaman from "./pages/DetailPeminjaman"; 
import DashboardLayout from "./components/layout/DashboardLayout";
import SidebarLibrarian from "./components/layout/SideBarLibrarian";
import SidebarMember from "./components/layout/SideBarMember";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard-member"
          element={
            <DashboardLayout sidebar={<SidebarMember />}>
              <DashboardMember />
            </DashboardLayout>
          }
        />

        <Route
          path="/dashboard-librarian"
          element={
            <DashboardLayout sidebar={<SidebarLibrarian />}>
              <DashboardLibrarian />
            </DashboardLayout>
          }
        />

        <Route
          path="/book-management"
          element={
            <DashboardLayout sidebar={<SidebarLibrarian />}>
              <BookManagement />
            </DashboardLayout>
          }
        />

        <Route
          path="/peminjaman-buku"
          element={
            <DashboardLayout sidebar={<SidebarLibrarian />}>
              <PeminjamanBuku />
            </DashboardLayout>
          }
        />

        <Route
          path="/peminjaman/detail"
          element={
            <DashboardLayout sidebar={<SidebarLibrarian />}>
              <DetailPeminjaman />
            </DashboardLayout>
          }
        />

        <Route path="/" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;