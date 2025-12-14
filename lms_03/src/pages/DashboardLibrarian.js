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
  RotateCcw, 
  List,      
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

    setTimeout(() => {
      setStats({
        totalBooks: 1250,
        totalMembers: 342,
        activeBorrows: 89,
        overdueBooks: 5,
      });

      setRecentActivities([]); 
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  
  if (isLoading) {
    return (
      <div className="text-center p-10">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Selamat Datang, {userData?.name}! 
            </h2>
            <p className="text-indigo-100">
              Let's manage the library efficiently today
            </p>
          </div>
          <User size={64} className="opacity-20 hidden md:block" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

        {/* Total Members */}
        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Members</p>
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

        {/* Active Borrows / Peminjaman Aktif */}
        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Active Borrows</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {stats.activeBorrows}
              </p>
              <p className="text-xs text-gray-500 mt-1">Currently borrowed</p>
            </div>
            <Plus size={40} className="text-purple-500 opacity-80" /> 
          </div>
        </div>

        {/* Overdue Books / Buku Terlambat */}
        <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Overdue Books</p>
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


      {/* Quick Actions (Diisi sesuai menu Sidebar) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Aksi Cepat 1: Manajemen Buku (Ganti dari Add New Book) */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer group">
          <div className="bg-indigo-100 group-hover:bg-indigo-200 p-3 rounded-lg inline-block mb-3 transition-all">
            <Book size={32} className="text-indigo-600" /> {/* Ikon Book */}
          </div>
          <h4 className="text-lg font-bold text-gray-800 mb-2">
            Manajemen Buku
          </h4>
          <p className="text-sm text-gray-600">
            Lihat, tambah, dan edit buku katalog
          </p>
        </div>

        {/* Aksi Cepat 3: Peminjaman (Menggunakan Plus) */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer group">
          <div className="bg-purple-100 group-hover:bg-purple-200 p-3 rounded-lg inline-block mb-3 transition-all">
            <Plus size={32} className="text-purple-600" /> {/* Ikon Plus */}
          </div>
          <h4 className="text-lg font-bold text-gray-800 mb-2">
            Proses Peminjaman
          </h4>
          <p className="text-sm text-gray-600">
            Lakukan transaksi peminjaman buku
          </p>
        </div>

        {/* Aksi Cepat 4: Pengembalian (Menggunakan RotateCcw) */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer group">
          <div className="bg-orange-100 group-hover:bg-orange-200 p-3 rounded-lg inline-block mb-3 transition-all">
            <RotateCcw size={32} className="text-orange-600" /> {/* Ikon RotateCcw */}
          </div>
          <h4 className="text-lg font-bold text-gray-800 mb-2">
            Proses Pengembalian
          </h4>
          <p className="text-sm text-gray-600">
            Lakukan transaksi pengembalian dan denda
          </p>
        </div>
        
        {/* Tambahan: Transaksi (Menggunakan List) */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer group">
          <div className="bg-yellow-100 group-hover:bg-yellow-200 p-3 rounded-lg inline-block mb-3 transition-all">
            <List size={32} className="text-yellow-600" /> {/* Ikon List */}
          </div>
          <h4 className="text-lg font-bold text-gray-800 mb-2">
            Lihat Semua Transaksi
          </h4>
          <p className="text-sm text-gray-600">
            Cek riwayat lengkap pinjam dan kembali
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default DashboardLibrarian;