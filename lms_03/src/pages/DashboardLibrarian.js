import React, { useState, useEffect } from "react";
import {
  BookOpen,
  LogOut,
  Plus,
  Users,
  Book,
  TrendingUp,
  AlertCircle,
  User,
} from "lucide-react";

const DashboardLibrarian = () => {
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalMembers: 0,
    activeBorrows: 0,
    overdueBooks: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get user data from localStorage
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");

    if (!token) {
      // Redirect to login if no token
      window.location.href = "/";
      return;
    }

    setUserData({
      name: userName || "Librarian",
      email: userEmail || "librarian@library.com",
    });

    // Simulate fetching stats and activities
    // TODO: Replace with actual API call
    setTimeout(() => {
      setStats({
        totalBooks: 1250,
        totalMembers: 342,
        activeBorrows: 89,
        overdueBooks: 5,
      });

      setRecentActivities([
        {
          id: 1,
          type: "borrow",
          user: "John Doe",
          book: "The Great Gatsby",
          date: "2024-12-14 10:30",
          status: "completed",
        },
        {
          id: 2,
          type: "return",
          user: "Jane Smith",
          book: "1984",
          date: "2024-12-14 09:15",
          status: "completed",
        },
        {
          id: 3,
          type: "borrow",
          user: "Bob Wilson",
          book: "To Kill a Mockingbird",
          date: "2024-12-13 16:45",
          status: "pending",
        },
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <BookOpen size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Library System
                </h1>
                <p className="text-sm text-gray-500">Librarian Dashboard</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-gray-800">
                  {userData?.name}
                </p>
                <p className="text-xs text-gray-500">{userData?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Welcome back, {userData?.name}! 👋
              </h2>
              <p className="text-indigo-100">
                Let's manage the library efficiently today
              </p>
            </div>
            <User size={64} className="opacity-20 hidden md:block" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Books</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {stats.totalBooks}
                </p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp size={12} className="mr-1" />
                  +12 this month
                </p>
              </div>
              <Book size={40} className="text-blue-500 opacity-80" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Total Members
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {stats.totalMembers}
                </p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp size={12} className="mr-1" />
                  +8 this week
                </p>
              </div>
              <Users size={40} className="text-green-500 opacity-80" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Active Borrows
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {stats.activeBorrows}
                </p>
                <p className="text-xs text-gray-500 mt-1">Currently borrowed</p>
              </div>
              <BookOpen size={40} className="text-purple-500 opacity-80" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Overdue Books
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {stats.overdueBooks}
                </p>
                <p className="text-xs text-red-600 mt-1 flex items-center">
                  <AlertCircle size={12} className="mr-1" />
                  Needs attention
                </p>
              </div>
              <AlertCircle size={40} className="text-red-500 opacity-80" />
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              Recent Activities
            </h3>
            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-300 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-lg ${
                      activity.type === "borrow"
                        ? "bg-blue-100"
                        : "bg-green-100"
                    }`}
                  >
                    {activity.type === "borrow" ? (
                      <BookOpen size={24} className="text-blue-600" />
                    ) : (
                      <Book size={24} className="text-green-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {activity.user}{" "}
                      {activity.type === "borrow" ? "borrowed" : "returned"}
                    </p>
                    <p className="text-sm text-gray-600">{activity.book}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {activity.date}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    activity.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer group">
            <div className="bg-indigo-100 group-hover:bg-indigo-200 p-3 rounded-lg inline-block mb-3 transition-all">
              <Plus size={32} className="text-indigo-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">
              Add New Book
            </h4>
            <p className="text-sm text-gray-600">
              Add books to library catalog
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer group">
            <div className="bg-green-100 group-hover:bg-green-200 p-3 rounded-lg inline-block mb-3 transition-all">
              <Users size={32} className="text-green-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">
              Manage Members
            </h4>
            <p className="text-sm text-gray-600">
              View and manage library members
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer group">
            <div className="bg-purple-100 group-hover:bg-purple-200 p-3 rounded-lg inline-block mb-3 transition-all">
              <BookOpen size={32} className="text-purple-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">
              Process Borrow
            </h4>
            <p className="text-sm text-gray-600">
              Process book borrow requests
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer group">
            <div className="bg-orange-100 group-hover:bg-orange-200 p-3 rounded-lg inline-block mb-3 transition-all">
              <AlertCircle size={32} className="text-orange-600" />
            </div>
            <h4 className="text-lg font-bold text-gray-800 mb-2">
              View Overdue
            </h4>
            <p className="text-sm text-gray-600">
              Check overdue books and fines
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLibrarian;
