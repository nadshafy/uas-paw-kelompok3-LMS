import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import {
  Plus,
  Book,
  User,
  RotateCcw,
  List,
  Search,
  LogOut,
} from "lucide-react";
<<<<<<< HEAD:Frontend/src/pages/DashboardLibrarian.js
<<<<<<< HEAD

const simulatedBookData = [
  {
    no: 1,
    isbn: "978-6028519943",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Pengembangan Diri",
  },
  {
    no: 2,
    isbn: "978-0743273565",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiksi",
  },
  {
    no: 3,
    isbn: "978-1503606685",
    title: "Sapiens: A Brief History",
    author: "Yuval Noah Harari",
    category: "Sejarah",
  },
  {
    no: 4,
    isbn: "978-0134757544",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Teknologi",
  },
  {
    no: 5,
    isbn: "978-9791443831",
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    category: "Fiksi",
  },
  {
    no: 6,
    isbn: "978-0321765723",
    title: "The Martian",
    author: "Andy Weir",
    category: "Fiksi Ilmiah",
  },
  {
    no: 7,
    isbn: "978-1593275990",
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    category: "Teknologi",
  },
  {
    no: 8,
    isbn: "978-0061120084",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiksi Klasik",
  },
  {
    no: 9,
    isbn: "978-0062316097",
    title: "Educated",
    author: "Tara Westover",
    category: "Biografi",
  },
  {
    no: 10,
    isbn: "978-1400030658",
    title: "Siddhartha",
    author: "Hermann Hesse",
    category: "Filosofi",
  },
];
=======
import { BookService, CategoryService, API_BASE_URL } from "../services/api";
>>>>>>> backend_update
=======
import { BookService, CategoryService, API_BASE_URL } from "../services/api";
>>>>>>> origin/backend:lms_03/src/pages/DashboardLibrarian.js

const DashboardLibrarian = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalMembers: 0,
    activeBorrows: 0,
    overdueBooks: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
<<<<<<< HEAD:Frontend/src/pages/DashboardLibrarian.js
<<<<<<< HEAD
  const categories = [
    "All",
    "Fiksi",
    "Sains",
    "Sejarah",
    "Teknologi",
    "Pengembangan Diri",
  ];
  const [filteredBooks, setFilteredBooks] = useState(simulatedBookData);
