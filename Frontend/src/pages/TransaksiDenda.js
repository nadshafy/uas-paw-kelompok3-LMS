import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
=======
// Import Service dari file api kamu
import { BorrowingService } from "../services/api"; 
>>>>>>> backend_update
import {
  ArrowLeft,
  Search,
  Eye,
  Trash2,
  AlertCircle,
  Banknote,
  TrendingUp,
  FileWarning,
} from "lucide-react";

const TransaksiDenda = () => {
  const navigate = useNavigate();
  const [dendaData, setDendaData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
<<<<<<< HEAD

  useEffect(() => {
    const savedData = localStorage.getItem("borrowedBooks");
    if (savedData) {
      const parsedData = JSON.parse(savedData);

      const onlyDenda = parsedData.filter(
        (item) => item.denda && item.denda > 0
      );

      const sortedData = onlyDenda.sort((a, b) => b.id - a.id);

      setDendaData(sortedData);
    }
  }, []);

  // 2. HITUNG TOTAL NOMINAL DENDA (Statistik Ringan)
=======
  const [loading, setLoading] = useState(true); // Opsional: untuk status loading

  // 1. AMBIL DATA DARI BACKEND
  useEffect(() => {
    fetchDendaData();
  }, []);

  const fetchDendaData = async () => {
    setLoading(true);
    // Mengambil semua data peminjaman
    const response = await BorrowingService.getAll();
    
    if (response.success) {
      // Filter data yang hanya memiliki denda > 0
      // Catatan: Sesuaikan field 'denda' dengan key yang dikirim backend (misal: item.denda atau item.fine)
      const onlyDenda = response.data.borrowings.filter(
        (item) => item.denda && item.denda > 0
      );

      // Urutkan berdasarkan ID terbaru
      const sortedData = onlyDenda.sort((a, b) => b.id - a.id);
      setDendaData(sortedData);
    } else {
      console.error("Gagal mengambil data denda:", response.error);
    }
    setLoading(false);
  };

  // 2. HITUNG TOTAL NOMINAL DENDA
>>>>>>> backend_update
  const totalNominal = dendaData.reduce(
    (acc, curr) => acc + (parseInt(curr.denda) || 0),
    0
  );

<<<<<<< HEAD
  // 3. FITUR HAPUS
  const handleDelete = (id) => {
    if (
      window.confirm(
        "Hapus riwayat denda ini? Data peminjaman asli juga akan terhapus."
      )
    ) {
      const allData = JSON.parse(localStorage.getItem("borrowedBooks"));

      const newData = allData.filter((item) => item.id !== id);

      localStorage.setItem("borrowedBooks", JSON.stringify(newData));

      setDendaData(dendaData.filter((item) => item.id !== id));
    }
  };

  // 4. FILTER PENCARIAN
  const filteredData = dendaData.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kodeTransaksi.toLowerCase().includes(searchTerm.toLowerCase())
=======
  // 3. FITUR HAPUS (Koneksi ke Backend)
  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Hapus riwayat denda ini? Data peminjaman di database juga akan terhapus."
      )
    ) {
      const response = await BorrowingService.delete(id);
      
      if (response.success) {
        // Update state lokal setelah berhasil hapus di server
        setDendaData(dendaData.filter((item) => item.id !== id));
      } else {
        alert("Gagal menghapus data: " + response.error);
      }
    }
  };

  // 4. FILTER PENCARIAN (Tetap dilakukan di sisi frontend untuk kecepatan)
  const filteredData = dendaData.filter(
    (item) =>
      (item.user_name || item.nama || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.book_title || item.judul || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.id.toString()).includes(searchTerm)
>>>>>>> backend_update
  );

  return (
    <div className="min-h-screen p-8 space-y-8 font-['Poppins'] bg-gradient-to-br from-indigo-900 via-blue-500 to-amber-400">
      {/* --- HEADER --- */}
      <div className="flex items-center gap-4">
        <button
<<<<<<< HEAD
          onClick={() => window.history.back()}
=======
          onClick={() => navigate(-1)}
>>>>>>> backend_update
          className="p-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl hover:bg-white/30 transition-all text-white"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-white drop-shadow-md">
            Riwayat Denda
          </h1>
          <p className="text-white/80 text-sm mt-1">
<<<<<<< HEAD
            Daftar anggota yang terkena sanksi keterlambatan
=======
            Daftar anggota yang terkena sanksi keterlambatan (Backend Connected)
>>>>>>> backend_update
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Total Kasus */}
        <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-2xl flex items-center gap-4 text-white shadow-lg">
          <div className="p-4 bg-red-500/30 rounded-xl text-red-100">
            <FileWarning size={32} />
          </div>
          <div>
            <p className="text-sm opacity-80">Total Kasus Denda</p>
            <h3 className="text-3xl font-bold">{dendaData.length}</h3>
          </div>
        </div>

        {/* Card 2: Total Uang */}
        <div className="bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-2xl flex items-center gap-4 text-white shadow-lg">
          <div className="p-4 bg-green-500/30 rounded-xl text-green-100">
            <TrendingUp size={32} />
          </div>
          <div>
            <p className="text-sm opacity-80">Total Pendapatan Denda</p>
            <h3 className="text-3xl font-bold">
              Rp {totalNominal.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>

      {/* --- TABEL DATA --- */}
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80"
          />
          <input
            type="text"
<<<<<<< HEAD
            placeholder="Cari Nama, Judul, atau Kode TRX..."
=======
            placeholder="Cari Nama, Judul, atau ID Transaksi..."
>>>>>>> backend_update
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/10 backdrop-blur-md text-white placeholder-white/70 border border-white/30 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all outline-none"
          />
        </div>

        {/* Table Container */}
        <div className="relative overflow-x-auto rounded-xl shadow-2xl bg-white">
          <table className="min-w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-100 text-gray-800 uppercase font-bold border-b-2 border-gray-300">
              <tr>
                <th className="px-6 py-4">No</th>
                <th className="px-6 py-4">Peminjam</th>
                <th className="px-6 py-4">Buku / Judul</th>
                <th className="px-6 py-4">Tgl Kembali</th>
                <th className="px-6 py-4">Nominal Denda</th>
                <th className="px-6 py-4">Catatan</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
<<<<<<< HEAD
              {filteredData.length > 0 ? (
=======
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">Loading data...</td>
                </tr>
              ) : filteredData.length > 0 ? (
>>>>>>> backend_update
                filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-red-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium">{index + 1}</td>

                    <td className="px-6 py-4">
<<<<<<< HEAD
                      <p className="font-bold text-gray-800">{item.nama}</p>
                      <p className="text-xs text-blue-500 font-mono">
                        {item.kodeTransaksi}
=======
                      {/* Menggunakan user_name dari backend atau nama dari state lama */}
                      <p className="font-bold text-gray-800">{item.user_name || item.nama}</p>
                      <p className="text-xs text-blue-500 font-mono">
                        TRX-{item.id}
>>>>>>> backend_update
                      </p>
                    </td>

                    <td className="px-6 py-4 text-gray-700 italic">
<<<<<<< HEAD
                      {item.judul}
=======
                      {item.book_title || item.judul}
>>>>>>> backend_update
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400">
<<<<<<< HEAD
                          Batas: {item.tglKembali}
                        </span>
                        <span className="font-bold text-gray-800">
                          Aktual: {item.tglDikembalikan || "-"}
=======
                          Batas: {item.due_date || item.tglKembali}
                        </span>
                        <span className="font-bold text-gray-800">
                          Aktual: {item.return_date || item.tglDikembalikan || "-"}
>>>>>>> backend_update
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-red-600 font-bold bg-red-100 px-3 py-1 rounded-full w-fit">
                        <Banknote size={16} />
                        Rp {item.denda.toLocaleString()}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-xs text-gray-500 max-w-xs truncate">
<<<<<<< HEAD
                      {item.catatan || "-"}
=======
                      {item.status === 'overdue' ? "Terlambat" : (item.catatan || "-")}
>>>>>>> backend_update
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            navigate("/peminjaman/detail", { state: item })
                          }
                          className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors shadow-sm"
                          title="Lihat Detail Transaksi"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors shadow-sm"
                          title="Hapus Data"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center opacity-50">
                      <AlertCircle size={48} className="mb-2 text-green-500" />
                      <p className="font-medium text-lg">
                        Tidak ada data denda.
                      </p>
                      <p className="text-sm">Semua anggota disiplin!</p>
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

<<<<<<< HEAD
export default TransaksiDenda;
=======
export default TransaksiDenda;
>>>>>>> backend_update
