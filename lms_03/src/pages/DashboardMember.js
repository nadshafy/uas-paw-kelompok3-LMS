import React, { useState, useEffect } from "react";
import {
  BookOpen,
  LogOut, // LogOut tidak diperlukan jika handleLogout dipindahkan
  Search,
  Book,
  Clock,
  AlertCircle,
  User,
} from "lucide-react";

const DashboardMember = ({ userData, isLoading }) => { 
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [dataLoading, setDataLoading] = useState(true); 

  useEffect(() => {
    setTimeout(() => {
      setBorrowedBooks([
        {
          id: 1,
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          borrowDate: "2024-12-01",
          dueDate: "2024-12-15",
          status: "borrowed",
        },
        {
          id: 2,
          title: "1984",
          author: "George Orwell",
          borrowDate: "2024-12-05",
          dueDate: "2024-12-19",
          status: "borrowed",
        },
      ]);
      setDataLoading(false);
    }, 1000);
  }, []);

  const calculateDaysLeft = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (dataLoading) { 
    return (
      <div className="text-center p-10">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Fetching member data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8"> 
      
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Selamat Datang, {userData?.name}! 
            </h2>
            <p className="text-purple-100">
              Ready to explore more books today?
            </p>
          </div>
          <User size={64} className="opacity-20 hidden md:block" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Books Borrowed
              </p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {borrowedBooks.length}
              </p>
            </div>
            <Book size={40} className="text-blue-500 opacity-80" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Available Slots
              </p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {3 - borrowedBooks.length}/3
              </p>
            </div>
            <BookOpen size={40} className="text-green-500 opacity-80" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Due Soon</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {
                  borrowedBooks.filter(
                    (book) => calculateDaysLeft(book.dueDate) <= 3
                  ).length
                }
              </p>
            </div>
            <Clock size={40} className="text-orange-500 opacity-80" />
          </div>
        </div>
      </div>

      {/* Currently Borrowed Books */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            Currently Borrowed Books
          </h3>
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
            {borrowedBooks.length} books
          </span>
        </div>

        {borrowedBooks.length === 0 ? (
          <div className="text-center py-12">
            <Book size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-2">
              You haven't borrowed any books yet
            </p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-all">
              Browse Books
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {borrowedBooks.map((book) => {
              const daysLeft = calculateDaysLeft(book.dueDate);
              const isOverdue = daysLeft < 0;
              const isDueSoon = daysLeft <= 3 && daysLeft >= 0;

              return (
                <div
                  key={book.id}
                  className="border-2 border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-800 mb-1">
                        {book.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        by {book.author}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Clock size={16} className="mr-1" />
                          <span>Borrowed: {book.borrowDate}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <AlertCircle size={16} className="mr-1" />
                          <span>Due: {book.dueDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      {isOverdue ? (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                          Overdue by {Math.abs(daysLeft)} days
                        </span>
                      ) : isDueSoon ? (
                        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-semibold">
                          Due in {daysLeft} days
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {daysLeft} days left
                        </span>
                      )}

                      <button className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-all">
                        Return Book
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer">
          <Search size={32} className="text-purple-600 mb-3" />
          <h4 className="text-lg font-bold text-gray-800 mb-2">
            Browse Books
          </h4>
          <p className="text-sm text-gray-600">
            Search and discover new books in our library
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer">
          <Clock size={32} className="text-purple-600 mb-3" />
          <h4 className="text-lg font-bold text-gray-800 mb-2">
            Borrowing History
          </h4>
          <p className="text-sm text-gray-600">
            View your complete borrowing history
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardMember;