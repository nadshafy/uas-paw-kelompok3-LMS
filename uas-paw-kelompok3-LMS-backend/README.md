# 📚 Library Management System (LMS) - Kelompok 3

Sistem Manajemen Perpustakaan berbasis web dengan frontend React dan backend Pyramid (Python).

**🎉 Backend API Complete - 21 Endpoints Ready!**

---

## 🏗️ Arsitektur Sistem

```
uas-paw-kelompok3-LMS/
├── lms_03/                    # Frontend (React)
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   └── ...
│   └── package.json
│
└── lms_backend/               # Backend (Pyramid) ✅ COMPLETE
    ├── lms_api/
    │   ├── lms_api/
    │   │   ├── models/        # Database models
    │   │   ├── views/         # API endpoints (21 endpoints)
    │   │   │   ├── auth.py            # Authentication ✅
    │   │   │   ├── books.py           # Book management ✅
    │   │   │   ├── borrowing.py       # Borrowing system ✅
    │   │   │   ├── statistics.py      # Dashboards ⭐ NEW
    │   │   │   └── debug.py           # Debug tools ✅
    │   │   ├── routes.py      # All routes configured ✅
    │   │   └── ...
    │   ├── development.ini    # Configuration
    │   └── setup.py
    ├── API_ENDPOINTS.md       # Complete API reference ⭐ NEW
    ├── SETUP_GUIDE.md         # Installation guide ⭐ NEW
    ├── FRONTEND_INTEGRATION_EXAMPLES.md # React examples ⭐ NEW
    ├── SUMMARY.md             # Project summary ⭐ NEW
    └── CHANGELOG.md           # All changes ⭐ NEW
```

---

## ✨ Fitur Utama

### 🔐 Authentication
- ✅ Register user (Member/Librarian)
- ✅ Login dengan email & password
- ✅ Password hashing dengan bcrypt
- ✅ Role-based access (Member & Librarian)

### 📚 Manajemen Buku (Librarian)
- ✅ Lihat daftar buku
- ✅ Tambah buku baru
- ✅ Edit informasi buku
- ✅ Hapus buku
- ✅ Search & filter buku (judul, pengarang, kategori, ISBN)
- ✅ Kategori buku

### 📖 Peminjaman Buku
- ✅ Buat transaksi peminjaman
- ✅ Lihat daftar peminjaman
- ✅ Kembalikan buku
- ✅ Hapus transaksi peminjaman
- ✅ Tracking ketersediaan buku
- ✅ Status peminjaman (Dipinjam, Dikembalikan, Terlambat)

---

## 🛠️ Tech Stack

### Frontend
- **React** 18
- **React Router** - Routing
- **TailwindCSS** - Styling
- **Lucide React** - Icons

### Backend ⭐ COMPLETE
- **Pyramid** - Python web framework
- **SQLAlchemy** - ORM
- **PostgreSQL** - Database
- **bcrypt** - Password hashing
- **CORS** - Cross-origin support

---

## 🚀 Quick Start

### 1. Setup Backend

```powershell
# Navigate ke folder backend
cd lms_backend\lms_api

# Install dependencies
pip install -e .

# Buat database PostgreSQL
createdb lms-frand

# Initialize database dengan data dummy
init_database development.ini

# Start backend server
pserve development.ini --reload
```

**Backend:** http://localhost:6543

📖 **[Lihat QUICK_START.md untuk detail lengkap](lms_backend/QUICK_START.md)**

### 2. Setup Frontend

```powershell
# Navigate ke folder frontend
cd lms_03

# Install dependencies
npm install

# Start development server
npm start
```

**Frontend:** http://localhost:3000

---

## 🧪 Test Credentials

Setelah menjalankan `init_database development.ini`:

### Librarian (Admin)
- **Email:** `admin@library.com`
- **Password:** `admin123`

### Member
- **Email:** `budi@mail.com`
- **Password:** `member123`

---

## 📚 Dokumentasi Backend

### 📄 File Dokumentasi yang Sudah Dibuat:

1. **[API_DOCUMENTATION.md](lms_backend/API_DOCUMENTATION.md)**
   - Dokumentasi lengkap semua API endpoints
   - Request/Response examples
   - Error handling
   - Database schema

2. **[QUICK_START.md](lms_backend/QUICK_START.md)**
   - Panduan setup step-by-step
   - Installation guide
   - Testing commands
   - Troubleshooting

3. **[FRONTEND_INTEGRATION.md](lms_backend/FRONTEND_INTEGRATION.md)**
   - Cara mengintegrasikan backend dengan frontend
   - Contoh kode integrasi untuk setiap page
   - User session management
   - Protected routes

4. **[src/services/api.js](lms_03/src/services/api.js)** ⭐ NEW
   - Service functions untuk semua API endpoints
   - Error handling otomatis
   - Ready to use di frontend

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Daftar user baru
- `POST /api/auth/login` - Login

### Books Management
- `GET /api/books` - List buku (dengan search & filter)
- `GET /api/books/{id}` - Detail buku
- `POST /api/books` - Tambah buku
- `PUT /api/books/{id}` - Update buku
- `DELETE /api/books/{id}` - Hapus buku
- `GET /api/categories` - List kategori

### Borrowings Management
- `GET /api/borrowings` - List peminjaman
- `GET /api/borrowings/{id}` - Detail peminjaman
- `POST /api/borrowings` - Buat peminjaman
- `POST /api/borrowings/{id}/return` - Kembalikan buku
- `DELETE /api/borrowings/{id}` - Hapus peminjaman

