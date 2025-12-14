import React from "react";
import AuthPage from "./pages/AuthPage";
import DashboardMember from "./pages/DashboardMember"; 
import DashboardLibrarian from "./pages/DashboardLibrarian";
import DashboardLayout from "./components/layout/DashboardLayout";
import SidebarLibrarian from "./components/layout/SideBarLibrarian";
import SidebarMember from "./components/layout/SideBarMember"; 


function App() {
  // Simple routing based on URL path
  const path = window.location.pathname;

  if (path === "/dashboard-member") {
    return (
      <DashboardLayout sidebar={<SidebarMember />}>
        <DashboardMember />
      </DashboardLayout>
    );
  } else if (path === "/dashboard-librarian") {
    return (
      <DashboardLayout sidebar={<SidebarLibrarian />}>
        <DashboardLibrarian />
      </DashboardLayout>
    );
  } else {
    return <AuthPage />;
  }
}

export default App;