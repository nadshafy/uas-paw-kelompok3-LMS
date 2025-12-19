<<<<<<< HEAD
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, CheckCircle, XCircle } from "lucide-react";

const BookDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // MENGAMBIL DATA DARI DASHBOARD
  const book = location.state || {
    title: "Judul Tidak Ditemukan",
    author: "-",
    category: "Umum",
    color: "bg-gray-400"
  };

  const isAvailable = true; 

  // FUNGSI PEMINJAMAN BUKU 
  const handleBorrow = () => {
    const existingHistory = JSON.parse(localStorage.getItem("memberHistory")) || [];
    const activeLoansCount = existingHistory.filter(item => item.status === "Dipinjam").length;

    if (activeLoansCount >= 3) {
      alert("PEMINJAMAN DITOLAK!\n\nAnda sedang meminjam 3 buku. Harap kembalikan salah satu buku terlebih dahulu sebelum meminjam yang baru.");
      return; // Menghentikan peminjaman karena sudah 3 kali meminjam 
    }

    const newLoan = {
      id: Date.now(), 
      title: book.title,
      author: book.author,
      category: book.category,
      coverColor: book.color,
      borrowDate: new Date().toLocaleDateString('id-ID'), // Tanggal Hari Ini
      returnDate: "-", // Belum dikembalikan
      status: "Dipinjam"
    };

    const updatedHistory = [newLoan, ...existingHistory];
    localStorage.setItem("memberHistory", JSON.stringify(updatedHistory));

    alert(`Berhasil meminjam buku "${book.title}"!`);
    navigate("/member/myborrows");
=======
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, CheckCircle, XCircle } from "lucide-react";
import { BookService, BorrowingService } from "../services/api";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const result = await BookService.getById(id);

      if (!result.success) {
        setError(result.error);
        setLoading(false);
        return;
      }

      const raw = result.data.book;

      if (!raw) {
        setError("Data buku tidak ditemukan");
        setLoading(false);
        return;
      }

      setBook({
        id: raw.id,
        title: raw.title || "-",
        stock: Number(raw.stock ?? 0),
        description: raw.description || "-",
        authorName: raw.author || "-",
        categoryName: raw.category || "-",
      });

      setLoading(false);
    };

    fetchBook();
  }, [id]);


  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (error || !book) {
    return (
      <div className="p-10 text-center text-red-500">
        {error || "Data tidak ditemukan"}
      </div>
    );
  }

  const isAvailable = book.stock > 0;

  const handleBorrow = async () => {
    const result = await BorrowingService.create({
      book_id: book.id,
    });

    if (!result.success) {
      alert(result.error || "Gagal meminjam buku");
      return;
    }

    alert(`Berhasil meminjam buku "${book.title}"`);
    navigate("/DashboardMember");
>>>>>>> backend_update
  };

  return (
    <div className="min-h-screen w-full font-['Poppins'] text-gray-800 p-8 md:p-12 bg-gradient-to-br from-green-100 via-white to-emerald-200">
<<<<<<< HEAD
      
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <button 
=======
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <button
>>>>>>> backend_update
            onClick={() => navigate(-1)}
            className="p-3 bg-white/60 backdrop-blur-md border border-white/50 rounded-xl hover:bg-white/80 transition-all text-emerald-800 shadow-sm"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
<<<<<<< HEAD
            <h1 className="text-2xl font-bold text-gray-900 drop-shadow-sm">Perpustakaan FRAND</h1>
            <p className="text-sm text-emerald-700 font-medium">Detail Koleksi</p>
=======
            <h1 className="text-2xl font-bold text-gray-900 drop-shadow-sm">
              Perpustakaan FRAND
            </h1>
            <p className="text-sm text-emerald-700 font-medium">
              Detail Koleksi
            </p>
>>>>>>> backend_update
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto mt-4">
<<<<<<< HEAD
        
        <div className="flex flex-col items-center">
          <div className={`w-full aspect-[3/4] ${book.color} rounded-3xl shadow-2xl flex items-center justify-center mb-6 relative overflow-hidden group border-4 border-white/30`}>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50"></div>
            
            <div className="text-white text-center relative z-10">
              <BookOpen size={80} className="mx-auto mb-4 opacity-90 drop-shadow-md"/>
              <span className="text-2xl font-black uppercase tracking-widest opacity-95 block px-4 drop-shadow-sm">
                {book.category}
              </span>
            </div>
          </div>
          <p className="text-lg font-bold text-emerald-800 tracking-wide">SAMPUL BUKU</p>
=======
        <div className="flex flex-col items-center">
          <div className="w-full aspect-[3/4] bg-emerald-500 rounded-3xl shadow-2xl flex items-center justify-center mb-6 relative overflow-hidden group border-4 border-white/30">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50"></div>
            <div className="text-white text-center relative z-10">
              <BookOpen size={80} className="mx-auto mb-4 opacity-90 drop-shadow-md" />
              <span className="text-2xl font-black uppercase tracking-widest opacity-95 block px-4 drop-shadow-sm">
                {book.categoryName}
              </span>
            </div>
          </div>
          <p className="text-lg font-bold text-emerald-800 tracking-wide">
            SAMPUL BUKU
          </p>
>>>>>>> backend_update
        </div>

        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2 uppercase leading-tight drop-shadow-sm">
              {book.title}
            </h2>
            <p className="text-lg text-gray-500 font-medium">
<<<<<<< HEAD
              Pengarang : <span className="text-emerald-700 font-bold">{book.author}</span>
            </p>
          </div>

          {/* Tabel Informasi*/}
          <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl overflow-hidden shadow-lg">
            <table className="w-full text-left">
              <tbody className="divide-y divide-emerald-100/50">
                {[
                  { label: "Edisi", value: "Cetakan Pertama, 2024" },
                  { label: "Penerbit", value: "Gramedia Pustaka Utama" },
                  { label: "Deskripsi Fisik", value: "xi, 320 halaman; 21 cm" },
                  { label: "ISBN", value: "978-602-03-1234-5" },
                  { label: "Subjek", value: `${book.category}, Fiksi Umum` },
                  { label: "Bahasa", value: "Indonesia" },
                  { label: "Call Number", value: "813.54 CLE a" },
                ].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white/20" : "bg-transparent"}>
                    <td className="py-4 px-6 w-1/3 font-semibold text-gray-600 border-r border-emerald-100/50">
                      {row.label}
                    </td>
                    <td className="py-4 px-6 text-gray-800 font-medium">
                      {row.value}
                    </td>
                  </tr>
                ))}
