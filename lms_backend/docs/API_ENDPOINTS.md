# 📚 LMS API - Complete Endpoints Documentation

## Base URL
```
http://localhost:6543/api
```

---

## 🔐 Authentication APIs

### 1. Register User
**POST** `/api/auth/register`

Register user baru (member atau librarian).

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@mail.com",
  "password": "password123",
  "role": "member"
}
```

**Response (201):**
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

---

### 2. Login
**POST** `/api/auth/login`

Login user dan dapatkan informasi user.

**Request Body:**
```json
{
  "email": "john@mail.com",
  "password": "password123"
}
```

**Response (200):**
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

## 👥 User Management APIs

### 3. Get All Users
**GET** `/api/users`

Mendapatkan daftar semua users.

**Response (200):**
```json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@mail.com",
      "role": "member"
    }
  ]
}
```

---

### 4. Get User Detail
**GET** `/api/users/{id}`

Mendapatkan detail user berdasarkan ID.

**Response (200):**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@mail.com",
    "role": "member"
  }
}
```

---

### 5. Update User Password
**PUT** `/api/users/{id}`

Update password user.

**Request Body:**
```json
{
  "password": "newpassword123"
}
```

**Response (200):**
```json
{
  "message": "Password berhasil diupdate"
}
```

---

### 6. Delete User
**DELETE** `/api/users/{id}`

Menghapus user berdasarkan ID.

**Response (200):**
```json
{
  "message": "User berhasil dihapus"
}
```

---

## 📚 Book Management APIs

### 7. Get All Books
**GET** `/api/books`

Mendapatkan daftar buku dengan filter opsional.

**Query Parameters:**
- `search` (optional): Cari berdasarkan judul, pengarang, atau kategori
- `category` (optional): Filter berdasarkan kategori (default: "all")

**Example:**
```
GET /api/books?search=harry&category=fiction
```

**Response (200):**
```json
{
  "books": [
    {
      "id": 1,
      "title": "Harry Potter",
      "author": "J.K. Rowling",
      "category": "Fiction",
      "description": "A magical story...",
      "stock": 5
    }
  ]
}
```

---

### 8. Get Book Detail
**GET** `/api/books/{id}`

Mendapatkan detail buku berdasarkan ID.

**Response (200):**
```json
{
  "book": {
    "id": 1,
    "title": "Harry Potter",
    "author": "J.K. Rowling",
    "category": "Fiction",
    "description": "A magical story...",
    "stock": 5
  }
}
```

---

### 9. Create Book
**POST** `/api/books`

Menambahkan buku baru.

**Request Body:**
```json
{
  "title": "Harry Potter",
  "author": "J.K. Rowling",
  "category": "Fiction",
  "description": "A magical story...",
  "stock": 5
}
```

**Response (201):**
```json
{
  "message": "Buku berhasil ditambahkan",
  "book": {
    "id": 1,
    "title": "Harry Potter",
    "author": "J.K. Rowling",
    "category": "Fiction",
    "description": "A magical story...",
    "stock": 5
  }
}
```

---

### 10. Update Book
**PUT** `/api/books/{id}`

Mengupdate data buku.

**Request Body:**
```json
{
  "title": "Harry Potter - Updated",
  "author": "J.K. Rowling",
  "category": "Fantasy",
  "description": "An updated description...",
  "stock": 10
}
```

**Response (200):**
```json
{
  "message": "Buku berhasil diupdate",
  "book": {
    "id": 1,
    "title": "Harry Potter - Updated",
    "author": "J.K. Rowling",
    "category": "Fantasy",
    "description": "An updated description...",
    "stock": 10
  }
}
```

---

### 11. Delete Book
**DELETE** `/api/books/{id}`

Menghapus buku. Tidak bisa dihapus jika sedang dipinjam.

**Response (200):**
```json
{
  "message": "Buku berhasil dihapus"
}
```

---

### 12. Get All Categories
**GET** `/api/categories`

Mendapatkan daftar semua kategori buku.

**Response (200):**
```json
{
  "categories": [
    "Fiction",
    "Non-Fiction",
    "Science",
    "History"
  ]
}
```

---

## 📖 Borrowing Management APIs

### 13. Get All Borrowings
**GET** `/api/borrowings`

Mendapatkan daftar peminjaman dengan filter opsional.

**Query Parameters:**
- `search` (optional): Cari berdasarkan nama member atau judul buku

**Response (200):**
```json
{
  "borrowings": [
    {
      "id": 1,
      "member_id": 1,
      "member_name": "John Doe",
      "book_id": 1,
      "book_title": "Harry Potter",
      "author": "J.K. Rowling",
      "category": "Fiction",
      "borrow_date": "2025-12-15",
      "due_date": "2025-12-22",
      "return_date": null,
      "fine": 0,
      "status": "Dipinjam"
    }
  ]
}
```

---

### 14. Get Borrowing Detail
**GET** `/api/borrowings/{id}`

Mendapatkan detail peminjaman berdasarkan ID.

**Response (200):**
```json
{
  "borrowing": {
    "id": 1,
    "member_id": 1,
    "member_name": "John Doe",
    "book_id": 1,
    "book_title": "Harry Potter",
    "author": "J.K. Rowling",
    "category": "Fiction",
    "borrow_date": "2025-12-15",
    "due_date": "2025-12-22",
    "return_date": null,
    "fine": 0,
    "status": "Dipinjam"
  }
}
```

---

