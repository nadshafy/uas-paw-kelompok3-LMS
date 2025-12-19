<<<<<<< HEAD
import React, { useState, useEffect } from "react"; 
import { Search, Calendar, BookOpen, User, ArrowLeft, Clock, CheckCircle } from "lucide-react";

const MemberHistory = () => {
  const [searchTerm, setSearchTerm] = useState("") ; 
  const [historyData, setHistoryData] = useState([]);

  // DATA DUMMY AWAL 
  const initialData = [
    {
      id: 101,
      title: "Buku Entong",
      author: "Adel & Ecak",
      category: "Fiksi",
      borrowDate: "10/12/2025",
      returnDate: "17/12/2025",
      status: "Dipinjam", 
      coverColor: "bg-emerald-500"
    },
  ];

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("memberHistory")) || [];
    setHistoryData([...storedHistory, ...initialData]);
  }, []);

  // Filter Data
  const filteredHistory = historyData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full font-['Poppins'] text-gray-800 p-8 md:p-12 bg-gradient-to-br from-green-100 via-white to-emerald-200">
      
=======
import React, { useState, useEffect } from "react";
import {
  Search,
  Calendar,
  BookOpen,
  User,
  ArrowLeft,
  Clock,
  CheckCircle,
} from "lucide-react";
import { BorrowingService } from "../services/api";

