import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BookService } from "../services/api";

const DashboardMember = ({ userData, isLoading }) => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    setLoading(true);
    const response = await BookService.getAll();
    if (response.success) {
      setBooks(response.data.books || response.data || []);
    }
    setLoading(false);
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      "Teknologi Informasi": "bg-blue-600",
      "Sains": "bg-emerald-600",
      "Matematika": "bg-indigo-600",
      "Ekonomi": "bg-green-600",
      "Manajemen": "bg-cyan-600",
      "Sastra": "bg-amber-600",
      "Sejarah": "bg-red-600",
      "Psikologi": "bg-purple-600",
      "Filsafat": "bg-slate-600",
      "Pendidikan": "bg-teal-600",
    };
    return colorMap[category] || "bg-gray-500";
  };

  const groupedBooks = books.reduce((acc, book) => {
    const category = book.category?.name || "Lainnya";
    if (!acc[category]) acc[category] = [];
    acc[category].push({
      id: book.id,
      title: book.title,
      author: book.author?.name || "-",
      category,
      color: getCategoryColor(category),
    });
    return acc;
  }, {});

  const categories = Object.keys(groupedBooks).map((key) => ({
    sectionTitle: key.toUpperCase(),
    items: groupedBooks[key],
  }));

  const filteredCategories = categories
    .map((section) => {
      const filteredItems = section.items.filter((item) => {
        const query = searchTerm.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) ||
          item.author.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
        );
      });
      return { ...section, items: filteredItems };
    })
    .filter((section) => section.items.length > 0);

  if (isLoading || loading) {
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

      <div className="relative w-full h-72 rounded-3xl overflow-hidden shadow-lg mb-10">
        <div
          className="flex transition-transform duration-700 ease-in-out h-full w-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="min-w-full h-full relative">
              <img src={slide.image} alt="Banner" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-16 text-white">
                <h2 className="text-3xl md:text-5xl font-bold mb-3">{slide.text}</h2>
                <p className="text-lg md:text-xl font-medium text-emerald-100">{slide.subtext}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "w-8 bg-emerald-400" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative mb-14">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari buku, penulis, atau kategori..."
          className="w-full bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl py-4 px-6"
        />
        <div className="absolute right-2 top-2 h-[calc(100%-16px)] w-16 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
          <Search size={24} />
        </div>
      </div>

      <div className="space-y-14 pb-10">
        {filteredCategories.map((section, index) => (
          <section key={index}>
            <h3 className="text-2xl font-extrabold uppercase mb-6 text-gray-900">
              {section.sectionTitle}
            </h3>

            <div className="flex overflow-x-auto gap-6 pb-12 pt-2 hide-scrollbar px-2">
              {section.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/book-detail/${item.id}`)}
                  className="group relative h-[380px] min-w-[260px] w-[260px] cursor-pointer rounded-3xl overflow-hidden bg-white/30 backdrop-blur-md shadow-lg border-2 border-white/60 hover:border-emerald-500 hover:shadow-2xl hover:-translate-y-2 transition-all"
                >
                  <div className={`absolute inset-0 ${item.color} flex items-center justify-center`}>
                    <span className="text-white/30 text-5xl font-black uppercase -rotate-45">
                      {item.category}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80"></div>

                  <div className="absolute bottom-0 left-0 w-full p-6 text-left">
                    <span className="inline-block px-3 py-1 mb-3 text-[11px] font-bold uppercase text-white bg-white/20 rounded-full">
                      {item.category}
                    </span>
                    <h4 className="text-2xl font-bold text-white leading-tight mb-1 line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-200 font-medium truncate">
                      {item.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default DashboardMember;
