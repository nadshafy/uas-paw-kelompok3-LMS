# 📚 LMS Backend API Documentation

## Arsitektur Backend LMS

Backend ini dibangun menggunakan **Pyramid Framework** dengan database **PostgreSQL**.

### 🏗️ Struktur Arsitektur

```
lms_backend/lms_api/
├── lms_api/
│   ├── __init__.py          # Konfigurasi aplikasi & CORS
│   ├── routes.py            # Definisi semua routes/endpoints
│   ├── models/
│   │   ├── __init__.py      # Setup SQLAlchemy
│   │   ├── meta.py          # Base model
│   │   ├── models.py        # Database models (User, Book, Borrowing, dll)
│   │   └── mymodel.py
│   ├── views/
│   │   ├── auth.py          # API Authentication (Register, Login)
│   │   ├── books.py         # API Manajemen Buku
│   │   ├── borrowing.py     # API Peminjaman Buku
│   │   ├── debug.py         # Debug endpoints
│   │   └── default.py
│   └── scripts/
│       ├── init_database.py # Script inisialisasi database
│       └── initialize_db.py
├── setup.py                 # Package configuration
└── development.ini          # Development settings
```

---

## 📊 Database Models

### 1. **User** (Pengguna)
- `id`: Primary key
- `name`: Nama lengkap
- `email`: Email (unique)
- `password`: Password (hashed with bcrypt)
- `role`: Enum (`member`, `librarian`)
- `created_at`: Timestamp

### 2. **Author** (Pengarang)
- `id`: Primary key
- `name`: Nama pengarang (unique)

### 3. **Category** (Kategori)
- `id`: Primary key
- `name`: Nama kategori (unique)

### 4. **Book** (Buku)
- `id`: Primary key
- `isbn`: ISBN buku (unique)
- `title`: Judul buku
- `author_id`: Foreign key ke Author
- `category_id`: Foreign key ke Category
- `copies`: Total salinan buku
- `available`: Jumlah tersedia
- `created_at`, `updated_at`: Timestamps

### 5. **Borrowing** (Peminjaman)
- `id`: Primary key
- `kode_transaksi`: Kode transaksi (unique)
- `user_id`: Foreign key ke User
- `book_id`: Foreign key ke Book
- `nama_peminjam`: Nama peminjam
- `no_telp`: Nomor telepon
- `tgl_pinjam`: Tanggal pinjam
- `tgl_kembali_rencana`: Tanggal rencana kembali
- `tgl_kembali_aktual`: Tanggal kembali actual (nullable)
- `status`: Enum (`Dipinjam`, `Dikembalikan`, `Terlambat`)
- `created_at`, `updated_at`: Timestamps

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:6543/api
```

---

## 🔐 Authentication APIs

### 1. Register
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@mail.com",
  "password": "password123",
  "role": "member"
}
```

**Response:**
```json
{
  "message": "register berhasil",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@mail.com",
    "role": "member"
  }
}
```