const HistoryMember = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  // LOAD DATA FROM BACKEND
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);

      // ambil SEMUA riwayat peminjaman user
      const response = await BorrowingService.getAll();

      console.log("Borrowing API Response:", response);

      if (response.success) {
        /**
         * asumsi response.data = {
         *   borrowings: [...]
         * }
         * atau langsung array
         */
        const borrowings = response.data.borrowings || response.data || [];

        const mappedData = borrowings.map((item) => ({
          id: item.id,
          title: item.book?.title || item.book_title || "-",
          author: item.book?.author || item.author || "-",
          category: item.book?.category || item.category || "Lainnya",
          borrowDate: item.borrow_date,
          returnDate: item.return_date || "-",
          status: item.status === "returned" ? "Dikembalikan" : "Dipinjam",
          coverColor: getCategoryColor(
            item.book?.category || item.category
          ),
        }));

        setHistoryData(mappedData);
      }
    } catch (error) {
      console.error("Gagal memuat riwayat:", error);
    } finally {
      setLoading(false);
    }
  };

  // WARNA BERDASARKAN KATEGORI
  const getCategoryColor = (category) => {
    const colorMap = {
      Fiksi: "bg-emerald-500",
      Novel: "bg-sky-500",
      Sejarah: "bg-indigo-500",
      Bisnis: "bg-blue-600",
      Sains: "bg-yellow-500",
      Fantasi: "bg-purple-600",
    };
    return colorMap[category] || "bg-gray-500";
  };

  // FILTER SEARCH
  const filteredHistory = historyData.filter((item) => {
    const q = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  // LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mb-4"></div>
        <p className="text-gray-600 font-semibold">Memuat riwayat...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full font-['Poppins'] text-gray-800 p-8 md:p-12 bg-gradient-to-br from-green-100 via-white to-emerald-200">

>>>>>>> backend_update
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => window.history.back()}
<<<<<<< HEAD
          className="p-3 bg-white/60 backdrop-blur-md border border-white/50 rounded-xl hover:bg-white/80 transition-all text-emerald-800 shadow-sm"
=======
          className="p-3 bg-white/60 rounded-xl shadow"
>>>>>>> backend_update
        >
          <ArrowLeft size={24} />
        </button>
        <div>
<<<<<<< HEAD
          <h1 className="text-3xl font-bold text-gray-900 drop-shadow-sm">
            Riwayat Peminjaman
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Daftar buku yang sedang atau pernah kamu pinjam
=======
          <h1 className="text-3xl font-bold">Riwayat Peminjaman</h1>
          <p className="text-gray-600 text-sm">
            Buku yang sedang atau pernah kamu pinjam
>>>>>>> backend_update
          </p>
        </div>
      </div>

      {/* SEARCH BAR */}
<<<<<<< HEAD
      <div className="relative mb-10 group">
=======
      <div className="relative mb-10">
>>>>>>> backend_update
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari riwayat buku..."
<<<<<<< HEAD
          className="w-full bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl py-4 px-6 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:bg-white/80 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-md"
        />
        <button className="absolute right-2 top-2 h-[calc(100%-16px)] w-16 bg-emerald-500 rounded-xl flex items-center justify-center text-white hover:bg-emerald-600 transition-all cursor-pointer shadow-sm">
          <Search size={24} />
        </button>
      </div>

      {/* GRID KARTU RIWAYAT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((item, index) => (
            <div
              key={index} 
              className="group relative bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${item.coverColor || 'bg-gray-400'} opacity-20 blur-xl group-hover:opacity-30 transition-opacity`}></div>

              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </h3>
                
                <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm ${
                  item.status === "Dipinjam" 
                    ? "bg-yellow-100 text-yellow-700 border border-yellow-200" 
                    : "bg-green-100 text-green-700 border border-green-200"
                }`}>
                  {item.status === "Dipinjam" ? <Clock size={14}/> : <CheckCircle size={14}/>}
=======
          className="w-full bg-white/60 rounded-2xl py-4 px-6 shadow focus:outline-none"
        />
        <Search className="absolute right-6 top-5 text-gray-400" />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((item) => (
            <div
              key={item.id}
              className="bg-white/40 backdrop-blur-md p-6 rounded-3xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between mb-4">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                    item.status === "Dipinjam"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {item.status === "Dipinjam" ? (
                    <Clock size={14} />
                  ) : (
                    <CheckCircle size={14} />
                  )}
>>>>>>> backend_update
                  {item.status}
                </span>
              </div>

<<<<<<< HEAD
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-emerald-600" />
                  <span className="font-medium">Penulis:</span> {item.author}
                </div>
                
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-emerald-600" />
                  <span className="font-medium">Kategori:</span> {item.category}
                </div>

                <div className="pt-2 border-t border-gray-200/50 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <Calendar size={12} /> Tgl Pinjam
                    </p>
                    <p className="font-bold text-gray-800">{item.borrowDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <Calendar size={12} /> Tgl Kembali
                    </p>
                    <p className={`font-bold ${item.status === "Dipinjam" ? "text-red-500" : "text-gray-800"}`}>
=======
              <div className="text-sm space-y-2">
                <p className="flex items-center gap-2">
                  <User size={16} /> {item.author}
                </p>
                <p className="flex items-center gap-2">
                  <BookOpen size={16} /> {item.category}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                  <div>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar size={12} /> Tgl Pinjam
                    </p>
                    <p className="font-bold">{item.borrowDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar size={12} /> Tgl Kembali
                    </p>
                    <p
                      className={`font-bold ${
                        item.status === "Dipinjam"
                          ? "text-red-500"
                          : ""
                      }`}
                    >
>>>>>>> backend_update
                      {item.returnDate}
                    </p>
                  </div>
                </div>
              </div>
<<<<<<< HEAD

            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 text-center py-20 opacity-60">
            <Search size={48} className="mx-auto mb-4 text-emerald-600" />
            <p className="text-xl font-medium text-gray-700">Tidak ditemukan riwayat buku "{searchTerm}"</p>
          </div>
        )}
      </div>

=======
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-20 opacity-60">
            <Search size={48} className="mx-auto mb-4 text-emerald-600" />
            <p className="text-xl font-medium">
              Tidak ditemukan riwayat "{searchTerm}"
            </p>
          </div>
        )}
      </div>
>>>>>>> backend_update
    </div>
  );
};

<<<<<<< HEAD
export default MemberHistory;
=======
export default HistoryMember;
>>>>>>> backend_update
