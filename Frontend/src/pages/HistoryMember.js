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

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => window.history.back()}
          className="p-3 bg-white/60 rounded-xl shadow"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold">Riwayat Peminjaman</h1>
          <p className="text-gray-600 text-sm">
            Buku yang sedang atau pernah kamu pinjam
          </p>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="relative mb-10">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari riwayat buku..."
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
                  {item.status}
                </span>
              </div>

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
                      {item.returnDate}
                    </p>
                  </div>
                </div>
              </div>
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
    </div>
  );
};

export default HistoryMember;