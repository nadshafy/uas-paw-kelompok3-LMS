import React, { useState, useEffect } from "react"; // 1. Tambah useEffect
import { useNavigate } from "react-router-dom";
import {
  Search,
  Save,
  Trash2,
  ArrowLeft,
  Eye,
  User,
  Phone,
  Hash,
  BookOpen,
  Layers,
  Calendar,
  FileText,
  Plus,
  X, // 2. Tambah Icon Plus dan X
} from "lucide-react";

const PeminjamanBuku = () => {
  const navigate = useNavigate();

  // 3. STATE TOGGLE FORM (Default False/Sembunyi)
  const [isFormOpen, setIsFormOpen] = useState(false);

  // STATE FORM
  const [formData, setFormData] = useState({
    nama: "",
    noTelp: "",
    isbn: "",
    pengarang: "",
    judul: "",
    kategori: "",
    tglPinjam: "",
    tglKembali: "",
    kodeTransaksi: "",
  });

  // 4. STATE DATA TABEL (Disesuaikan agar baca LocalStorage)
  const [loanData, setLoanData] = useState(() => {
    const savedData = localStorage.getItem("borrowedBooks");
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      // Data Dummy Awal (Jika localStorage kosong)
      return [
        {
          id: 1,
          kodeTransaksi: "TRX-1702025001",
          nama: "Budi Santoso",
          isbn: "978-6028519943",
          judul: "Atomic Habits",
          kategori: "Pengembangan Diri",
          pengarang: "James Clear",
          tglPinjam: "2025-12-10",
          tglKembali: "2025-12-17",
          noTelp: "08123456789",
          status: "Dipinjam",
        },
        {
          id: 2,
          kodeTransaksi: "TRX-1702025002",
          nama: "Siti Aminah",
          isbn: "978-0743273565",
          judul: "The Great Gatsby",
          kategori: "Fiksi",
          pengarang: "F. Scott Fitzgerald",
          tglPinjam: "2025-12-11",
          tglKembali: "2025-12-18",
          noTelp: "08987654321",
          status: "Dikembalikan",
        },
      ];
    }
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("borrowedBooks", JSON.stringify(loanData));
  }, [loanData]);

  // --- HANDLERS ---

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.judul || !formData.isbn || !formData.nama) {
      alert("Mohon lengkapi Nama Peminjam, Judul, dan ISBN!");
      return;
    }

    const newLoan = {
      id: Date.now(),
      kodeTransaksi: formData.kodeTransaksi || `TRX-${Date.now()}`,
      nama: formData.nama,
      noTelp: formData.noTelp || "-",
      isbn: formData.isbn,
      judul: formData.judul,
      kategori: formData.kategori || "-",
      pengarang: formData.pengarang || "-",
      tglPinjam: formData.tglPinjam || new Date().toISOString().split("T")[0],
      tglKembali: formData.tglKembali || "-",
      status: "Dipinjam",
    };

    setLoanData([newLoan, ...loanData]);

    setFormData({
      nama: "",
      noTelp: "",
      isbn: "",
      pengarang: "",
      judul: "",
      kategori: "",
      tglPinjam: "",
      tglKembali: "",
      kodeTransaksi: "",
    });

    setIsFormOpen(false);
    alert("Transaksi Peminjaman Berhasil Disimpan!");
  };

  const handleDelete = (idToDelete) => {
    if (
      window.confirm("Apakah Anda yakin ingin menghapus data transaksi ini?")
    ) {
      setLoanData(loanData.filter((item) => item.id !== idToDelete));
    }
  };

  const handleDetail = (item) => {
    navigate("/peminjaman/detail", { state: item });
  };

  const filteredData = loanData.filter(
    (item) =>
      item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kodeTransaksi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.isbn.includes(searchTerm)
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
              </label>
              <div className="relative group">
                <User
                  className="absolute left-4 top-3.5 text-white/70"
                  size={20}
                />
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/30 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-white transition-all"
                  placeholder="Nama Lengkap Anggota"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white font-medium ml-1">
                Nomor Telepon
              </label>
              <div className="relative group">
                <Phone
                  className="absolute left-4 top-3.5 text-white/70"
                  size={20}
                />
                <input
                  type="text"
                  name="noTelp"
                  value={formData.noTelp}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/30 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-white transition-all"
                  placeholder="08xxxxxxxx"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white font-medium ml-1">ISBN</label>
              <div className="relative group">
                <Hash
                  className="absolute left-4 top-3.5 text-white/70"
                  size={20}
                />
                <input
                  type="text"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/30 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-white transition-all"
                  placeholder="Scan / Ketik ISBN"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white font-medium ml-1">Pengarang</label>
              <div className="relative group">
                <User
                  className="absolute left-4 top-3.5 text-white/70"
                  size={20}
                />
                <input
                  type="text"
                  name="pengarang"
                  value={formData.pengarang}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/30 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-white transition-all"
                  placeholder="Nama Pengarang"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white font-medium ml-1">Judul Buku</label>
              <div className="relative group">
                <BookOpen
                  className="absolute left-4 top-3.5 text-white/70"
                  size={20}
                />
                <input
                  type="text"
                  name="judul"
                  value={formData.judul}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/30 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-white transition-all"
                  placeholder="Judul Buku"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white font-medium ml-1">Kategori</label>
              <div className="relative group">
                <Layers
                  className="absolute left-4 top-3.5 text-white/70"
                  size={20}
                />
                <input
                  type="text"
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/30 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-white transition-all"
                  placeholder="Fiksi / Sains / dll"
                />
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
                  name="tglPinjam"
                  value={formData.tglPinjam}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/30 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-white transition-all [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white font-medium ml-1">
                Tanggal Pengembalian
              </label>
              <div className="relative group">
                <Calendar
                  className="absolute left-4 top-3.5 text-white/70"
                  size={20}
                />
                <input
                  type="date"
                  name="tglKembali"
                  value={formData.tglKembali}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/30 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-white transition-all [color-scheme:dark]"
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
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                    <td className="px-6 py-4 font-mono text-xs text-blue-600 font-bold bg-blue-50 w-fit rounded-md px-2 py-1">
                      {item.kodeTransaksi}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {item.nama}
                    </td>
                    <td className="px-6 py-4 text-gray-800 italic">
                      {item.judul}
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium">
                      {item.tglPinjam}
                    </td>

                    {/* KOLOM STATUS */}
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

                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleDetail(item)}
                          className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors shadow-sm"
                          title="Lihat Detail"
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