=======
  const [categories, setCategories] = useState(["All"]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [books, setBooks] = useState([]);
>>>>>>> backend_update
=======
  const [categories, setCategories] = useState(["All"]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [books, setBooks] = useState([]);
>>>>>>> origin/backend:lms_03/src/pages/DashboardLibrarian.js

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");

    if (!token) {
      navigate("/"); 
      return;
    }

    setUserData({
      name: userName || "Librarian",
      email: userEmail || "librarian@library.com",
    });

<<<<<<< HEAD:Frontend/src/pages/DashboardLibrarian.js
<<<<<<< HEAD
    setTimeout(() => {
      setStats({
        totalBooks: 1250,
        totalMembers: 342,
        activeBorrows: 89,
        overdueBooks: 5,
      });
=======
    // Load data from API
    loadDashboardData();
    loadBooks();
    loadCategories();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/librarian`);
      const data = await response.json();
      
      if (data.dashboard) {
        setStats({
          totalBooks: data.dashboard.books.total || 0,
          totalMembers: data.dashboard.users.total_members || 0,
          activeBorrows: data.dashboard.borrowings.active || 0,
          overdueBooks: data.dashboard.borrowings.late || 0,
        });
      }
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
>>>>>>> origin/backend:lms_03/src/pages/DashboardLibrarian.js
      setIsLoading(false);
    }
  };

  const loadBooks = async () => {
    const result = await BookService.getAll(searchQuery, filterCategory);
    if (result.success) {
      setBooks(result.data.books);
      setFilteredBooks(result.data.books.slice(0, 10)); // Show first 10
    }
  };

  const loadCategories = async () => {
    const result = await CategoryService.getAll();
    if (result.success) {
      setCategories(["All", ...result.data.categories]);
    }
  };

  useEffect(() => {
<<<<<<< HEAD:Frontend/src/pages/DashboardLibrarian.js
    let results = simulatedBookData;
=======
    // Load data from API
    loadDashboardData();
    loadBooks();
    loadCategories();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/librarian`);
      const data = await response.json();
      
      if (data.dashboard) {
        setStats({
          totalBooks: data.dashboard.books.total || 0,
          totalMembers: data.dashboard.users.total_members || 0,
          activeBorrows: data.dashboard.borrowings.active || 0,
          overdueBooks: data.dashboard.borrowings.late || 0,
        });
      }
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadBooks = async () => {
    const result = await BookService.getAll(searchQuery, filterCategory);
    if (result.success) {
      setBooks(result.data.books);
      setFilteredBooks(result.data.books.slice(0, 10)); // Show first 10
    }
  };

  const loadCategories = async () => {
    const result = await CategoryService.getAll();
    if (result.success) {
      setCategories(["All", ...result.data.categories]);
    }
  };

  useEffect(() => {
    let results = books.slice(0, 10); // Limit to 10 for dashboard
>>>>>>> backend_update
=======
    let results = books.slice(0, 10); // Limit to 10 for dashboard
>>>>>>> origin/backend:lms_03/src/pages/DashboardLibrarian.js

    if (filterCategory !== "all") {
      results = results.filter(
        (book) => book.category.toLowerCase() === filterCategory.toLowerCase()
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
<<<<<<< HEAD:Frontend/src/pages/DashboardLibrarian.js
<<<<<<< HEAD
          book.author.toLowerCase().includes(query) ||
          book.isbn.includes(query)
=======
          book.author.toLowerCase().includes(query)
>>>>>>> backend_update
=======
          book.author.toLowerCase().includes(query)
>>>>>>> origin/backend:lms_03/src/pages/DashboardLibrarian.js
      );
    }

    setFilteredBooks(results);
<<<<<<< HEAD:Frontend/src/pages/DashboardLibrarian.js
<<<<<<< HEAD
  }, [searchQuery, filterCategory]);
=======
  }, [searchQuery, filterCategory, books]);
>>>>>>> backend_update
=======
  }, [searchQuery, filterCategory, books]);
