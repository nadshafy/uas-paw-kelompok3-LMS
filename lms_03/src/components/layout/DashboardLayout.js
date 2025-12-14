import React, { useState, useEffect } from "react";
import { BookOpen, LogOut, Menu, User } from "lucide-react";

const Header = ({ userData, handleLogout, isProfileMenuOpen, toggleProfileMenu }) => {
    return React.createElement(
      "header",
      {
        className: "sticky top-0 z-10 backdrop-blur-md bg-gradient-to-r from-indigo-900/80 to-blue-900/80 border-b border-white/20 shadow-md font-['Poppins']",
      },
      React.createElement(
        "div",
        { className: "max-w-full mx-auto px-8" },
        React.createElement(
          "div",
          { className: "flex justify-between items-center py-4" },

          React.createElement(
            "div",
            { 
              className: "flex items-center space-x-3", 
            },

            // React.createElement(
            //   "div",
            //   {
            //     className: "bg-indigo-700 p-2 rounded-xl shadow-md flex items-center justify-center hidden sm:flex", 
            //   },
            //   React.createElement(BookOpen, { size: 28, className: "text-white" }) 
            // ),

            React.createElement(
              "div",
              null,
              React.createElement(
                "h1",
                { 
                  className: "text-2xl font-bold text-white drop-shadow-sm" 
                },
                "PERPUSTAKAAN FRAND"
              ),
              React.createElement(
                "p",
                { 
                  className: "text-sm text-white/80" 
                },
                "Sistem Perpustakaan"
              )
            )
          ),
  
          React.createElement(
            "div",
            { className: "relative" },
            
            React.createElement(
                "button",
                {
                    onClick: toggleProfileMenu, 
                    className: "w-10 h-10 rounded-full bg-white/30 text-white flex items-center justify-center border-2 border-white/50 hover:bg-white/50 transition-colors shadow-lg",
                    title: `Halo, ${userData?.name}`
                },
                React.createElement(User, { size: 20 })
            ),

            isProfileMenuOpen && React.createElement(
                "div",
                {
                    className: "absolute right-0 mt-3 w-48 bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl border border-white/40 text-gray-800 overflow-hidden z-20",
                },
                React.createElement(
                    "div",
                    { className: "px-4 py-3 border-b border-gray-200" },
                    React.createElement("p", { className: "font-semibold truncate" }, userData?.name),
                    React.createElement("p", { className: "text-xs text-gray-500 truncate" }, userData?.email)
                ),
                React.createElement(
                    "button",
                    {
                        onClick: handleLogout,
                        className: "flex items-center space-x-2 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors",
                    },
                    React.createElement(LogOut, { size: 16 }),
                    React.createElement("span", null, "Logout")
                )
            )
          )
        )
      )
    );
  };

const DashboardLayout = ({ children, sidebar }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); 

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(prev => !prev);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");

    if (!token) {
      window.location.href = "/";
      return;
    }

    setUserData({
      name: userName || "Librarian",
      email: userEmail || "librarian@library.com",
    });
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (isLoading) {
    return React.createElement(
      "div",
      {
        className:
          "min-h-screen flex items-center justify-center bg-white",
      },
      React.createElement(
        "p",
        { className: "text-gray-800 font-['Poppins']" },
        "Loading..."
      )
    );
  }

  const sidebarWithProps = React.cloneElement(sidebar, { isSidebarOpen, toggleSidebar });

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { userData });
    }
    return child;
  });

  return React.createElement(
    "div",
    {
      className: "flex min-h-screen font-['Poppins'] bg-white",
    },

    // Sidebar Area
    sidebarWithProps,

    // Main Content Area
    React.createElement(
      "div",
      { className: "flex-1 flex flex-col overflow-y-auto" },
      
      // Header
      React.createElement(Header, { 
          userData, 
          handleLogout, 
          isProfileMenuOpen, 
          toggleProfileMenu 
      }),
      
      // Konten Utama
      React.createElement(
        "main",
        {
          className: "p-0", 
        },
        childrenWithProps
      )
    )
  );
};

export default DashboardLayout;