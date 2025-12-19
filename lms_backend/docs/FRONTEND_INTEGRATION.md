# 🔗 Frontend Integration Guide

## Cara Mengintegrasikan Backend dengan Frontend React Anda

Saya sudah membuat file `src/services/api.js` yang berisi semua fungsi untuk memanggil API backend. Berikut cara menggunakannya:

---

## 📁 File yang Sudah Dibuat

### [src/services/api.js](../lms_03/src/services/api.js)
File ini berisi:
- ✅ Konfigurasi API base URL
- ✅ Helper functions untuk semua endpoints
- ✅ Error handling otomatis
- ✅ Service classes untuk Auth, Books, Categories, dan Borrowings

---

## 🔄 Contoh Integrasi

### 1. Login/Register - File: `AuthPage.js`

```javascript
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/api";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    
    const result = await AuthService.login(email, password);
    
    if (result.success) {
      // Login berhasil
      const user = result.data.user;
      
      // Simpan user data ke localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      // Redirect berdasarkan role
      if (user.role === 'librarian') {
        navigate('/dashboard-librarian');
      } else {
        navigate('/dashboard-member');
      }
      
      alert(`Welcome, ${user.name}!`);
    } else {
      // Login gagal
      alert(`Login failed: ${result.error}`);
    }
    
    setIsLoading(false);
  };

  const handleRegister = async (formData) => {
    setIsLoading(true);
    
    const result = await AuthService.register(formData);
    
    if (result.success) {
      alert('Registration successful! Please login.');
      // Switch ke tab login
    } else {
      alert(`Registration failed: ${result.error}`);
    }
    
    setIsLoading(false);
  };

  // ... rest of your component
};
```

---

### 2. Book Management - File: `BookManagement.js`

```javascript
import React, { useState, useEffect } from "react";
import { BookService, CategoryService } from "../services/api";

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Load books from API
  const loadBooks = async () => {
    setIsLoading(true);
    const result = await BookService.getAll(searchQuery, filterCategory);
    
    if (result.success) {
      setBooks(result.data.books);
    } else {
      alert(`Error loading books: ${result.error}`);
    }
    
    setIsLoading(false);
  };

  // Load categories from API
  const loadCategories = async () => {
    const result = await CategoryService.getAll();
    
    if (result.success) {
      setCategories(result.data.categories);
    }
  };

  // Load data saat component mount
  useEffect(() => {
    loadBooks();
    loadCategories();
  }, [searchQuery, filterCategory]);

  // Handle create book
  const handleCreateBook = async (bookData) => {
    const result = await BookService.create(bookData);
    
    if (result.success) {
      alert('Book created successfully!');
      loadBooks(); // Reload list
      // Close modal
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  // Handle update book
  const handleUpdateBook = async (id, bookData) => {
    const result = await BookService.update(id, bookData);
    
    if (result.success) {
      alert('Book updated successfully!');
      loadBooks(); // Reload list
      // Close modal
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  // Handle delete book
  const handleDeleteBook = async (id) => {
    if (!window.confirm('Are you sure want to delete this book?')) return;
    
    const result = await BookService.delete(id);
    
    if (result.success) {
      alert('Book deleted successfully!');
      loadBooks(); // Reload list
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  // ... rest of your component
  
  return (
    <div>
      {/* Search input */}
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search books..."
      />

      {/* Category filter */}
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="all">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Books list */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        books.map(book => (
          <div key={book.id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Category: {book.category}</p>
            <p>Available: {book.available}/{book.copies}</p>
            
            <button onClick={() => handleUpdateBook(book.id, {...})}>
              Edit
            </button>
            <button onClick={() => handleDeleteBook(book.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};
```

---

### 3. Borrowing Management - File: `PeminjamanBuku.js`

