import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Book,
  User,
  RotateCcw,
  List,
  Search,
} from "lucide-react";
import { BookService, CategoryService, API_BASE_URL } from "../services/api";

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
  const [categories, setCategories] = useState(["All"]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [books, setBooks] = useState([]);

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

    loadDashboardData();
    loadBooks();
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setFilteredBooks(result.data.books.slice(0, 10));
    }
  };

  const loadCategories = async () => {
    const result = await CategoryService.getAll();
    if (result.success) {
      setCategories(["All", ...result.data.categories]);
    }
  };

  useEffect(() => {
    let results = books.slice(0, 10);

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
          book.author.toLowerCase().includes(query)
      );
    }

    setFilteredBooks(results);
  }, [searchQuery, filterCategory, books]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl">
            <Book size={32} className="text-white" />
          </div>
          <div className="text-white">
            <h1 className="text-2xl font-bold drop-shadow-md">
              Dashboard Perpustakaan
            </h1>
            <p className="text-sm opacity-80">
              Halo, {userData?.name || "Librarian"}!
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-white drop-shadow-sm pt-4">
        Dashboard Overview
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
          <div className="flex items-center justify-between">
            <Book size={28} className="text-white opacity-90" />
            <div className="text-right">
              <p className="text-xs uppercase tracking-wide font-medium opacity-80">
                Total Buku
              </p>
              <p className="text-3xl font-extrabold drop-shadow-md">
                {stats.totalBooks}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
          <div className="flex items-center justify-between">
            <User size={28} className="text-white opacity-90" />
            <div className="text-right">
              <p className="text-xs uppercase tracking-wide font-medium opacity-80">
                Total Member
              </p>
              <p className="text-3xl font-extrabold drop-shadow-md">
                {stats.totalMembers}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
          <div className="flex items-center justify-between">
            <RotateCcw size={28} className="text-white opacity-90" />
            <div className="text-right">
              <p className="text-xs uppercase tracking-wide font-medium opacity-80">
                Peminjaman Aktif
              </p>
              <p className="text-3xl font-extrabold drop-shadow-md">
                {stats.activeBorrows}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
          <div className="flex items-center justify-between">
            <List size={28} className="text-white opacity-90" />
            <div className="text-right">
              <p className="text-xs uppercase tracking-wide font-medium opacity-80">
                Buku Terlambat
              </p>
              <p className="text-3xl font-extrabold drop-shadow-md">
                {stats.overdueBooks}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6">
        <h3 className="text-2xl font-bold text-white drop-shadow-sm">
          Quick Actions
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => handleNavigate("/book-management")}
          className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-8 text-white shadow-lg hover:bg-white/30 hover:shadow-xl transition-all duration-200"
        >
          <Plus size={48} className="mb-3 text-white drop-shadow-md" />
          <p className="text-lg font-bold">Manajemen Buku</p>
          <p className="text-xs opacity-80 text-center mt-2">
            Tambah, edit, dan hapus buku
          </p>
        </button>

        <button
          onClick={() => handleNavigate("/peminjaman-buku")}
          className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-8 text-white shadow-lg hover:bg-white/30 hover:shadow-xl transition-all duration-200"
        >
          <RotateCcw size={48} className="mb-3 text-white drop-shadow-md" />
          <p className="text-lg font-bold">Peminjaman</p>
          <p className="text-xs opacity-80 text-center mt-2">
            Kelola peminjaman buku
          </p>
        </button>

        <button
          onClick={() => handleNavigate("/transaksi-denda")}
          className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-8 text-white shadow-lg hover:bg-white/30 hover:shadow-xl transition-all duration-200"
        >
          <List size={48} className="mb-3 text-white drop-shadow-md" />
          <p className="text-lg font-bold">Transaksi Denda</p>
          <p className="text-xs opacity-80 text-center mt-2">
            Lihat daftar transaksi denda
          </p>
        </button>
      </div>

      <div className="pt-6">
        <h3 className="text-2xl font-bold text-white drop-shadow-sm mb-6">
          Recent Books
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70"
            />
            <input
              type="text"
              placeholder="Cari buku berdasarkan judul atau penulis..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full bg-white/10 text-white placeholder-white/70 border border-white/50 rounded-lg py-3 pl-11 pr-4 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors outline-none"
            />
          </div>

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
          </div>
        </div>

        <div className="relative overflow-x-auto rounded-2xl shadow-2xl">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/30 backdrop-blur-md text-white uppercase font-bold border-b-2 border-white/50">
              <tr>
                <th className="px-6 py-4">No</th>
                <th className="px-6 py-4">Nama Buku</th>
                <th className="px-6 py-4">Penulis</th>
                <th className="px-6 py-4">Kategori</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book, index) => (
                  <tr
                    key={book.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
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
    </div>
  );
};

export default DashboardLibrarian;
