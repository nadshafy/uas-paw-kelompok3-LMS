import React, { useState, useEffect } from 'react';
import { BookOpen, LogOut, User } from 'lucide-react'; 

const Header = ({ userData, handleLogout }) => {
  return React.createElement(
    "header",
    { className: "bg-white shadow-md sticky top-0 z-10" },
    React.createElement(
      "div",
      { className: "max-w-full mx-auto px-8" }, 
      React.createElement(
        "div",
        { className: "flex justify-between items-center py-4" },
        React.createElement(
          "div",
          { className: "flex items-center space-x-3" },
          React.createElement("div", { className: "bg-indigo-600 p-2 rounded-lg" }, 
            React.createElement(BookOpen, { size: 28, className: "text-white" })
          ),
          React.createElement("div", null,
            React.createElement("h1", { className: "text-2xl font-bold text-gray-800" }, "Library System"),
            React.createElement("p", { className: "text-sm text-gray-500" }, "Librarian Dashboard")
          )
        ),

        React.createElement(
          "div",
          { className: "flex items-center space-x-4" },
          React.createElement(
            "div",
            { className: "text-right hidden md:block" },
            React.createElement("p", { className: "text-sm font-semibold text-gray-800" }, userData?.name),
            React.createElement("p", { className: "text-xs text-gray-500" }, userData?.email)
          ),
          React.createElement(
            "button",
            {
              onClick: handleLogout,
              className: "flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
            },
            React.createElement(LogOut, { size: 18 }),
            React.createElement("span", { className: "hidden sm:inline" }, "Logout")
          )
        )
      )
    )
  );
};


const DashboardLayout = ({ children, sidebar }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
  
  // loader
  if (isLoading) {
    return React.createElement(
      'div',
      { className: "min-h-screen flex items-center justify-center" },
      // Loader
    );
  }

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { 
        userData: userData,
      });
    }
    return child;
  });

  return React.createElement(
    "div",
    { className: "flex min-h-screen bg-gray-50" },
    
    // Sidebar Area
    sidebar,

    React.createElement(
      "div",
      { className: "flex-1 flex flex-col overflow-y-auto" },
      React.createElement(Header, { userData: userData, handleLogout: handleLogout }),
      React.createElement(
        "main",
        { className: "p-8" },
        childrenWithProps 
      )
    )
  );
};

export default DashboardLayout;