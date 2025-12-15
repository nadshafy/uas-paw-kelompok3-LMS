import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

const DashboardMember = ({ userData, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000&auto=format&fit=crop",
      text: "Selamat Datang di Perpustakaan FRAND",
      subtext: "Temukan jutaan inspirasi dari koleksi buku terbaik kami."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1000&auto=format&fit=crop",
      text: "Baca Buku Dimana Saja",
      subtext: "Akses koleksi digital dan fisik dengan mudah."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1000&auto=format&fit=crop",
      text: "Perluas Wawasanmu",
      subtext: "Dunia ada di dalam genggamanmu melalui membaca."
    }
  ];

  // --- LOGIC AUTO SLIDE ---
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000); // Bergeser setiap 4 detik

    return () => clearInterval(slideInterval); 
  }, [slides.length]);

  // DATA DUMMY BUKU
  const categories = [
    { 
      sectionTitle: "REKOMENDASI BUKU", 
      items: [
        { title: "Atomic Habits", author: "James Clear", category: "Self Dev", color: "bg-blue-500" },
        { title: "Filosofi Teras", author: "Henry Manampiring", category: "Filosofi", color: "bg-emerald-500" },
        { title: "Sapiens", author: "Yuval Noah Harari", category: "Sejarah", color: "bg-indigo-500" },
        { title: "Psychology of Money", author: "Morgan Housel", category: "Keuangan", color: "bg-emerald-600" },
        { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "Bisnis", color: "bg-blue-600" },
        { title: "Psychology of Money", author: "Morgan Housel", category: "Keuangan", color: "bg-emerald-600" }
      ]
    },
    
    { 
      sectionTitle: "MAJALAH", 
      items: [
        { title: "Tempo", author: "Edisi Khusus", category: "Politik", color: "bg-red-500" },
        { title: "Nat Geo", author: "Edisi Alam", category: "Sains", color: "bg-yellow-500" },
        { title: "Forbes", author: "Indonesia", category: "Bisnis", color: "bg-emerald-500" },
        { title: "Tempo", author: "Edisi Khusus", category: "Politik", color: "bg-red-500" },
        { title: "Nat Geo", author: "Edisi Alam", category: "Sains", color: "bg-yellow-500" },
        { title: "Forbes", author: "Indonesia", category: "Bisnis", color: "bg-emerald-500" },
      ]
    },
    { 
      sectionTitle: "FIKSI", 
      items: [
        { title: "Laut Bercerita", author: "Leila S. Chudori", category: "Novel", color: "bg-sky-500" },
        { title: "Bumi Manusia", author: "Pramoedya A. Toer", category: "Sastra", color: "bg-amber-600" },
        { title: "Harry Potter", author: "J.K. Rowling", category: "Fantasi", color: "bg-purple-600" },
        { title: "Laut Bercerita", author: "Leila S. Chudori", category: "Novel", color: "bg-sky-500" },
        { title: "Bumi Manusia", author: "Pramoedya A. Toer", category: "Sastra", color: "bg-amber-600" },
        { title: "Harry Potter", author: "J.K. Rowling", category: "Fantasi", color: "bg-purple-600" },
      ]
    },
  ];

  // LOGIC FILTERING
  const filteredCategories = categories.map((section) => {
    const filteredItems = section.items.filter((item) => {
      const query = searchTerm.toLowerCase();
      return (
        item.title.toLowerCase().includes(query) || 
        item.author.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    });
    return { ...section, items: filteredItems };
  }).filter((section) => section.items.length > 0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-semibold">Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full font-sans text-gray-800 p-8 md:p-12 bg-gradient-to-br from-green-100 via-white to-emerald-200">
      
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>

      {/* --- CAROUSEL BANNER SECTION --- */}
      <div className="relative w-full h-72 rounded-3xl overflow-hidden shadow-lg mb-10 group">
        
        {/* Container Gambar*/}
        <div 
          className="flex transition-transform duration-700 ease-in-out h-full w-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="min-w-full h-full relative">
              {/* Gambar Background */}
              <img 
                src={slide.image} 
                alt="Banner" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 via-black/40 to-transparent"></div>
              
              {/* Teks Konten */}
              <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-16 text-white">
                <h2 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg transition-all duration-500 transform translate-y-0">
                  {slide.text}
                </h2>
                <p className="text-lg md:text-xl font-medium text-emerald-100 drop-shadow-md">
                  {slide.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Navigasi Bawah */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 shadow-sm ${
                currentSlide === index 
                  ? "w-8 bg-emerald-400" 
                  : "w-2 bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-14 group">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari buku, penulis, atau kategori..."
          className="w-full bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl py-4 px-6 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:bg-white/80 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-md hover:shadow-lg"
        />
        <button className="absolute right-2 top-2 h-[calc(100%-16px)] w-16 bg-emerald-500 rounded-xl flex items-center justify-center text-white hover:bg-emerald-600 transition-all cursor-pointer shadow-sm hover:shadow-md">
          <Search size={24} />
        </button>
      </div>

      {/* Content Section */}
      <div className="space-y-14 pb-10">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((section, index) => (
            <section key={index}>
              <h3 className="text-2xl font-extrabold uppercase mb-6 text-gray-900 tracking-wide flex items-center gap-2 drop-shadow-sm">
                {section.sectionTitle}
              </h3>

              <div className="flex overflow-x-auto gap-6 pb-12 pt-2 hide-scrollbar px-2">
                {section.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="
                      group relative h-[380px] min-w-[260px] w-[260px] flex-none 
                      rounded-3xl overflow-hidden cursor-pointer transition-all duration-300
                      bg-white/30 backdrop-blur-md shadow-lg
                      border-2 border-white/60 
                      hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/20
                      hover:-translate-y-2
                    "
                  >
                    {/* Layer 1: Cover */}
                    <div className={`absolute inset-0 ${item.color} flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}>
                      <span className="text-white/30 text-5xl font-black uppercase -rotate-45 select-none transform scale-125">
                          {item.category}
                      </span>
                    </div>

                    {/* Layer 2: Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                    {/* Layer 3: Text */}
                    <div className="absolute bottom-0 left-0 w-full p-6 text-left transform transition-transform duration-300 group-hover:translate-y-[-5px]">
                       <span className="inline-block px-3 py-1 mb-3 text-[11px] font-bold uppercase tracking-wider text-white bg-white/20 backdrop-blur-md border border-white/40 rounded-full shadow-sm group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-colors">
                          {item.category}
                       </span>
                       <h4 className="text-2xl font-bold text-white leading-tight mb-1 line-clamp-2 drop-shadow-md">
                          {item.title}
                       </h4>
                       <p className="text-sm text-gray-200 font-medium truncate opacity-90 group-hover:text-emerald-300 transition-colors">
                          {item.author}
                       </p>
                    </div>

                  </div>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="text-center py-20 opacity-60">
            <Search size={48} className="mx-auto mb-4 text-emerald-600" />
            <p className="text-xl font-medium text-gray-700">Tidak ditemukan buku "{searchTerm}"</p>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default DashboardMember;