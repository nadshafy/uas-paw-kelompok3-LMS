import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import {
  Search,
  Save,
  Trash2,
  ArrowLeft,
  Eye,
  User,
  BookOpen,
  Calendar,
  FileText,
  Plus,
  X, 
} from "lucide-react";
import { BorrowingService, BookService, API_BASE_URL } from "../services/api";

const PeminjamanBuku = () => {
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);

  const [formData, setFormData] = useState({
    member_id: "",
    book_id: "",
    borrow_date: "",
    due_date: "",
  });

  const [loanData, setLoanData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Load data from backend API
  useEffect(() => {
    loadBorrowings();
    loadBooks();
  }, []);

  const loadBorrowings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/borrowings`);
      const data = await response.json();
      
      if (data.borrowings) {
        setLoanData(data.borrowings);
      }
    } catch (error) {
      console.error("Error loading borrowings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadBooks = async () => {
    try {
      const result = await BookService.getAll();
      if (result.success) {
        setBooks(result.data.books);
      }
    } catch (error) {
      console.error("Error loading books:", error);
    }
  };

  // --- HANDLERS ---

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.member_id || !formData.book_id || !formData.borrow_date || !formData.due_date) {
      alert("Semua field wajib diisi!");
      return;
    }

    try {
      const response = await BorrowingService.create({
        member_id: parseInt(formData.member_id),
        book_id: parseInt(formData.book_id),
        borrow_date: formData.borrow_date,
        due_date: formData.due_date,
      });

      if (response.success) {
        alert("Data peminjaman berhasil ditambahkan!");
        setIsFormOpen(false);
        setFormData({
          member_id: "",
          book_id: "",
          borrow_date: "",
          due_date: "",
        });
        loadBorrowings(); // Reload data
      } else {
        alert(response.message || "Gagal menambahkan peminjaman");
      }
    } catch (error) {
      console.error("Error creating borrowing:", error);
      alert("Terjadi kesalahan saat menambahkan peminjaman");
    }
  };

  const handleDelete = async (idToDelete) => {
    if (
      window.confirm("Apakah Anda yakin ingin menghapus data transaksi ini?")
    ) {
      try {
        const response = await BorrowingService.delete(idToDelete);
        if (response.success) {
          alert("Data berhasil dihapus!");
          loadBorrowings(); // Reload data
        } else {
          alert(response.message || "Gagal menghapus data");
        }
      } catch (error) {
        console.error("Error deleting borrowing:", error);
        alert("Terjadi kesalahan saat menghapus data");
      }
    }
  };

  const handleReturn = async (id) => {
    if (window.confirm("Tandai buku sebagai dikembalikan?")) {
      try {
        const response = await BorrowingService.returnBook(id, {
          return_date: new Date().toISOString().split('T')[0]
        });
        if (response.success) {
          alert("Buku berhasil dikembalikan!");
          loadBorrowings(); // Reload data
        } else {
          alert(response.message || "Gagal mengembalikan buku");
        }
      } catch (error) {
        console.error("Error returning book:", error);
        alert("Terjadi kesalahan saat mengembalikan buku");
      }
    }
  };

  const handleDetail = (item) => {
    navigate("/peminjaman/detail", { state: item });
  };

  const filteredData = loanData.filter(
    (item) =>
      (item.book_title && item.book_title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.member_name && item.member_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.id && item.id.toString().includes(searchTerm)) ||
      (item.borrow_date && item.borrow_date.includes(searchTerm))
  );

  return (
    <div className="min-h-screen p-8 space-y-8 font-['Poppins'] bg-gradient-to-br from-indigo-900 via-blue-500 to-amber-400">
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="p-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl hover:bg-white/30 transition-all text-white"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white drop-shadow-md">
              Halaman Peminjaman
            </h1>
            <p className="text-white/80 text-sm mt-1">
              Sistem Management Perpustakaan
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all shadow-lg ${
            isFormOpen
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isFormOpen ? <X size={20} /> : <Plus size={20} />}
          {isFormOpen ? "Tutup Form" : "Tambah Peminjaman"}
        </button>
      </div>

      {/* --- FORM SECTION --- */}
      {isFormOpen && (
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-8 shadow-2xl animate-in slide-in-from-top-5 duration-300">
          <h2 className="text-3xl font-bold text-white text-center mb-8 drop-shadow-md">
            FORM TRANSAKSI BARU
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="space-y-2">
              <label className="text-white font-medium ml-1">
                Nama Peminjam
                Member ID
              </label>
              <div className="relative group">
                <User
                  className="absolute left-4 top-3.5 text-white/70"
                  size={20}
                />
                <input
                  type="number"
                  name="member_id"
                  value={formData.member_id}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/30 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-white transition-all"
                  placeholder="ID Anggota"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white font-medium ml-1">
                Buku
              </label>
              <div className="relative group">
                <BookOpen
                  className="absolute left-4 top-3.5 text-white/70"
                  size={20}
                />
                <select
                  name="book_id"
                  value={formData.book_id}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/30 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:bg-white/20 focus:border-white transition-all"
                  required
                >
                  <option value="" className="bg-gray-800">Pilih Buku</option>
                  {books.map((book) => (
                    <option key={book.id} value={book.id} className="bg-gray-800">
                      {book.title} (Stock: {book.stock})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white font-medium ml-1">
                Tanggal Peminjaman
              </label>
              <div className="relative group">
                <Calendar
                  className="absolute left-4 top-3.5 text-white/70"
                  size={20}
                />
                <input
                  type="date"
                  name="borrow_date"
                  value={formData.borrow_date}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/30 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-white transition-all [color-scheme:dark]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white font-medium ml-1">
                Tanggal Jatuh Tempo
              </label>
              <div className="relative group">
                <Calendar
                  className="absolute left-4 top-3.5 text-white/70"
                  size={20}
                />
                <input
                  type="date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/30 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-white transition-all [color-scheme:dark]"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-white font-medium ml-1">
                Kode Transaksi
              </label>
              <div className="relative group">
                <FileText
                  className="absolute left-4 top-3.5 text-white/70"
                  size={20}
                />
                <input
                  type="text"
                  name="kodeTransaksi"
                  value={formData.kodeTransaksi}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/30 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-white transition-all"
                  placeholder="Contoh: TRX-001 (Kosongkan untuk auto-generate)"
                />
              </div>
            </div>

            <div className="md:col-span-2 pt-4">
              <button
                type="submit"
                className="w-full md:w-auto px-10 py-3 bg-white/90 text-indigo-900 font-bold rounded-xl hover:bg-white hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Save size={20} />
                Simpan Transaksi
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- TABLE SECTION --- */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white text-center drop-shadow-md">
          DATA PEMINJAMAN
        </h2>

        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80"
          />
          <input
            type="text"
            placeholder="Cari berdasarkan Kode TRX, Nama, atau Judul..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/10 backdrop-blur-md text-white placeholder-white/70 border border-white/30 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all outline-none"
          />
        </div>

        <div className="relative overflow-x-auto rounded-xl shadow-2xl bg-white">
          <table className="min-w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-100 text-gray-800 uppercase font-bold border-b-2 border-gray-300">
              <tr>
                <th className="px-6 py-4">No</th>
                <th className="px-6 py-4">Kode TRX</th>
                <th className="px-6 py-4">Peminjam</th>
                <th className="px-6 py-4">Judul</th>
                <th className="px-6 py-4">Tgl Pinjam</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                    <td className="px-6 py-4 font-mono text-xs text-blue-600 font-bold bg-blue-50 w-fit rounded-md px-2 py-1">
                      TRX-{item.id}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {item.member_name || `Member #${item.member_id}`}
                    </td>
                    <td className="px-6 py-4 text-gray-800 italic">
                      {item.book_title || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium">
                      {item.borrow_date}
                    </td>

                    {/* KOLOM STATUS */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          item.return_date
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                        }`}
                      >
                        {item.return_date ? "Dikembalikan" : "Dipinjam"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleDetail(item)}
                          className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors shadow-sm"
                          title="Lihat Detail"
                        >
                          <Eye size={18} />
                        </button>

                        {!item.return_date && (
                          <button
                            onClick={() => handleReturn(item.id)}
                            className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-colors shadow-sm"
                            title="Kembalikan Buku"
                          >
                            <Save size={18} />
                          </button>
                        )}

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
                    className="px-6 py-12 text-center text-gray-500 italic"
                  >
                    Belum ada data transaksi peminjaman.
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

export default PeminjamanBuku;
 