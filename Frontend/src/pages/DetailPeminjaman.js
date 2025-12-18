import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  BookOpen,
  Calendar,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  CheckSquare,
  Banknote,
} from "lucide-react";

const DetailPeminjaman = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const today = new Date().toISOString().split("T")[0];

  // 1. STATE STATUS
  const [currentStatus, setCurrentStatus] = useState(
    data?.status || "Dipinjam"
  );

  // 2. STATE DENDA TERSIMPAN
  const [savedDenda, setSavedDenda] = useState(data?.denda || 0);

  // 3. STATE CATATAN
  const [catatan, setCatatan] = useState(data?.catatan || "");

  // 4. STATE INPUT TANGGAL PENGEMBALIAN (Default hari ini)
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

  // LOGIKA HITUNG DENDA (REALTIME BERDASARKAN INPUT TANGGAL)
  const dueDate = data.tglKembali;

  let potentialDenda = 0;
  let terlambatHari = 0;

  // Hitung denda berdasarkan tanggal yang DIPILIH di input (bukan fix hari ini)
  if (tglInput > dueDate) {
    const tglKembaliAktual = new Date(tglInput);
    const tglBatas = new Date(dueDate);
    const selisihWaktu = tglKembaliAktual - tglBatas;
    terlambatHari = Math.ceil(selisihWaktu / (1000 * 60 * 60 * 24));
    potentialDenda = terlambatHari * 2000; // Rp 2.000 per hari
  }

  const displayDenda =
    currentStatus === "Dikembalikan" ? savedDenda : potentialDenda;

  const handleKembalikan = () => {
    const confirmMessage =
      potentialDenda > 0
        ? `Pengembalian pada ${tglInput}. Terlambat ${terlambatHari} hari. Denda: Rp ${potentialDenda.toLocaleString()}. Lanjutkan?`
        : `Konfirmasi pengembalian buku pada tanggal ${tglInput}?`;

    if (window.confirm(confirmMessage)) {
      setCurrentStatus("Dikembalikan");
      setSavedDenda(potentialDenda);

      const savedData = localStorage.getItem("borrowedBooks");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        const updatedData = parsedData.map((item) => {
          if (item.kodeTransaksi === data.kodeTransaksi) {
            return {
              ...item,
              status: "Dikembalikan",
              tglDikembalikan: tglInput,
              denda: potentialDenda,
              catatan: catatan,
            };
          }
          return item;
        });
        localStorage.setItem("borrowedBooks", JSON.stringify(updatedData));
      }

      alert("Buku berhasil dikembalikan!");
    }
  };

  let statusLabel = currentStatus;
  let statusColor = "text-yellow-400";
  let statusBg = "bg-yellow-500/20 border-yellow-400/30";
  let StatusIcon = Clock;

  if (statusLabel === "Dikembalikan") {
    statusColor = "text-green-300";
    statusBg = "bg-green-500/20 border-green-400/30";
    StatusIcon = CheckCircle;
  } else if (statusLabel === "Dipinjam") {
    if (tglInput > dueDate) {
      statusLabel = "Terlambat";
      statusColor = "text-red-300";
      statusBg = "bg-red-500/20 border-red-400/30";
      StatusIcon = AlertCircle;
    } else {
      statusColor = "text-yellow-400";
      statusBg = "bg-yellow-500/20 border-yellow-400/30";
      StatusIcon = Clock;
    }
  }

  return (
    <div className="min-h-screen p-8 font-['Poppins'] bg-gradient-to-br from-indigo-900 via-blue-500 to-amber-400">
      {/* HEADER */}
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
                {data.kodeTransaksi}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* KONTEN DETAIL */}
      <div className="max-w-4xl mx-auto bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-8 shadow-2xl text-white">
        {/* Status Header */}
        <div className="flex justify-between items-start border-b border-white/20 pb-6 mb-6">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-full border ${statusBg}`}>
              <StatusIcon className={statusColor} size={32} />
            </div>
            <div>
              <p className="text-sm text-indigo-100 mb-1">Status Peminjaman</p>
              <h3 className={`text-2xl font-bold ${statusColor}`}>
                {statusLabel}
              </h3>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-indigo-100">Tanggal Transaksi</p>
            <p className="font-bold text-lg">{data.tglPinjam}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kiri: Peminjam */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold border-l-4 border-yellow-400 pl-3 uppercase tracking-wider">
              Informasi Peminjam
            </h4>
            <div className="flex items-start gap-4">
              <User className="mt-1 text-white/70" />
              <div>
                <p className="text-xs text-indigo-200 uppercase">
                  Nama Lengkap
                </p>
                <p className="text-lg font-semibold">{data.nama}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CreditCard className="mt-1 text-white/70" />
              <div>
                <p className="text-xs text-indigo-200 uppercase">
                  Nomor Telepon
                </p>
                <p className="text-lg font-semibold">{data.noTelp || "-"}</p>
              </div>
            </div>
          </div>

          {/* Kanan: Buku */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold border-l-4 border-blue-400 pl-3 uppercase tracking-wider">
              Detail Buku
            </h4>
            <div className="flex items-start gap-4">
              <BookOpen className="mt-1 text-white/70" />
              <div>
                <p className="text-xs text-indigo-200 uppercase">Judul Buku</p>
                <p className="text-lg font-semibold">{data.judul}</p>
                <p className="text-sm text-white/60">ISBN: {data.isbn}</p>
                <p className="text-sm text-white/60">
                  Pengarang: {data.pengarang || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Bawah: Waktu & Denda */}
        <div className="mt-8 bg-black/20 rounded-xl p-6 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-400/20 rounded-lg">
                <Calendar className="text-blue-400" size={24} />
              </div>
              <div>
                <p className="text-xs text-indigo-200">Batas Waktu</p>
                <p className="text-lg font-bold text-white">
                  {data.tglKembali}
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
                    ? data.tglDikembalikan || tglInput
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
            {/* 1. INPUT TANGGAL PENGEMBALIAN */}
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

              {/* Form Catatan (Muncul jika ada denda) */}
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

            <div className="flex justify-end">
              <button
                onClick={handleKembalikan}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all shadow-lg hover:scale-105 active:scale-95"
              >
                <CheckSquare size={20} />
                Konfirmasi Pengembalian
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPeminjaman;