### 15. Create Borrowing
**POST** `/api/borrowings`

Membuat peminjaman buku baru. Akan mengurangi stok buku.

**Request Body:**
```json
{
  "member_id": 1,
  "book_id": 1,
  "borrow_date": "2025-12-15",
  "due_date": "2025-12-22"
}
```

**Note:**
- `borrow_date` optional (default: hari ini)
- `due_date` optional (default: 7 hari dari borrow_date)

**Response (201):**
```json
{
  "message": "Peminjaman berhasil dibuat",
  "borrowing": {
    "id": 1,
    "member_id": 1,
    "book_id": 1,
    "book_title": "Harry Potter",
    "borrow_date": "2025-12-15",
    "due_date": "2025-12-22",
    "status": "Dipinjam"
  }
}
```

---

### 16. Return Borrowing
**POST** `/api/borrowings/{id}/return`

Mengembalikan buku. Akan menghitung denda jika terlambat (Rp 1000/hari).

**Response (200):**
```json
{
  "message": "Buku berhasil dikembalikan",
  "borrowing": {
    "id": 1,
    "return_date": "2025-12-23",
    "fine": 1000,
    "status": "Dikembalikan"
  }
}
```

---

### 17. Delete Borrowing
**DELETE** `/api/borrowings/{id}`

Menghapus data peminjaman. Jika masih aktif, stok buku akan dikembalikan.

**Response (200):**
```json
{
  "message": "Data peminjaman berhasil dihapus"
}
```

---

## 📊 Statistics & Dashboard APIs

### 18. Get Statistics
**GET** `/api/statistics`

Mendapatkan statistik umum sistem LMS.

**Response (200):**
```json
{
  "statistics": {
    "total_books": 100,
    "total_stock": 500,
    "total_members": 50,
    "active_borrowings": 20,
    "returned_borrowings": 150,
    "total_fines": 50000,
    "popular_books": [
      {
        "title": "Harry Potter",
        "borrow_count": 25
      }
    ]
  }
}
```

---

### 19. Dashboard Librarian
**GET** `/api/dashboard/librarian`

Dashboard lengkap untuk librarian dengan statistik detail.

**Response (200):**
```json
{
  "dashboard": {
    "books": {
      "total": 100,
      "total_stock": 500,
      "categories": 10,
      "authors": 50,
      "low_stock": [
        {
          "id": 1,
          "title": "Harry Potter",
          "author": "J.K. Rowling",
          "stock": 2
        }
      ]
    },
    "users": {
      "total_members": 50,
      "total_librarians": 5
    },
    "borrowings": {
      "total": 200,
      "active": 20,
      "returned": 180,
      "late": 5,
      "today": 3,
      "returns_today": 2
    },
    "fines": {
      "total": 50000
    },
    "recent_borrowings": [],
    "popular_books": []
  }
}
```

---

### 20. Dashboard Member
**GET** `/api/dashboard/member/{id}`

Dashboard untuk member dengan data peminjaman pribadi.

**Response (200):**
```json
{
  "dashboard": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@mail.com",
      "role": "member"
    },
    "statistics": {
      "total_borrowings": 10,
      "active_borrowings": 2,
      "returned_borrowings": 8,
      "late_borrowings": 1,
      "total_fines": 5000
    },
    "active_borrowings": [
      {
        "id": 1,
        "book_id": 1,
        "book_title": "Harry Potter",
        "author": "J.K. Rowling",
        "category": "Fiction",
        "borrow_date": "2025-12-15",
        "due_date": "2025-12-22",
        "is_late": false
      }
    ],
    "borrowing_history": [],
    "available_books": []
  }
}
```

---

## 🐛 Debug APIs

### 21. Database Check
**GET** `/api/debug/db-check`

Cek koneksi database dan informasi dasar.

**Response (200):**
```json
{
  "db_info": {
    "db": "lms_database",
    "schema": "public",
    "server_ip": "127.0.0.1",
    "server_port": 5432,
    "version": "PostgreSQL 15.0"
  },
  "users_count": 10,
  "last_users": []
}
```

---

## Error Responses

Semua endpoint dapat mengembalikan error dengan format:

**400 Bad Request:**
```json
{
  "error": "Pesan error validasi"
}
```

**404 Not Found:**
```json
{
  "error": "Resource tidak ditemukan"
}
```

**409 Conflict:**
```json
{
  "error": "Data sudah ada (conflict)"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Terjadi kesalahan server"
}
```

---

## CORS Configuration

API ini sudah dikonfigurasi dengan CORS yang memperbolehkan:
- Origins: `http://localhost:3000`
- Methods: GET, POST, PUT, DELETE, OPTIONS
- Headers: Content-Type, Authorization

---

## Testing dengan cURL

**Login:**
```bash
curl -X POST http://localhost:6543/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"finaltest@example.com","password":"testpass123"}'
```

**Get Books:**
```bash
curl http://localhost:6543/api/books
```

**Create Borrowing:**
```bash
curl -X POST http://localhost:6543/api/borrowings \
  -H "Content-Type: application/json" \
  -d '{"member_id":1,"book_id":1}'
```

---

## Summary

✅ **Total Endpoints: 21**

- Authentication: 2 endpoints
- User Management: 4 endpoints
- Book Management: 6 endpoints
- Borrowing Management: 5 endpoints
- Statistics & Dashboard: 3 endpoints
- Debug: 1 endpoint

Semua API sudah siap digunakan dan terintegrasi dengan frontend React! 🚀
