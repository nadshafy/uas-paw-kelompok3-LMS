import React from "react";
import AuthPage from "./pages/AuthPage";
import DashboardMember from "./pages/DashboardMember";
import DashboardLibrarian from "./pages/DashboardLibrarian";

function App() {
  // Simple routing based on URL path
  const path = window.location.pathname;

  // Route to appropriate page
  if (path === "/dashboard-member") {
    return <DashboardMember />;
  } else if (path === "/dashboard-librarian") {
    return <DashboardLibrarian />;
  } else {
    return <AuthPage />;
  }
}

export default App;
