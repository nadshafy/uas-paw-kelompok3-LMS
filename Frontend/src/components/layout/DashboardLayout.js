import React, { useState, useEffect } from "react";
import { BookOpen, LogOut, User } from "lucide-react";

const Header = ({ userData, handleLogout, isProfileMenuOpen, toggleProfileMenu }) => {
  const currentPath = window.location.pathname.toLowerCase();
  
  let isMember = false;

  if (currentPath.includes("librarian") || currentPath.includes("admin")) {
    isMember = false;
  } else if (currentPath.includes("member")) {
    isMember = true;
  } else {
    isMember = (userData?.role || "").toLowerCase() === "member";
  }

  return (
    <header
      className={`sticky top-0 z-20 font-['Poppins'] border-b shadow-md transition-all duration-300 ${
        isMember
          ? "bg-gray-900 border-gray-800 text-white"
          : "bg-gradient-to-r from-indigo-900/90 to-blue-900/90 border-white/10 text-white backdrop-blur-md" 
      }`}
    >
      <div className="max-w-full mx-auto px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${isMember ? "bg-white/10" : "bg-teal-50"}`}>
               <BookOpen size={24} className={isMember ? "text-teal-400" : "text-teal-600"} />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-tight">
                PERPUSTAKAAN FRAND
              </h1>
              <p className={`text-xs font-medium ${isMember ? "text-blue-200" : "text-gray-500"}`}>
                {isMember ? "Member Portal" : "Librarian Dashboard"}
              </p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={toggleProfileMenu}
              className={`flex items-center gap-3 py-1 px-2 rounded-full border transition-all ${
                isMember
                   ? "bg-white/10 border-white/20 hover:bg-white/20 text-white"   // Tombol Member
                   : "bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-700" // Tombol Librarian
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
                isMember 
                  ? "bg-indigo-800 text-white" 
                  : "bg-white text-teal-600 border border-gray-200"
              }`}>
                <User size={18} />
              </div>
              <span className="text-sm font-medium pr-2 hidden md:block">
                {userData?.name}
              </span>
            </button>

            {/* DROPDOWN MENU */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 transform origin-top-right transition-all">
                <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
                  <p className="font-bold text-gray-800 truncate">{userData?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{userData?.email}</p>
                  <span className={`inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    isMember 
                      ? "bg-indigo-100 text-indigo-700" 
                      : "bg-teal-100 text-teal-700"
                  }`}>
                    {isMember ? "Member" : "Librarian"}
                  </span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-5 py-3 text-left text-red-600 hover:bg-red-50 transition-colors text-sm font-medium"
                >
                  <LogOut size={18} />
                  <span>Keluar Aplikasi</span>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

const DashboardLayout = ({ children, sidebar }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const toggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    const userRole = localStorage.getItem("role") || "librarian"; 

    setUserData({
      name: userName || "Guest User",
      email: userEmail || "user@library.com",
      role: userRole,
    });
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600 font-['Poppins']">Loading...</p>
      </div>
    );
  }

  const sidebarWithProps = React.cloneElement(sidebar, { isSidebarOpen, toggleSidebar });
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { userData });
    }
    return child;
  });

  return (
    <div className="flex min-h-screen font-['Poppins'] bg-white">
      {/*SIDEBAR */}
      {sidebarWithProps}

      {/*AREA KONTEN KANAN */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/*HEADER */}
        <Header 
          userData={userData} 
          handleLogout={handleLogout} 
          isProfileMenuOpen={isProfileMenuOpen}
          toggleProfileMenu={toggleProfileMenu}
        />

        {/*MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-0 relative">
           {childrenWithProps}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;