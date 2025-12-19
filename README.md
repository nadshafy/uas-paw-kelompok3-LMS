# Library Management System

## Project Overview
Library Management System adalah aplikasi web full-stack yang dikembangkan sebagai bagian dari **Ujian Akhir Semester (UAS)** mata kuliah **Pengembangan Aplikasi Web (IF25-22014)**. Sistem ini bertujuan untuk membantu pengelolaan perpustakaan secara digital, mulai dari katalog buku, proses peminjaman dan pengembalian, hingga pencatatan riwayat transaksi.

Aplikasi ini dibangun menggunakan arsitektur **Full-Stack Web Application** dengan **ReactJS** sebagai frontend, **Python Pyramid** sebagai backend, dan **PostgreSQL** sebagai basis data.

---

## Study Case
- **Study Case Digit**: 7  
- **Studi Kasus**: Library Management System  

### Fitur Utama (Core Features)
Sistem ini mengimplementasikan seluruh fitur wajib sesuai ketentuan studi kasus digit 7:

1. **User Authentication**
   - Register dan Login
   - Role-based access: **Member** dan **Librarian**

2. **Book Management**
   - Librarian: CRUD data buku (title, author, ISBN, category, copies available)
   - Member: Browse katalog buku

3. **Borrowing System**
   - Member: Meminjam buku (maksimal 3 buku)
   - Librarian: Memproses permintaan peminjaman

4. **Return System**
   - Member: Mengembalikan buku
   - Librarian: Memproses pengembalian dan menghitung denda keterlambatan

5. **Search & Filter**
   - Pencarian buku berdasarkan judul, penulis, atau kategori

6. **History**
   - Member: Melihat riwayat peminjaman
   - Librarian: Melihat seluruh transaksi peminjaman dan pengembalian

---

## Tim Pengembang (Kelompok 3)

| Nama | NIM | Role |
|------|-----|------|
| Nadya Shafwa Yusuf | 123140167 | Team Leader, Database Specialist |
| Raisya Syifa Saleh | 123140169 | UI/UX Designer, Frontend 
| Atika Adelia | 123140172 | UI/UX Designer, Frontend |
| Muhammad Farhan Muzakhi | 123140075 | Backend Developer |
| Dyo D. C Bukit | 122140145 | Backend Developer |

---

## 🧩 Technology Stack

### Frontend
- ReactJS
- React Router
- CSS (Tailwind CSS)

### Backend
- Python 3
- Pyramid Framework
- SQLAlchemy ORM
- Alembic (Database Migration)

### Database
- PostgreSQL

---