=======
              Pengarang :{" "}
              <span className="text-emerald-700 font-bold">
                {book.authorName}
              </span>
            </p>
          </div>

          <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl overflow-hidden shadow-lg">
            <table className="w-full text-left">
              <tbody className="divide-y divide-emerald-100/50">
                <tr>
                  <td className="py-4 px-6 w-1/3 font-semibold text-gray-600 border-r">
                    Kategori
                  </td>
                  <td className="py-4 px-6 text-gray-800 font-medium">
                    {book.categoryName}
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 w-1/3 font-semibold text-gray-600 border-r">
                    Stok
                  </td>
                  <td className="py-4 px-6 text-gray-800 font-medium">
                    {book.stock}
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 w-1/3 font-semibold text-gray-600 border-r">
                    Deskripsi
                  </td>
                  <td className="py-4 px-6 text-gray-800 font-medium">
                    {book.description}
                  </td>
                </tr>
>>>>>>> backend_update
              </tbody>
            </table>
          </div>

<<<<<<< HEAD
          {/* Status Buku */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-gray-900">Status Buku</h3>
            <div className="bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl p-5 flex items-center justify-between shadow-md">
              
              {/* Indikator Dapat Dipinjam */}
              <div className="flex items-center gap-3">
                <span className={`font-bold ${isAvailable ? "text-emerald-800" : "text-gray-400"}`}>
                  Dapat Dipinjam
                </span>
                {isAvailable ? (
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-sm">
                    <CheckCircle size={20} className="text-white" />
                  </div> 
                ) : (
                  <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                )}
              </div>

              {/* Indikator Sedang Dipinjam */}
              <div className="flex items-center gap-3">
                <span className={`font-bold ${!isAvailable ? "text-emerald-800" : "text-gray-400"}`}>
                  Sedang Dipinjam
                </span>
                {!isAvailable ? (
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center shadow-sm">
                    <XCircle size={20} className="text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-gray-200 rounded-lg border border-gray-300"></div>
                )}
              </div>

            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="space-y-4 pt-4">
            <button 
              className={`w-full py-4 text-lg font-bold text-white rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 ${
                isAvailable 
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500" 
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isAvailable}
              onClick={handleBorrow} 
=======
          <div className="space-y-4 pt-4">
            <button
              className={`w-full py-4 text-lg font-bold text-white rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 ${
                isAvailable
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isAvailable}
              onClick={handleBorrow}
>>>>>>> backend_update
            >
              <BookOpen size={24} />
              PINJAM BUKU INI
            </button>
<<<<<<< HEAD
            
            {!isAvailable && (
              <p className="text-center text-red-500 font-medium animate-pulse bg-red-100/50 py-2 rounded-lg">
=======

            {!isAvailable && (
              <p className="text-center text-red-500 font-medium bg-red-100/50 py-2 rounded-lg">
>>>>>>> backend_update
                Maaf, stok buku ini sedang kosong atau sudah dipinjam semua.
              </p>
            )}
          </div>
<<<<<<< HEAD

        </div>
      </div>

=======
        </div>
      </div>
>>>>>>> backend_update
    </div>
  );
};

<<<<<<< HEAD
export default BookDetail;
=======
export default BookDetail;
>>>>>>> backend_update
