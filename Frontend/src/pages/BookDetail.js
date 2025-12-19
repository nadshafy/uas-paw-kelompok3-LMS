import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Calendar, X } from "lucide-react";
import { BookService, BorrowingService } from "../services/api";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBorrowForm, setShowBorrowForm] = useState(false);
  const [borrowDate, setBorrowDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    // Set default dates
    const today = new Date();
    setBorrowDate(today.toISOString().split('T')[0]);
    const defaultDue = new Date(today);
    defaultDue.setDate(today.getDate() + 7); // Default 7 days
    setDueDate(defaultDue.toISOString().split('T')[0]);

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

  const handleBorrowClick = () => {
    setShowBorrowForm(true);
  };

  const handleConfirmBorrow = async () => {
    const result = await BorrowingService.create({
      book_id: book.id,
      borrow_date: borrowDate,
      due_date: dueDate,
    });

    if (!result.success) {
      alert(result.error || "Gagal meminjam buku");
      return;
    }

    alert(`Berhasil meminjam buku "${book.title}" sampai ${dueDate}`);
    navigate("/dashboard-member");
  };

  return (
    <div className="min-h-screen w-full font-['Poppins'] text-gray-800 p-8 md:p-12 bg-gradient-to-br from-green-100 via-white to-emerald-200">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white/60 backdrop-blur-md border border-white/50 rounded-xl hover:bg-white/80 transition-all text-emerald-800 shadow-sm"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 drop-shadow-sm">
              Perpustakaan FRAND
            </h1>
            <p className="text-sm text-emerald-700 font-medium">
              Detail Koleksi
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto mt-4">
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
        </div>

        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2 uppercase leading-tight drop-shadow-sm">
              {book.title}
            </h2>
            <p className="text-lg text-gray-500 font-medium">
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
              </tbody>
            </table>
          </div>

          <div className="space-y-4 pt-4">
            {!showBorrowForm ? (
              <>
                <button
                  className={`w-full py-4 text-lg font-bold text-white rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 ${
                    isAvailable
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!isAvailable}
                  onClick={handleBorrowClick}
                >
                  <BookOpen size={24} />
                  PINJAM BUKU INI
                </button>

                {!isAvailable && (
                  <p className="text-center text-red-500 font-medium bg-red-100/50 py-2 rounded-lg">
                    Maaf, stok buku ini sedang kosong atau sudah dipinjam semua.
                  </p>
                )}
              </>
            ) : (
              <div className="bg-white/60 backdrop-blur-md border-2 border-emerald-200 rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Konfirmasi Peminjaman</h3>
                  <button
                    onClick={() => setShowBorrowForm(false)}
                    className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <X size={20} className="text-red-600" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Calendar size={16} className="inline mr-2" />
                      Tanggal Pinjam
                    </label>
                    <input
                      type="date"
                      value={borrowDate}
                      onChange={(e) => setBorrowDate(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500 bg-white [color-scheme:light]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Calendar size={16} className="inline mr-2" />
                      Tanggal Harus Kembali
                    </label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      min={borrowDate}
                      className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:border-emerald-500 bg-white [color-scheme:light]"
                    />
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <p className="text-sm text-emerald-800">
                      <strong>Catatan:</strong> Keterlambatan pengembalian akan dikenakan denda Rp 1.000 per hari.
                    </p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setShowBorrowForm(false)}
                      className="flex-1 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleConfirmBorrow}
                      className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg"
                    >
                      Konfirmasi Pinjam
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;