```javascript
import React, { useState, useEffect } from "react";
import { BorrowingService, BookService } from "../services/api";

const PeminjamanBuku = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load borrowings from API
  const loadBorrowings = async () => {
    setIsLoading(true);
    const result = await BorrowingService.getAll();
    
    if (result.success) {
      setBorrowings(result.data.borrowings);
    } else {
      alert(`Error: ${result.error}`);
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    loadBorrowings();
  }, []);

  // Handle create borrowing
  const handleCreateBorrowing = async (formData) => {
    const borrowingData = {
      nama: formData.nama,
      noTelp: formData.noTelp,
      isbn: formData.isbn,
      tglPinjam: formData.tglPinjam,
      tglKembali: formData.tglKembali,
      userId: 1, // Get from logged in user
    };

    const result = await BorrowingService.create(borrowingData);
    
    if (result.success) {
      alert('Borrowing created successfully!');
      loadBorrowings(); // Reload list
      // Clear form
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  // Handle return book
  const handleReturnBook = async (id) => {
    if (!window.confirm('Confirm return this book?')) return;
    
    const result = await BorrowingService.returnBook(id);
    
    if (result.success) {
      alert('Book returned successfully!');
      loadBorrowings(); // Reload list
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  // Handle delete borrowing
  const handleDeleteBorrowing = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    
    const result = await BorrowingService.delete(id);
    
    if (result.success) {
      alert('Borrowing deleted successfully!');
      loadBorrowings();
    } else {
      alert(`Error: ${result.error}`);
    }
  };

  // ... rest of your component
};
```

---

## 🎯 Checklist Integrasi

### Langkah-langkah yang perlu dilakukan:

- [x] ✅ Backend API sudah dibuat
- [x] ✅ File `api.js` service sudah dibuat
- [ ] 🔄 Update `AuthPage.js` untuk menggunakan `AuthService`
- [ ] 🔄 Update `BookManagement.js` untuk menggunakan `BookService`
- [ ] 🔄 Update `PeminjamanBuku.js` untuk menggunakan `BorrowingService`
- [ ] 🔄 Hapus data dummy dari frontend (gunakan API)
- [ ] 🔄 Tambahkan loading states
- [ ] 🔄 Tambahkan error handling yang lebih baik
- [ ] 🔄 Simpan user session di localStorage

---

## 💾 User Session Management

Untuk menyimpan user yang sedang login:

```javascript
// Setelah login berhasil
const user = result.data.user;
localStorage.setItem('user', JSON.stringify(user));

// Untuk mendapatkan user yang sedang login
const currentUser = JSON.parse(localStorage.getItem('user'));

// Untuk logout
localStorage.removeItem('user');
navigate('/login');

// Cek apakah user sudah login (di App.js atau routes)
const isAuthenticated = () => {
  return localStorage.getItem('user') !== null;
};
```

---

## 🔒 Protected Routes

Contoh membuat protected route:

```javascript
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }
  
  return children;
};

// Usage in App.js
<Route 
  path="/dashboard-librarian" 
  element={
    <ProtectedRoute requiredRole="librarian">
      <DashboardLibrarian />
    </ProtectedRoute>
  } 
/>
```

---

## 🧪 Testing Flow

1. **Start Backend:**
   ```bash
   cd lms_backend/lms_api
   pserve development.ini --reload
   ```

2. **Start Frontend:**
   ```bash
   cd lms_03
   npm start
   ```

3. **Test Login:**
   - Email: `budi@mail.com`
   - Password: `member123`

4. **Test Features:**
   - ✅ View books list
   - ✅ Search books
   - ✅ Filter by category
   - ✅ Create borrowing
   - ✅ View borrowings

---

## 📝 Tips

1. **Gunakan `useEffect` dengan dependency array** untuk auto-reload data
2. **Tambahkan loading states** untuk better UX
3. **Handle errors dengan baik** - tampilkan pesan yang jelas
4. **Validasi input** sebelum mengirim ke API
5. **Gunakan `localStorage`** untuk menyimpan user session
6. **Test semua fitur** dengan data dari backend

---

## 🐛 Common Issues

### Issue: CORS Error
**Solution:** Pastikan backend sudah running di port 6543

### Issue: "Network Error"
**Solution:** Cek apakah backend sudah running dengan: `http://localhost:6543/api/books`

### Issue: Data tidak muncul
**Solution:** Cek console browser untuk error messages

---

## 📞 Next Steps

1. Update semua component untuk menggunakan API services
2. Hapus semua data dummy dari frontend
3. Test semua fitur end-to-end
4. Tambahkan proper error handling & loading states
5. Deploy ke production! 🚀

---

**Happy Integration! 🎉**
