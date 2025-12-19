import React, { useState, useEffect } from "react"; 
import { Search, Calendar, BookOpen, User, ArrowLeft, Clock, CheckCircle } from "lucide-react";
import { API_BASE_URL } from "../services/api";

const MemberHistory = () => {
  const [searchTerm, setSearchTerm] = useState("") ; 
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get current user data from localStorage
  const getUserData = () => {
    try {
      // Try to get from object format first
      const userStr = localStorage.getItem('user');
      if (userStr) {
        return JSON.parse(userStr);
      }
      
      // Fallback: get from individual keys (current format)
      const userId = localStorage.getItem('userId');
      const userName = localStorage.getItem('userName');
      const userEmail = localStorage.getItem('userEmail');
      const userRole = localStorage.getItem('userRole');
      
      if (userId) {
        return {
          id: parseInt(userId),
          name: userName,
          email: userEmail,
          role: userRole
        };
      }
      
      return null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  };

  useEffect(() => {
    loadMyBorrowings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMyBorrowings = async () => {
    setIsLoading(true);
    try {
      const user = getUserData();
      console.log("[HistoryMember] User data from localStorage:", user);
      
      if (!user || !user.id) {
        console.error("User not found in localStorage or missing ID");
        setHistoryData([]);
        setIsLoading(false);
        return;
      }

      console.log("[HistoryMember] Fetching borrowings for member_id:", user.id);
      
      // Fetch all borrowings from API
      const response = await fetch(`${API_BASE_URL}/borrowings`);
      const data = await response.json();
      
      console.log("[HistoryMember] API Response:", data);
      
      if (data.borrowings) {
        // Filter only borrowings for current logged-in member
        const myBorrowings = data.borrowings.filter(
          borrowing => borrowing.member_id === user.id
        );
        console.log("[HistoryMember] Filtered borrowings:", myBorrowings);
        setHistoryData(myBorrowings);
      }
    } catch (error) {
      console.error("Error loading borrowings:", error);
      setHistoryData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter Data
  const filteredHistory = historyData.filter((item) =>
    (item.book_title && item.book_title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.author && item.author.toLowerCase().includes(searchTerm.toLowerCase()))
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
        {isLoading ? (
          <div className="col-span-1 md:col-span-2 text-center py-20">
            <div className="animate-spin w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat data...</p>
          </div>
        ) : filteredHistory.length > 0 ? (
          filteredHistory.map((item, index) => (
            <div
              key={item.id || index} 
              className="group relative bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-emerald-500 opacity-20 blur-xl group-hover:opacity-30 transition-opacity`}></div>

              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                  {item.book_title || "N/A"}
                </h3>
                
                <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm ${
                  !item.return_date
                    ? "bg-yellow-100 text-yellow-700 border border-yellow-200" 
                    : "bg-green-100 text-green-700 border border-green-200"
                }`}>
                  {!item.return_date ? <Clock size={14}/> : <CheckCircle size={14}/>}
                  {!item.return_date ? "Dipinjam" : "Dikembalikan"}
                </span>
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-emerald-600" />
                  <span className="font-medium">Penulis:</span> {item.author || "N/A"}
                </div>
                
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-emerald-600" />
                  <span className="font-medium">Kategori:</span> {item.category || "N/A"}
                </div>

                <div className="pt-2 border-t border-gray-200/50 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <Calendar size={12} /> Tgl Pinjam
                    </p>
                    <p className="font-bold text-gray-800">{item.borrow_date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <Calendar size={12} /> Tgl Jatuh Tempo
                    </p>
                    <p className={`font-bold ${!item.return_date ? "text-red-500" : "text-gray-800"}`}>
                      {item.due_date}
                    </p>
                  </div>
                </div>

                {item.return_date && (
                  <div className="pt-2 border-t border-gray-200/50">
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <CheckCircle size={12} /> Dikembalikan pada
                    </p>
                    <p className="font-bold text-green-600">{item.return_date}</p>
                    {item.fine > 0 && (
                      <p className="text-xs text-red-600 mt-1">
                        Denda: Rp {item.fine.toLocaleString('id-ID')}
                      </p>
                    )}
                  </div>
                )}
              </div>

            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 text-center py-20 opacity-60">
            <Search size={48} className="mx-auto mb-4 text-emerald-600" />
            <p className="text-xl font-medium text-gray-700">
              {searchTerm ? `Tidak ditemukan riwayat buku "${searchTerm}"` : "Belum ada riwayat peminjaman"}
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default MemberHistory;