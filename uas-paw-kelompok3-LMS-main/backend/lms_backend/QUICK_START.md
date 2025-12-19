# LMS Backend - Quick Start Guide

## 📋 Prerequisites

1. Python 3.8 atau lebih tinggi
2. PostgreSQL 12 atau lebih tinggi
3. pip (Python package manager)

## 🚀 Installation Steps

### Step 1: Setup Virtual Environment (Recommended)

```powershell
# Buat virtual environment
python -m venv venv

# Aktifkan virtual environment
.\venv\Scripts\activate
```

### Step 2: Install Dependencies

```powershell
cd lms_backend\lms_api
pip install -e .
```

Dependencies yang akan diinstall:
- pyramid (Web framework)
- SQLAlchemy (ORM)
- bcrypt (Password hashing)
- psycopg2-binary (PostgreSQL driver)
- dan lainnya...

### Step 3: Setup Database

#### 3.1 Install PostgreSQL
Download dan install PostgreSQL dari: https://www.postgresql.org/download/

#### 3.2 Buat Database

Buka PostgreSQL command line atau pgAdmin, lalu jalankan:

```sql
CREATE DATABASE "lms-frand";
```

#### 3.3 Update Connection String (Optional)

Jika password PostgreSQL Anda berbeda, edit file `development.ini`:

```ini
sqlalchemy.url = postgresql+psycopg2://postgres:YOUR_PASSWORD@localhost:5432/lms-frand
```

### Step 4: Initialize Database

```powershell
# Jalankan script inisialisasi database
init_database development.ini
```

Script ini akan:
- ✅ Membuat semua tabel (users, books, authors, categories, borrowings)
- ✅ Mengisi data dummy (8 buku, 2 user, 2 peminjaman)
- ✅ Menampilkan test credentials

### Step 5: Start Server

```powershell
pserve development.ini --reload
```

Server akan berjalan di: **http://localhost:6543**

Test dengan membuka di browser: http://localhost:6543/api/books

## 🧪 Testing API

### Test dengan cURL (PowerShell):

```powershell
# Test Login
Invoke-RestMethod -Uri "http://localhost:6543/api/auth/login" -Method POST -ContentType "application/json" -Body '{"email":"budi@mail.com","password":"member123"}'

# Test Get Books
Invoke-RestMethod -Uri "http://localhost:6543/api/books" -Method GET

# Test Get Categories
Invoke-RestMethod -Uri "http://localhost:6543/api/categories" -Method GET
```

### Test dengan Browser:
- Books: http://localhost:6543/api/books
- Categories: http://localhost:6543/api/categories
- Borrowings: http://localhost:6543/api/borrowings

## 👤 Test Credentials

**Librarian (Admin):**
- Email: `admin@library.com`
- Password: `admin123`
- Role: `librarian`

**Member:**
- Email: `budi@mail.com`
- Password: `member123`
- Role: `member`

## 🔗 Menghubungkan dengan Frontend

Di frontend React Anda (`lms_03`), update base URL untuk API:

```javascript
// Buat file src/config/api.js
export const API_BASE_URL = 'http://localhost:6543/api';

// Contoh penggunaan
import { API_BASE_URL } from './config/api';

const login = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  });
  return await response.json();
};
```

## 📊 Available Endpoints

### Authentication
- `POST /api/auth/register` - Daftar user baru
- `POST /api/auth/login` - Login

### Books Management
- `GET /api/books` - List semua buku (dengan filter)
- `GET /api/books/{id}` - Detail buku
- `POST /api/books` - Tambah buku baru
- `PUT /api/books/{id}` - Update buku
- `DELETE /api/books/{id}` - Hapus buku
- `GET /api/categories` - List kategori

### Borrowing Management
- `GET /api/borrowings` - List peminjaman (dengan filter)
- `GET /api/borrowings/{id}` - Detail peminjaman
- `POST /api/borrowings` - Buat peminjaman baru
- `POST /api/borrowings/{id}/return` - Kembalikan buku
- `DELETE /api/borrowings/{id}` - Hapus peminjaman

Lihat dokumentasi lengkap di: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

## 🛠️ Development Commands

```powershell
# Aktifkan virtual environment
.\venv\Scripts\activate

# Start server dengan auto-reload
pserve development.ini --reload

# Reset database (hapus & buat ulang dengan data dummy)
init_database development.ini

# Deaktifkan virtual environment
deactivate
```

## 🐛 Common Issues

### Issue 1: "No module named 'lms_api'"
**Solution:** Pastikan Anda sudah menjalankan `pip install -e .` di folder `lms_api`

### Issue 2: "database 'lms-frand' does not exist"
**Solution:** Buat database terlebih dahulu dengan perintah SQL di PostgreSQL

### Issue 3: "bcrypt error"
**Solution:**
```powershell
pip uninstall bcrypt
pip install bcrypt
```

### Issue 4: "CORS error dari frontend"
**Solution:** CORS sudah dikonfigurasi otomatis. Pastikan backend running di port 6543

### Issue 5: "Address already in use"
**Solution:** Port 6543 sudah digunakan. Matikan process yang menggunakan port tersebut atau ubah port di `development.ini`

## 📁 Project Structure

```
lms_backend/lms_api/
├── development.ini          # Configuration file
├── setup.py                 # Package setup
└── lms_api/
    ├── __init__.py          # App initialization & CORS
    ├── routes.py            # URL routing
    ├── models/
    │   ├── __init__.py
    │   ├── models.py        # Database models
    │   └── meta.py
    ├── views/
    │   ├── auth.py          # Auth endpoints
    │   ├── books.py         # Books CRUD
    │   └── borrowing.py     # Borrowing management
    └── scripts/
        └── init_database.py # DB initialization
```

## 🎯 Next Steps

1. ✅ Backend sudah ready dengan semua endpoint
2. 🔄 Integrasikan dengan frontend React Anda
3. 🔐 Tambahkan session/JWT untuk authentication (optional)
4. 📝 Sesuaikan business logic sesuai kebutuhan
5. 🚀 Deploy ke production

## 📞 Support

Jika ada pertanyaan atau masalah, dokumentasi lengkap ada di [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

---

**Happy Coding! 🎉**
