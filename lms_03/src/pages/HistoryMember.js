import React, { useState } from "react";
import { Search, Calendar, BookOpen, User, ArrowLeft, Clock, CheckCircle } from "lucide-react";

const MemberHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // DATA DUMMY RIWAYAT PEMINJAMAN
  const historyData = [
    {
      id: 1,
      title: "Buku Entong",
      author: "Adel & Ecak",
      category: "Fiksi",
      borrowDate: "10/12/2025",
      returnDate: "17/12/2025",
      status: "Dipinjam", 
      coverColor: "bg-emerald-500"
    },
    {
      id: 2,
      title: "Laskar Pelangi",
      author: "Andrea Hirata",
      category: "Fiksi",
      borrowDate: "01/12/2025",
      returnDate: "08/12/2025",
      status: "Dikembalikan",
      coverColor: "bg-blue-500"
    },
    {
      id: 3,
      title: "Atomic Habits",
      author: "James Clear",
      category: "Self Dev",
      borrowDate: "15/11/2025",
      returnDate: "22/11/2025",
      status: "Dikembalikan",
      coverColor: "bg-indigo-500"
    },
    {
      id: 4,
      title: "Filosofi Teras",
      author: "Henry Manampiring",
      category: "Filosofi",
      borrowDate: "20/12/2025",
      returnDate: "27/12/2025",
      status: "Dipinjam",
      coverColor: "bg-teal-500"
    }
  ];

  // Filter Data
  const filteredHistory = historyData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full font-['Poppins'] text-gray-800 p-8 md:p-12 bg-gradient-to-br from-green-100 via-white to-emerald-200">
      
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => window.history.back()}
          className="p-3 bg-white/60 backdrop-blur-md border border-white/50 rounded-xl hover:bg-white/80 transition-all text-emerald-800 shadow-sm"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 drop-shadow-sm">
            Riwayat Peminjaman
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Daftar buku yang sedang atau pernah kamu pinjam
          </p>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="relative mb-10 group">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari riwayat buku..."
          className="w-full bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl py-4 px-6 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:bg-white/80 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-md"
        />
        <button className="absolute right-2 top-2 h-[calc(100%-16px)] w-16 bg-emerald-500 rounded-xl flex items-center justify-center text-white hover:bg-emerald-600 transition-all cursor-pointer shadow-sm">
          <Search size={24} />
        </button>
      </div>

      {/* GRID KARTU RIWAYAT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${item.coverColor} opacity-20 blur-xl group-hover:opacity-30 transition-opacity`}></div>

              <div className="flex items-start justify-between mb-4">
                {/* Judul Buku */}
                <h3 className="text-2xl font-bold text-gray-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </h3>
                
                {/* Badge Status*/}
                <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm ${
                  item.status === "Dipinjam" 
                    ? "bg-yellow-100 text-yellow-700 border border-yellow-200" 
                    : "bg-green-100 text-green-700 border border-green-200"
                }`}>
                  {item.status === "Dipinjam" ? <Clock size={14}/> : <CheckCircle size={14}/>}
                  {item.status}
                </span>
              </div>

              {/* Detail Info */}
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-emerald-600" />
                  <span className="font-medium">Penulis:</span> {item.author}
                </div>
                
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-emerald-600" />
                  <span className="font-medium">Kategori:</span> {item.category}
                </div>

                <div className="pt-2 border-t border-gray-200/50 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <Calendar size={12} /> Tgl Pinjam
                    </p>
                    <p className="font-bold text-gray-800">{item.borrowDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <Calendar size={12} /> Tgl Kembali
                    </p>
                    <p className={`font-bold ${item.status === "Dipinjam" ? "text-red-500" : "text-gray-800"}`}>
                      {item.returnDate}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 text-center py-20 opacity-60">
            <Search size={48} className="mx-auto mb-4 text-emerald-600" />
            <p className="text-xl font-medium text-gray-700">Tidak ditemukan riwayat buku "{searchTerm}"</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default MemberHistory;