### 2. Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "john@mail.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "login berhasil",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@mail.com",
    "role": "member"
  }
}
```

---

## 📚 Books APIs

### 1. Get All Books
**GET** `/api/books`

**Query Parameters:**
- `search`: Cari berdasarkan judul, pengarang, atau ISBN (optional)
- `category`: Filter berdasarkan kategori (optional)

**Example:**
```
GET /api/books?search=atomic&category=Pengembangan Diri
```

**Response:**
```json
{
  "books": [
    {
      "id": 1,
      "isbn": "978-6028519943",
      "title": "Atomic Habits",
      "author": "James Clear",
      "category": "Pengembangan Diri",
      "copies": 5,
      "available": 3
    }
  ]
}
```

### 2. Get Book Detail
**GET** `/api/books/{id}`

**Response:**
```json
{
  "book": {
    "id": 1,
    "isbn": "978-6028519943",
    "title": "Atomic Habits",
    "author": "James Clear",
    "author_id": 1,
    "category": "Pengembangan Diri",
    "category_id": 1,
    "copies": 5,
    "available": 3
  }
}
```

### 3. Create Book
**POST** `/api/books`

**Request Body:**
```json
{
  "isbn": "978-1234567890",
  "title": "New Book Title",
  "author": "Author Name",
  "category": "Technology",
  "copies": 10
}
```

**Response:**
```json
{
  "message": "Buku berhasil ditambahkan",
  "book": {
    "id": 9,
    "isbn": "978-1234567890",
    "title": "New Book Title",
    "author": "Author Name",
    "category": "Technology",
    "copies": 10,
    "available": 10
  }
}
```

### 4. Update Book
**PUT** `/api/books/{id}`

**Request Body:**
```json
{
  "title": "Updated Title",
  "copies": 15
}
```

**Response:**
```json
{
  "message": "Buku berhasil diupdate",
  "book": { ... }
}
```

### 5. Delete Book
**DELETE** `/api/books/{id}`

**Response:**
```json
{
  "message": "Buku berhasil dihapus"
}
```

### 6. Get Categories
**GET** `/api/categories`

**Response:**
```json
{
  "categories": [
    "Pengembangan Diri",
    "Fiksi",
    "Sejarah",
    "Teknologi"
  ]
}
```

---

## 📖 Borrowing APIs

### 1. Get All Borrowings
**GET** `/api/borrowings`

**Query Parameters:**
- `search`: Cari berdasarkan nama, kode transaksi, atau judul buku (optional)
- `status`: Filter berdasarkan status (`Dipinjam`, `Dikembalikan`) (optional)

**Response:**
```json
{
  "borrowings": [
    {
      "id": 1,
      "kodeTransaksi": "TRX-1702025001",
      "nama": "Budi Santoso",
      "noTelp": "08123456789",
      "isbn": "978-6028519943",
      "judul": "Atomic Habits",
      "kategori": "Pengembangan Diri",
      "pengarang": "James Clear",
      "tglPinjam": "2025-12-10",
      "tglKembali": "2025-12-17",
      "tglKembaliAktual": null,
      "status": "Dipinjam"
    }
  ]
}
```

### 2. Get Borrowing Detail
**GET** `/api/borrowings/{id}`

**Response:**
```json
{
  "borrowing": {
    "id": 1,
    "kodeTransaksi": "TRX-1702025001",
    "nama": "Budi Santoso",
    ...
  }
}
```

### 3. Create Borrowing
**POST** `/api/borrowings`

**Request Body:**
```json
{
  "nama": "Budi Santoso",
  "noTelp": "08123456789",
  "isbn": "978-6028519943",
  "tglPinjam": "2025-12-18",
  "tglKembali": "2025-12-25",
  "userId": 1
}
```

**Response:**
```json
{
  "message": "Peminjaman berhasil dibuat",
  "borrowing": {
    "id": 3,
    "kodeTransaksi": "TRX-1734528000",
    "nama": "Budi Santoso",
    "noTelp": "08123456789",
    "isbn": "978-6028519943",
    "judul": "Atomic Habits",
    "tglPinjam": "2025-12-18",
    "tglKembali": "2025-12-25",
    "status": "Dipinjam"
  }
}
```

### 4. Return Book
**POST** `/api/borrowings/{id}/return`

**Response:**
```json
{
  "message": "Buku berhasil dikembalikan",
  "borrowing": {
    "id": 1,
    "kodeTransaksi": "TRX-1702025001",
    "status": "Dikembalikan",
    "tglKembaliAktual": "2025-12-18"
  }
}
```

### 5. Delete Borrowing
**DELETE** `/api/borrowings/{id}`

**Response:**
```json
{
  "message": "Data peminjaman berhasil dihapus"
}
```

---

## 🚀 Setup & Installation

### 1. Install Dependencies
```bash
cd lms_backend/lms_api
pip install -e .
```

### 2. Setup Database
Pastikan PostgreSQL sudah running dengan konfigurasi:
- Host: localhost
- Port: 5432
- Database: lms-frand
- User: postgres
- Password: (sesuai development.ini)

### 3. Initialize Database
```bash
init_database development.ini
```

Script ini akan:
- Drop semua tabel existing
- Membuat tabel baru
- Mengisi data dummy (users, books, borrowings)

### 4. Run Server
```bash
pserve development.ini --reload
```

Server akan berjalan di: `http://localhost:6543`

---

## 📝 Test Credentials

Setelah menjalankan `init_database`, gunakan credentials ini untuk testing:

**Librarian:**
- Email: `admin@library.com`
- Password: `admin123`

**Member:**
- Email: `budi@mail.com`
- Password: `member123`

---

## 🔧 CORS Configuration

CORS sudah dikonfigurasi di [__init__.py](lms_api/__init__.py) untuk mengizinkan:
- **Origin**: `*` (all origins)
- **Methods**: GET, POST, PUT, DELETE, OPTIONS
- **Headers**: Content-Type, Authorization

---

## 🎯 Integrasi dengan Frontend

Untuk menggunakan API di frontend React Anda, gunakan fetch atau axios:

### Example dengan Fetch:
```javascript
// Login
const response = await fetch('http://localhost:6543/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'budi@mail.com',
    password: 'member123'
  })
});
const data = await response.json();

// Get Books
const booksResponse = await fetch('http://localhost:6543/api/books');
const booksData = await booksResponse.json();
```

---

## 📂 File Penting

1. [models.py](lms_api/models/models.py) - Database models
2. [auth.py](lms_api/views/auth.py) - Authentication endpoints
3. [books.py](lms_api/views/books.py) - Books CRUD endpoints
4. [borrowing.py](lms_api/views/borrowing.py) - Borrowing endpoints
5. [routes.py](lms_api/routes.py) - Route definitions
6. [__init__.py](lms_api/__init__.py) - App config & CORS
7. [init_database.py](lms_api/scripts/init_database.py) - Database initialization

---

## 🐛 Troubleshooting

### Error: "module 'bcrypt' has no attribute 'hashpw'"
```bash
pip uninstall bcrypt
pip install bcrypt
```

### Error: "database does not exist"
Buat database terlebih dahulu:
```bash
createdb lms-frand
```

### CORS Error
Pastikan CORS sudah dikonfigurasi dengan benar di `__init__.py` dan server backend sudah running.

---

## 📞 Support

Jika ada pertanyaan atau masalah, silakan buat issue atau hubungi developer.
