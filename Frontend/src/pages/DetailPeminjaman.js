import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Banknote,
} from "lucide-react";
import { BorrowingService } from "../services/api";

const DetailPeminjaman = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const today = new Date().toISOString().split("T")[0];

  const [currentStatus, setCurrentStatus] = useState(
    data?.status || "Dipinjam"
  );
  const [savedDenda, setSavedDenda] = useState(data?.fine || 0);
  const [catatan, setCatatan] = useState(data?.catatan || "");
  const [tglInput, setTglInput] = useState(today);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-['Poppins']">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-700">
            Data Tidak Ditemukan
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const dueDate = data.due_date || data.tglKembali;

  let potentialDenda = 0;
  let terlambatHari = 0;

  if (tglInput > dueDate) {
    const tglKembaliAktual = new Date(tglInput);
    const tglBatas = new Date(dueDate);
    const selisihWaktu = tglKembaliAktual - tglBatas;
    terlambatHari = Math.ceil(selisihWaktu / (1000 * 60 * 60 * 24));
    potentialDenda = terlambatHari * 1000; // Rp 1.000 per hari
  }

  const displayDenda =
    currentStatus === "Dikembalikan" ? savedDenda : potentialDenda;

  const handleKembalikan = async () => {
    const confirmMessage =
      potentialDenda > 0
        ? `Pengembalian pada ${tglInput}. Terlambat ${terlambatHari} hari. Denda: Rp ${potentialDenda.toLocaleString()}. Lanjutkan?`
        : `Konfirmasi pengembalian buku pada tanggal ${tglInput}?`;

    if (window.confirm(confirmMessage)) {
      try {
        const response = await BorrowingService.returnBook(data.id, {
          return_date: tglInput,
        });

        if (response.success) {
          setCurrentStatus("Dikembalikan");
          setSavedDenda(potentialDenda);
          alert("Buku berhasil dikembalikan!");

          setTimeout(() => {
            navigate(-1);
          }, 1000);
        } else {
          alert(response.message || "Gagal mengembalikan buku");
        }
      } catch (error) {
        console.error("Error returning book:", error);
        alert("Terjadi kesalahan saat mengembalikan buku");
      }
    }
  };

  let statusLabel = currentStatus;
  let statusColor = "text-yellow-400";

  if (currentStatus === "Dikembalikan") {
    statusLabel = "Dikembalikan";
    statusColor = "text-green-400";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 font-['Poppins']">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl hover:bg-white/30 transition-all text-white"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white drop-shadow-md">
              Detail Transaksi
            </h1>
            <p className="text-white/80 text-sm">
              ID Transaksi:{" "}
              <span className="font-mono font-bold text-yellow-300">
                {data.id}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-8 shadow-2xl text-white">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 ${
                currentStatus === "Dikembalikan"
                  ? "bg-green-400/20"
                  : "bg-yellow-400/20"
              } rounded-lg`}
            >
              {currentStatus === "Dikembalikan" ? (
                <CheckCircle
                  className={statusColor}
                  size={28}
                />
              ) : (
                <Clock className={statusColor} size={28} />
              )}
            </div>
            <div>
              <p className="text-sm text-indigo-200">Status Peminjaman</p>
              <p className={`text-2xl font-bold ${statusColor}`}>
                {statusLabel}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h4 className="text-lg font-bold border-l-4 border-blue-400 pl-3 uppercase tracking-wider">
              Detail Peminjam
            </h4>
            <div className="flex items-start gap-4 bg-black/20 p-4 rounded-xl">
              <User className="text-blue-300 mt-1" size={24} />
              <div>
                <p className="text-xs text-indigo-200 uppercase">Nama Member</p>
                <p className="text-lg font-semibold">
                  {data.member_name || data.namaPeminjam || "-"}
                </p>
                <p className="text-sm text-white/60">
                  ID: {data.member_id || data.memberId || "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-bold border-l-4 border-blue-400 pl-3 uppercase tracking-wider">
              Detail Buku
            </h4>
            <div className="flex items-start gap-4 bg-black/20 p-4 rounded-xl">
              <BookOpen className="text-purple-300 mt-1" size={24} />
              <div>
                <p className="text-xs text-indigo-200 uppercase">Judul Buku</p>
                <p className="text-lg font-semibold">
                  {data.book_title || data.judul || "-"}
                </p>
                <p className="text-sm text-white/60">
                  Penulis: {data.author || data.penulis || "-"}
                </p>
                <p className="text-sm text-white/60">
                  Kategori: {data.category || data.kategori || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-black/20 rounded-xl p-6 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-400/20 rounded-lg">
                <Calendar className="text-blue-400" size={24} />
              </div>
              <div>
                <p className="text-xs text-indigo-200">Batas Waktu</p>
                <p className="text-lg font-bold text-white">
                  {data.due_date || data.tglKembali}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  currentStatus === "Dikembalikan"
                    ? "bg-green-400/20"
                    : "bg-gray-400/20"
                }`}
              >
                <CheckCircle
                  className={
                    currentStatus === "Dikembalikan"
                      ? "text-green-400"
                      : "text-gray-400"
                  }
                  size={24}
                />
              </div>
              <div>
                <p className="text-xs text-indigo-200">Dikembalikan Tanggal</p>
                <p className="text-lg font-bold text-white">
                  {currentStatus === "Dikembalikan"
                    ? data.return_date || data.tglDikembalikan || tglInput
                    : "-"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${
                  displayDenda > 0 ? "bg-red-400/20" : "bg-green-400/20"
                }`}
              >
                <Banknote
                  className={
                    displayDenda > 0 ? "text-red-400" : "text-green-400"
                  }
                  size={24}
                />
              </div>
              <div>
                <p className="text-xs text-indigo-200">Status Denda</p>
                <p
                  className={`text-lg font-bold ${
                    displayDenda > 0 ? "text-red-300" : "text-green-300"
                  }`}
                >
                  {displayDenda > 0
                    ? `Rp ${displayDenda.toLocaleString()} ${
                        currentStatus === "Dikembalikan" ? "(Lunas)" : ""
                      }`
                    : "Tidak Ada"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {currentStatus !== "Dikembalikan" && (
          <div className="mt-8 pt-6 border-t border-white/20">
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/10 border border-white/20 p-4 rounded-xl">
                <label className="block text-sm text-indigo-200 mb-2 font-semibold">
                  <Calendar size={16} className="inline mr-2" />
                  Tanggal Buku Dikembalikan
                </label>
                <input
                  type="date"
                  value={tglInput}
                  onChange={(e) => setTglInput(e.target.value)}
                  className="w-full bg-black/20 border border-white/30 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-white transition-all [color-scheme:dark]"
                />
                <p className="text-xs text-white/50 mt-2">
                  *Mengubah tanggal ini akan menghitung ulang denda secara
                  otomatis.
                </p>
              </div>

              {potentialDenda > 0 && (
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl">
                  <div className="flex items-start gap-2 mb-2">
                    <AlertCircle className="text-red-300 mt-1" size={16} />
                    <h4 className="font-bold text-red-200 text-sm">
                      Keterlambatan: {terlambatHari} Hari
                    </h4>
                  </div>
                  <textarea
                    value={catatan}
                    onChange={(e) => setCatatan(e.target.value)}
                    className="w-full bg-black/20 border border-white/30 rounded-lg py-2 px-4 text-white text-sm placeholder-white/50 focus:outline-none focus:border-white transition-all"
                    placeholder="Catatan pelunasan denda..."
                    rows="2"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-4 justify-end">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/30"
              >
                Batal
              </button>
              <button
                onClick={handleKembalikan}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg transition-all"
              >
                Kembalikan Buku
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPeminjaman;
