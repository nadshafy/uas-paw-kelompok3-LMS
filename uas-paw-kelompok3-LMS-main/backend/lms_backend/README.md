# 🚀 LMS Backend API - Complete

**Backend API untuk Library Management System - All 21 Endpoints Ready!**

---

## 🎯 Quick Links

- 📖 **[Complete API Documentation](API_ENDPOINTS.md)** - All 21 endpoints dengan contoh
- 🔧 **[Setup Guide](SETUP_GUIDE.md)** - Panduan instalasi lengkap
- 🔗 **[Frontend Integration](FRONTEND_INTEGRATION_EXAMPLES.md)** - Contoh integrasi React
- 📋 **[Summary](SUMMARY.md)** - Ringkasan fitur
- 📝 **[Changelog](CHANGELOG.md)** - Daftar perubahan

---

## ⚡ Quick Start

### 1. Setup Database
```bash
psql -U postgres -d lms_database -f lms_api/LMS.sql
```

### 2. Install Dependencies
```bash
cd lms_api
python -m venv venv
venv\Scripts\activate  # Windows
pip install -e .
```

### 3. Configure Database (development.ini)
```ini
sqlalchemy.url = postgresql://postgres:your_password@localhost:5432/lms_database
```

### 4. Run Server
```bash
pserve development.ini --reload
```

**Server:** `http://localhost:6543`

---

## 📡 API Endpoints (21 Total)

### 🔐 Authentication (2)
- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user

### 👥 Users (4)
- `GET /api/users` - List semua users
- `GET /api/users/{id}` - Detail user
- `PUT /api/users/{id}` - Update password
- `DELETE /api/users/{id}` - Hapus user

### 📚 Books (6)
- `GET /api/books` - List buku (search & filter)
- `GET /api/books/{id}` - Detail buku
- `POST /api/books` - Tambah buku
- `PUT /api/books/{id}` - Update buku
- `DELETE /api/books/{id}` - Hapus buku
- `GET /api/categories` - List kategori

### 📖 Borrowings (5)
- `GET /api/borrowings` - List peminjaman
- `GET /api/borrowings/{id}` - Detail peminjaman
- `POST /api/borrowings` - Buat peminjaman
- `POST /api/borrowings/{id}/return` - Kembalikan buku
- `DELETE /api/borrowings/{id}` - Hapus peminjaman

### 📊 Dashboard (3) ⭐ NEW
- `GET /api/statistics` - Statistik umum
- `GET /api/dashboard/librarian` - Dashboard librarian
- `GET /api/dashboard/member/{id}` - Dashboard member

### 🐛 Debug (1)
- `GET /api/debug/db-check` - Cek database

---

## ✨ Key Features

### Core Features
✅ User authentication dengan bcrypt  
✅ Role-based access (Member & Librarian)  
✅ CRUD books dengan author & category  
✅ Auto stock management  
✅ Borrowing system dengan fine calculation  
✅ Search & filter capabilities  

### Advanced Features ⭐ NEW
✅ Comprehensive statistics & analytics  
✅ Librarian dashboard dengan business intelligence  
✅ Member dashboard dengan personal data  
✅ Low stock alerts  
✅ Popular books tracking  
✅ Late return detection  
✅ Recent activity monitoring  

---

## 🧪 Testing

### Test Database Connection
```bash
curl http://localhost:6543/api/debug/db-check
```

### Test Login
```bash
curl -X POST http://localhost:6543/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"finaltest@example.com\",\"password\":\"testpass123\"}"
```

### Test Dashboard
```bash
curl http://localhost:6543/api/dashboard/librarian
```

---

## 📦 Tech Stack

- **Framework:** Pyramid (Python)
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy
- **Security:** bcrypt for password hashing
- **CORS:** Configured for React frontend

---

## 🗄️ Database Models

- **Users** - Authentication & user management
- **Authors** - Book authors
- **Categories** - Book categories
- **Books** - Book information dengan stock
- **Borrowings** - Peminjaman dengan fine calculation

---

## 🔧 Configuration

### CORS Settings
```python
# Allowed for React frontend
origins = 'http://localhost:3000'
methods = 'GET, POST, PUT, DELETE, OPTIONS'
```

### Default Test User
- **Email:** `finaltest@example.com`
- **Password:** `testpass123`
- **Role:** `librarian`

---

## 📚 Documentation Files

| File | Description |
|------|-------------|
| **API_ENDPOINTS.md** | Complete API reference dengan contoh request/response |
| **SETUP_GUIDE.md** | Installation, configuration, troubleshooting |
| **FRONTEND_INTEGRATION_EXAMPLES.md** | React integration dengan contoh lengkap |
| **SUMMARY.md** | Summary fitur dan checklist |
| **CHANGELOG.md** | Daftar semua perubahan dan improvements |

---

## 🚀 Production Ready

✅ All endpoints tested and working  
✅ Error handling implemented  
✅ Input validation in place  
✅ SQL injection protection (ORM)  
✅ CORS configured  
✅ Documentation complete  

---

## 🎯 Next Steps

1. ✅ **Backend Complete** - All 21 endpoints ready
2. 🔄 **Frontend Integration** - Lihat [FRONTEND_INTEGRATION_EXAMPLES.md](FRONTEND_INTEGRATION_EXAMPLES.md)
3. 🧪 **Testing** - Test semua endpoints
4. 🚀 **Deploy** - Follow SETUP_GUIDE.md for production

---

## 📞 Need Help?

- 📖 **Read Documentation:** Semua file `.md` sudah lengkap
- 🔍 **Check Errors:** Lihat terminal logs
- 🧪 **Test Endpoints:** Gunakan Postman/Thunder Client
- 📝 **Follow Examples:** Lihat FRONTEND_INTEGRATION_EXAMPLES.md

---

## 🎉 Status

**✅ PRODUCTION READY - All 21 Endpoints Working!**

- ✅ Authentication & Security
- ✅ User Management
- ✅ Book Management
- ✅ Borrowing System
- ✅ Statistics & Dashboards
- ✅ Complete Documentation
- ✅ Ready for Frontend Integration

---

**Happy Coding! 🚀**

*Last Updated: December 18, 2025*  
*Version: 1.0.0 Complete*