📖 **[Lihat API_DOCUMENTATION.md untuk detail lengkap](lms_backend/API_DOCUMENTATION.md)**

---

## 📊 Database Schema

### Tables:
- **users** - Data pengguna (Member & Librarian)
- **books** - Data buku (dengan ISBN, judul, copies, available)
- **authors** - Data pengarang
- **categories** - Kategori buku
- **borrowings** - Transaksi peminjaman (dengan status & tanggal)

### Relationships:
- Book → Author (many-to-one)
- Book → Category (many-to-one)
- Borrowing → User (many-to-one)
- Borrowing → Book (many-to-one)

---

## 🎯 Cara Integrasi Frontend dengan Backend

### 1. Sudah Tersedia: API Service (src/services/api.js)

File ini berisi helper functions untuk semua API calls:

```javascript
import { AuthService, BookService, BorrowingService } from './services/api';

// Login
const result = await AuthService.login(email, password);

// Get Books
const result = await BookService.getAll(searchQuery, category);

// Create Borrowing
const result = await BorrowingService.create(borrowingData);
```

### 2. Update Frontend Pages

Ganti data dummy dengan API calls. Contoh di **[FRONTEND_INTEGRATION.md](lms_backend/FRONTEND_INTEGRATION.md)**:

- ✅ **AuthPage.js** - Gunakan `AuthService.login()` dan `AuthService.register()`
- ✅ **BookManagement.js** - Gunakan `BookService` untuk CRUD
- ✅ **PeminjamanBuku.js** - Gunakan `BorrowingService` untuk transaksi

---

## 📝 Data Dummy

Setelah `init_database`, sistem terisi dengan:

- **2 Users** (1 Librarian: admin@library.com, 1 Member: budi@mail.com)
- **8 Books** (Atomic Habits, Clean Code, Laskar Pelangi, dll)
- **6 Categories** (Teknologi, Fiksi, Pengembangan Diri, dll)
- **8 Authors** (James Clear, Robert C. Martin, Andrea Hirata, dll)
- **2 Sample Borrowings** (1 dipinjam, 1 dikembalikan)

---

## ✅ Status Pengembangan

### Backend ✅ COMPLETE
- ✅ Database models (User, Book, Author, Category, Borrowing)
- ✅ Authentication API (Register, Login dengan bcrypt)
- ✅ Books CRUD API (Create, Read, Update, Delete)
- ✅ Borrowings CRUD API (dengan status tracking)
- ✅ CORS configuration untuk frontend
- ✅ Database initialization script dengan dummy data
- ✅ Error handling & validation
- ✅ API Documentation lengkap
- ✅ Frontend integration guide

### Frontend 🔄 Perlu Integrasi
- 🔄 Hubungkan AuthPage dengan AuthService
- 🔄 Hubungkan BookManagement dengan BookService  
- 🔄 Hubungkan PeminjamanBuku dengan BorrowingService
- 🔄 Hapus data dummy, gunakan API
- 🔄 Implementasi user session (localStorage)
- 🔄 Implementasi protected routes
- 🔄 Loading states & error handling

📖 **[Panduan lengkap ada di FRONTEND_INTEGRATION.md](lms_backend/FRONTEND_INTEGRATION.md)**

---

## 🔧 Configuration

### Backend (development.ini)
```ini
sqlalchemy.url = postgresql+psycopg2://postgres:PASSWORD@localhost:5432/lms-frand
```

Update `PASSWORD` sesuai PostgreSQL Anda.

### Frontend (src/services/api.js)
```javascript
export const API_BASE_URL = 'http://localhost:6543/api';
```

---

## 🐛 Troubleshooting

### Backend Issues

**Database connection error:**
```bash
# Pastikan PostgreSQL running
# Buat database
createdb lms-frand
```

**Module not found:**
```bash
cd lms_backend/lms_api
pip install -e .
```

**bcrypt error:**
```bash
pip uninstall bcrypt
pip install bcrypt
```

### Frontend Issues

**CORS error:**
- Pastikan backend running di http://localhost:6543
- CORS sudah dikonfigurasi otomatis

📖 **[Troubleshooting lengkap di QUICK_START.md](lms_backend/QUICK_START.md)**

---

## 📞 Dokumentasi & Support

- 📘 **[API Documentation](lms_backend/API_DOCUMENTATION.md)** - REST API lengkap dengan examples
- 🚀 **[Quick Start Guide](lms_backend/QUICK_START.md)** - Setup & installation
- 🔗 **[Frontend Integration](lms_backend/FRONTEND_INTEGRATION.md)** - Cara integrasi dengan React

---

## 👥 Kelompok 3

UAS Pemrograman Web - Library Management System

---

## 🎉 Summary

✅ **Backend sudah LENGKAP dan SIAP DIGUNAKAN!**

Yang sudah dibuat:
1. ✅ Complete REST API dengan 15+ endpoints
2. ✅ Database models dengan relationships
3. ✅ Authentication dengan bcrypt
4. ✅ CORS configuration
5. ✅ Database initialization script
6. ✅ API service helper untuk frontend
7. ✅ Dokumentasi lengkap (API, Quick Start, Integration Guide)

**Next Step:** Integrasikan dengan frontend React menggunakan file `src/services/api.js` yang sudah dibuat.

📖 **Mulai dari [FRONTEND_INTEGRATION.md](lms_backend/FRONTEND_INTEGRATION.md)**

