import React, { useState, useEffect } from "react";
import {
  Book,
  Plus,
  Edit,
  Trash2,
  Search,
  X,
  Save,
  ArrowLeft,
} from "lucide-react";
import { BookService, CategoryService } from "../services/api";

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentBook, setCurrentBook] = useState(null);
  const [formData, setFormData] = useState({
    isbn: "",
    title: "",
    author: "",
    category: "",
    copies: "",
    available: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(false);

  // --- LOAD DATA FROM API ---
  useEffect(() => {
    loadBooks();
    loadCategories();
  }, []);

  const loadBooks = async () => {
    setLoading(true);
    const result = await BookService.getAll(searchQuery, filterCategory);
    if (result.success) {
      setBooks(result.data.books);
      setFilteredBooks(result.data.books);
    } else {
      alert("Gagal memuat data buku: " + result.error);
    }
    setLoading(false);
  };

  const loadCategories = async () => {
    const result = await CategoryService.getAll();
    if (result.success) {
      setCategories(["All", ...result.data.categories]);
    }
  };

  // --- EFFECT: FILTER & SEARCH ---
  useEffect(() => {
    loadBooks();
  }, [searchQuery, filterCategory]);

  // --- HANDLERS ---
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleAddBook = () => {
    setModalMode("add");
    setCurrentBook(null);
    setFormData({
      title: "",
      author: "",
      category: "",
      description: "",
      stock: "",
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleEditBook = (book) => {
    setModalMode("edit");
    setCurrentBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      description: book.description || "",
      stock: book.stock.toString(),
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
      const result = await BookService.delete(bookId);
      if (result.success) {
        alert("Buku berhasil dihapus!");
        loadBooks();
      } else {
        alert("Gagal menghapus buku: " + result.error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) errors.title = "Judul buku wajib diisi";
    if (!formData.author.trim()) errors.author = "Nama penulis wajib diisi";
    if (!formData.category) errors.category = "Kategori wajib dipilih";
    if (!formData.stock || parseInt(formData.stock) < 1)
      errors.stock = "Jumlah stok minimal 1";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    const bookData = {
      title: formData.title,
      author: formData.author,
      category: formData.category,
      description: formData.description || "",
      stock: parseInt(formData.stock),
    };

    if (modalMode === "add") {
      const result = await BookService.create(bookData);
      if (result.success) {
        alert("Buku berhasil ditambahkan!");
        setIsModalOpen(false);
        loadBooks();
      } else {
        alert("Gagal menambahkan buku: " + result.error);
      }
    } else {
      const result = await BookService.update(currentBook.id, bookData);
      if (result.success) {
        alert("Buku berhasil diupdate!");
        setIsModalOpen(false);
        loadBooks();
      } else {
        alert("Gagal mengupdate buku: " + result.error);
      }
    }

    setLoading(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormErrors({});
  };

  return (
    <div className="min-h-screen p-8 space-y-8 font-['Poppins'] bg-gradient-to-br from-indigo-900 via-blue-500 to-amber-400">
      {/* HEADER */}
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
              Manajemen Buku
            </h1>
            <p className="text-white/80 text-sm mt-1">
              Kelola katalog buku perpustakaan
            </p>
          </div>
        </div>

        <button
          onClick={handleAddBook}
          className="flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-md border border-white/30 rounded-xl hover:bg-white transition-all shadow-lg text-indigo-900 font-semibold"
        >
          <Plus size={20} />
          Tambah Buku
        </button>
      </div>

      {/* SEARCH & FILTER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Bar */}
        <div className="md:col-span-2 relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80"
          />
          <input
            type="text"
            placeholder="Cari berdasarkan judul, ISBN, atau penulis..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full bg-white/10 backdrop-blur-md text-white placeholder-white/70 border border-white/30 rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all outline-none"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <select
            value={filterCategory}
            onChange={handleFilterChange}
            className="w-full appearance-none bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-xl py-3 px-4 focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all outline-none cursor-pointer"
          >
            <option value="all" className="bg-gray-800 text-white">
              Semua Kategori
            </option>
            {categories.slice(1).map((cat) => (
              <option
                key={cat}
                value={cat.toLowerCase()}
                className="bg-gray-800 text-white"
              >
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6 text-white">
          <p className="text-sm opacity-80 mb-1">Total Buku</p>
          <p className="text-3xl font-bold">{books.length}</p>
        </div>
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6 text-white">
          <p className="text-sm opacity-80 mb-1">Total Stok</p>
          <p className="text-3xl font-bold">
            {books.reduce((sum, book) => sum + book.stock, 0)}
          </p>
        </div>
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-6 text-white">
          <p className="text-sm opacity-80 mb-1">Kategori</p>
          <p className="text-3xl font-bold">{categories.length - 1}</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="relative overflow-x-auto rounded-xl shadow-2xl bg-white">
        <table className="min-w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-100 text-gray-800 uppercase font-bold border-b-2 border-gray-300">
            <tr>
              <th className="px-6 py-4">No</th>
              <th className="px-6 py-4">Judul Buku</th>
              <th className="px-6 py-4">Penulis</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4">Deskripsi</th>
              <th className="px-6 py-4 text-center">Stok</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : filteredBooks.length > 0 ? (
              filteredBooks.map((book, index) => (
                <tr
                  key={book.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 font-medium">{index + 1}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    {book.title}
                  </td>
                  <td className="px-6 py-4">{book.author}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {book.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {book.description || "-"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                        book.stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {book.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEditBook(book)}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteBook(book.id)}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                        title="Hapus"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center">
                    <Book size={48} className="mb-3 opacity-30" />
                    <p className="text-lg font-medium">
                      Tidak ada buku ditemukan
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Coba ubah filter atau kata kunci pencarian
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL ADD/EDIT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Book size={28} />
                {modalMode === "add" ? "Tambah Buku Baru" : "Edit Buku"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Judul Buku <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Masukkan judul buku"
                  className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all ${
                    formErrors.title
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  }`}
                />
                {formErrors.title && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.title}
                  </p>
                )}
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Penulis <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="Nama penulis"
                  className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all ${
                    formErrors.author
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  }`}
                />
                {formErrors.author && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.author}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all appearance-none cursor-pointer ${
                    formErrors.category
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  }`}
                >
                  <option value="">Pilih kategori</option>
                  {categories.slice(1).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {formErrors.category && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.category}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Deskripsi buku (opsional)"
                  rows="3"
                  className="w-full px-4 py-3 border-2 rounded-xl outline-none transition-all border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stok <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  min="1"
                  placeholder="0"
                  className={`w-full px-4 py-3 border-2 rounded-xl outline-none transition-all ${
                    formErrors.stock
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  }`}
                />
                {formErrors.stock && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.stock}
                  </p>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-2xl flex items-center justify-end gap-3 border-t">
              <button
                onClick={handleCloseModal}
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-all font-semibold"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all font-semibold flex items-center gap-2 shadow-lg"
              >
                <Save size={18} />
                {modalMode === "add" ? "Simpan Buku" : "Update Buku"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookManagement;
