import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ArrowLeft,
  User,
  BookOpen,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { BorrowingService } from "../services/api";

const TransaksiDenda = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [fineData, setFineData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFines();
  }, []);

  const loadFines = async () => {
    try {
      setLoading(true);
      const response = await BorrowingService.getAll();

      if (response.success) {
        const borrowings = response.data.borrowings || response.data || [];

        // Filter only borrowings with fines
        const finesData = borrowings
          .filter((item) => item.fine && item.fine > 0)
          .map((item) => ({
            id: item.id,
            memberName: item.member_name || item.user?.name || "-",
            bookTitle: item.book_title || item.book?.title || "-",
            author: item.author || item.book?.author || "-",
            category: item.category || item.book?.category || "Lainnya",
            borrowDate: item.borrow_date,
            dueDate: item.due_date,
            returnDate: item.return_date,
            fine: item.fine || 0,
            status: item.return_date ? "Dikembalikan" : "Dipinjam",
          }));

        setFineData(finesData);
      }
    } catch (error) {
      console.error("Error loading fines:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Fiksi: "bg-purple-100 text-purple-700 border-purple-200",
      "Non-Fiksi": "bg-blue-100 text-blue-700 border-blue-200",
      Teknologi: "bg-green-100 text-green-700 border-green-200",
      Sains: "bg-yellow-100 text-yellow-700 border-yellow-200",
      Sejarah: "bg-red-100 text-red-700 border-red-200",
      Biografi: "bg-indigo-100 text-indigo-700 border-indigo-200",
    };
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const filteredData = fineData.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      item.memberName.toLowerCase().includes(search) ||
      item.bookTitle.toLowerCase().includes(search) ||
      item.author.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search)
    );
  });

  const totalFines = filteredData.reduce((sum, item) => sum + item.fine, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 font-['Poppins']">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl hover:bg-white/30 transition-all text-white"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              Transaksi Denda
            </h1>
            <p className="text-white/90 text-sm mt-1">
              Kelola data denda peminjaman buku
            </p>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-6 mb-6 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-400/20 rounded-xl">
              <AlertCircle className="text-red-300" size={32} />
            </div>
            <div>
              <p className="text-white/80 text-sm">Total Transaksi Denda</p>
              <p className="text-3xl font-bold text-white">
                {filteredData.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-400/20 rounded-xl">
              <DollarSign className="text-yellow-300" size={32} />
            </div>
            <div>
              <p className="text-white/80 text-sm">Total Denda</p>
              <p className="text-3xl font-bold text-white">
                Rp {totalFines.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-400/20 rounded-xl">
              <CheckCircle className="text-green-300" size={32} />
            </div>
            <div>
              <p className="text-white/80 text-sm">Sudah Dibayar</p>
              <p className="text-3xl font-bold text-white">
                {filteredData.filter((f) => f.status === "Dikembalikan").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-6 mb-6 shadow-2xl">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70"
          />
          <input
            type="text"
            placeholder="Cari berdasarkan nama member, judul buku, penulis, atau kategori..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/10 border border-white/30 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-white transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-white text-lg">Loading...</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto text-white/50 mb-4" size={48} />
            <p className="text-white text-lg">Tidak ada data denda</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/10 border-b border-white/20">
                  <th className="px-6 py-4 text-left text-white font-bold text-sm">
                    No
                  </th>
                  <th className="px-6 py-4 text-left text-white font-bold text-sm">
                    Nama Member
                  </th>
                  <th className="px-6 py-4 text-left text-white font-bold text-sm">
                    Judul Buku
                  </th>
                  <th className="px-6 py-4 text-left text-white font-bold text-sm">
                    Penulis
                  </th>
                  <th className="px-6 py-4 text-left text-white font-bold text-sm">
                    Kategori
                  </th>
                  <th className="px-6 py-4 text-left text-white font-bold text-sm">
                    Tanggal Pinjam
                  </th>
                  <th className="px-6 py-4 text-left text-white font-bold text-sm">
                    Jatuh Tempo
                  </th>
                  <th className="px-6 py-4 text-left text-white font-bold text-sm">
                    Tanggal Kembali
                  </th>
                  <th className="px-6 py-4 text-left text-white font-bold text-sm">
                    Denda
                  </th>
                  <th className="px-6 py-4 text-left text-white font-bold text-sm">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-white">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-white/70" />
                        <span className="text-white font-medium">
                          {item.memberName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <BookOpen size={16} className="text-white/70" />
                        <span className="text-white">{item.bookTitle}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white">{item.author}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getCategoryColor(
                          item.category
                        )}`}
                      >
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-white/70" />
                        <span className="text-white">{item.borrowDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-white/70" />
                        <span className="text-white">{item.dueDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-white/70" />
                        <span className="text-white">
                          {item.returnDate || "-"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-red-300 font-bold">
                        Rp {item.fine.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          item.status === "Dikembalikan"
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransaksiDenda;
