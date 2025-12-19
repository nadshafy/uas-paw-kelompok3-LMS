import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Printer, FileText, User, BookOpen, Calendar, CreditCard, CheckCircle, Clock, AlertCircle } from "lucide-react";

const DetailPeminjaman = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-['Poppins']">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-700">Data Tidak Ditemukan</h2>
          <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">Kembali</button>
        </div>
      </div>
    );
  }
  
  let statusLabel = data.status || "Dipinjam";
  let statusColor = "text-yellow-400";
  let statusBg = "bg-yellow-500/20 border-yellow-400/30";
  let StatusIcon = Clock;

  if (statusLabel === "Dikembalikan") {
    statusColor = "text-green-300";
    statusBg = "bg-green-500/20 border-green-400/30";
    StatusIcon = CheckCircle;
  } else if (statusLabel === "Dipinjam") {
    const today = new Date().toISOString().split('T')[0];
    if (data.tglKembali && today > data.tglKembali) {
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
              ID Transaksi: <span className="font-mono font-bold text-yellow-300">{data.kodeTransaksi}</span>
            </p>
          </div>
        </div>

        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 px-5 py-2 bg-white/90 text-indigo-900 font-bold rounded-xl hover:bg-white transition-all shadow-lg"
        >
          <Printer size={20} />
          Cetak Bukti
        </button>
      </div>

      {/* KONTEN DETAIL (Card Glassmorphism) */}
      <div className="max-w-4xl mx-auto bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-8 shadow-2xl text-white">
        
        {/* Section Atas: Status Dinamis */}
        <div className="flex justify-between items-start border-b border-white/20 pb-6 mb-6">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-full border ${statusBg}`}>
              <StatusIcon className={statusColor} size={32} />
            </div>
            <div>
              <p className="text-sm text-indigo-100 mb-1">Status Peminjaman</p>
              <h3 className={`text-2xl font-bold ${statusColor}`}>{statusLabel}</h3>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-indigo-100">Tanggal Transaksi</p>
            <p className="font-bold text-lg">{data.tglPinjam}</p>
          </div>
        </div>

        {/* Grid Informasi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Kolom Kiri: Info Peminjam */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold border-l-4 border-yellow-400 pl-3 uppercase tracking-wider">Informasi Peminjam</h4>
            
            <div className="flex items-start gap-4">
              <User className="mt-1 text-white/70" />
              <div>
                <p className="text-xs text-indigo-200 uppercase">Nama Lengkap</p>
                <p className="text-lg font-semibold">{data.nama}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CreditCard className="mt-1 text-white/70" />
              <div>
                <p className="text-xs text-indigo-200 uppercase">Nomor Telepon</p>
                <p className="text-lg font-semibold">{data.noTelp || "-"}</p>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Info Buku */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold border-l-4 border-blue-400 pl-3 uppercase tracking-wider">Detail Buku</h4>
            
            <div className="flex items-start gap-4">
              <BookOpen className="mt-1 text-white/70" />
              <div>
                <p className="text-xs text-indigo-200 uppercase">Judul Buku</p>
                <p className="text-lg font-semibold">{data.judul}</p>
                <p className="text-sm text-white/60">ISBN: {data.isbn}</p>
                <p className="text-sm text-white/60">Kategori: {data.kategori || "-"}</p>
                <p className="text-sm text-white/60">Pengarang: {data.pengarang || "-"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section Bawah: Tanggal & Info Pengembalian */}
        <div className="mt-8 bg-black/20 rounded-xl p-6 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Tanggal Pinjam */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-400/20 rounded-lg">
                <Calendar className="text-yellow-400" size={24} />
              </div>
              <div>
                <p className="text-xs text-indigo-200">Tanggal Pinjam</p>
                <p className="text-lg font-bold text-white">{data.tglPinjam}</p>
              </div>
            </div>

            {/* Batas Kembali */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-400/20 rounded-lg">
                <Calendar className="text-blue-400" size={24} />
              </div>
              <div>
                <p className="text-xs text-indigo-200">Batas Kembali</p>
                <p className="text-lg font-bold text-white">{data.tglKembali}</p>
              </div>
            </div>

            {/* Status Pengembalian (Indikator Bawah) */}
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${statusLabel === "Dikembalikan" ? "bg-green-400/20" : "bg-red-400/20"}`}>
                {statusLabel === "Dikembalikan" ? (
                  <CheckCircle className="text-green-400" size={24} />
                ) : (
                  <AlertCircle className="text-red-400" size={24} />
                )}
              </div>
              <div>
                <p className="text-xs text-indigo-200">Info Pengembalian</p>
                <p className={`text-lg font-bold ${statusLabel === "Dikembalikan" ? "text-green-300" : "text-red-300"}`}>
                  {statusLabel === "Dikembalikan" ? "Selesai" : "Belum Kembali"}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default DetailPeminjaman;