>>>>>>> origin/backend:lms_03/src/pages/DashboardLibrarian.js

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin logout?")) {
      localStorage.clear();
      navigate("/");
    }
  };

  const handleNavigate = (path) => {
    if (path === "#") {
      return; 
    }
    navigate(path);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-500 to-amber-400">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
        <p className="text-white/80 font-semibold">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 space-y-8 font-['Poppins'] bg-gradient-to-br from-indigo-900 via-blue-500 to-amber-400">
<<<<<<< HEAD
=======
      {/* HEADER WITH LOGOUT */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl">
            <Book size={32} className="text-white" />
          </div>
          <div className="text-white">
            <h1 className="text-2xl font-bold drop-shadow-md">
              Perpustakaan FRAND
            </h1>
            <p className="text-sm opacity-90">Dashboard Librarian</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block text-white">
            <p className="text-sm font-semibold">{userData?.name}</p>
            <p className="text-xs opacity-80">{userData?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all shadow-lg font-semibold"
          >
            <LogOut size={18} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
>>>>>>> backend_update

      {/* WELCOME SECTION */}
      <div className="relative overflow-hidden rounded-3xl p-8 bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl">
        <div className="relative z-10 flex items-center justify-between text-white">
          <div>
            <h2 className="text-3xl font-bold mb-2 drop-shadow-md">
              Selamat Datang, {userData?.name}!
            </h2>
            <p className="opacity-90">
              Let's manage the library efficiently today
            </p>
          </div>
          <User size={64} className="opacity-30 hidden md:block" />
        </div>
      </div>

      {/* QUICK ACTIONS GRID */}
      <h3 className="text-xl font-bold text-white drop-shadow-sm pt-4">
        Dashboard Overview
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "MANAJEMEN BUKU",
            desc: "Lihat, tambah, dan edit buku katalog",
            icon: <Book size={40} className="text-indigo-700" />,
            bgColor: "bg-indigo-200/50",
            path: "/book-management", 
          },
          {
            title: "PEMINJAMAN",
            desc: "Lakukan transaksi peminjaman buku",
            icon: <Plus size={40} className="text-green-700" />,
            bgColor: "bg-green-200/50",
            path: "/peminjaman-buku",
          },
          {
            title: "PENGEMBALIAN",
            desc: "Lakukan transaksi pengembalian dan denda",
            icon: <RotateCcw size={40} className="text-orange-700" />,
            bgColor: "bg-orange-200/50",
            path: "#",
          },
          {
            title: "TRANSAKSI",
            desc: "Cek riwayat lengkap pinjam dan kembali",
            icon: <List size={40} className="text-teal-700" />,
            bgColor: "bg-teal-200/50",
            path: "#",
          },
        ].map((item, i) => (
          <div
            key={i}
            onClick={() => handleNavigate(item.path)} 
            className="relative overflow-hidden rounded-2xl p-6 bg-white/20 backdrop-blur-md border border-white/30 shadow-xl hover:bg-white/30 hover:scale-105 transition-all cursor-pointer text-white"
          >
            <div className="mb-4 opacity-80 flex justify-center">
              <div
                className={`p-3 rounded-xl ${item.bgColor} flex items-center justify-center`}
              >
                {item.icon}
              </div>
            </div>

            <h4 className="text-lg font-bold mb-2">{item.title}</h4>
            <p className="text-sm opacity-80">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* SEARCH & FILTER SECTION */}
      <div className="space-y-4 pt-2">
        <h3 className="text-xl font-bold text-white drop-shadow-sm">
          Pencarian Buku
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Bar */}
          <div className="md:col-span-2 relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80"
            />
            <input
              type="text"
              placeholder="Search by Title, ISBN, or Author..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full bg-white/10 text-white placeholder-white/70 border-b border-white/50 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors outline-none"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={filterCategory}
              onChange={handleFilterChange}
              className="w-full appearance-none bg-white/10 text-white border-b border-white/50 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors outline-none cursor-pointer"
            >
              <option value="all" className="bg-gray-800 text-white">
                Filter by Category
              </option>
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat.toLowerCase()}
                  className="bg-gray-800 text-white"
                >
                  {cat}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white/70">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE DATA BUKU */}
      <div className="relative overflow-x-auto rounded-xl shadow-2xl bg-white mb-10">
        <table className="min-w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-100 text-gray-800 uppercase font-bold border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">No</th>
<<<<<<< HEAD:Frontend/src/pages/DashboardLibrarian.js
<<<<<<< HEAD
              <th className="px-6 py-4">ISBN</th>
=======
>>>>>>> backend_update
=======
>>>>>>> origin/backend:lms_03/src/pages/DashboardLibrarian.js
              <th className="px-6 py-4">Nama Buku</th>
              <th className="px-6 py-4">Penulis</th>
              <th className="px-6 py-4">Kategori</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredBooks.length > 0 ? (
<<<<<<< HEAD:Frontend/src/pages/DashboardLibrarian.js
<<<<<<< HEAD
              filteredBooks.map((book) => (
=======
              filteredBooks.map((book, index) => (
>>>>>>> origin/backend:lms_03/src/pages/DashboardLibrarian.js
                <tr
                  key={book.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
<<<<<<< HEAD:Frontend/src/pages/DashboardLibrarian.js
                  <td className="px-6 py-4 font-medium">{book.no}</td>
                  <td className="px-6 py-4 font-mono text-xs text-black-1000">
                    {book.isbn}
                  </td>
=======
              filteredBooks.map((book, index) => (
                <tr
                  key={book.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 font-medium">{index + 1}</td>
>>>>>>> backend_update
=======
                  <td className="px-6 py-4 font-medium">{index + 1}</td>
>>>>>>> origin/backend:lms_03/src/pages/DashboardLibrarian.js
                  <td className="px-6 py-4 text-gray-800">{book.title}</td>
                  <td className="px-6 py-4">{book.author}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {book.category}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <Search size={40} className="mb-2 opacity-20" />
                    <p>No books found matching the criteria.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default DashboardLibrarian;
=======
export default DashboardLibrarian;
>>>>>>> backend_update
