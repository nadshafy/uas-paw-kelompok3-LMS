# 🚀 LMS Backend API - Setup Guide

Backend API untuk Library Management System menggunakan Pyramid Framework dan PostgreSQL.

---

## 📋 Prerequisites

Pastikan sudah terinstall:
- Python 3.8+
- PostgreSQL 12+
- pip (Python package manager)

---

## 🔧 Installation & Setup

### 1. Setup Database PostgreSQL

Buat database baru:
```bash
psql -U postgres
CREATE DATABASE lms_database;
\q
```

### 2. Import Schema Database

```bash
psql -U postgres -d lms_database -f lms_api/LMS.sql
```

### 3. Setup Virtual Environment

```bash
cd lms_backend/lms_api
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 4. Install Dependencies

```bash
pip install -e .
```

Dependencies yang akan diinstall:
- pyramid
- pyramid-debugtoolbar
- waitress
- SQLAlchemy
- psycopg2-binary
- bcrypt
- pyramid-tm
- zope.sqlalchemy

### 5. Konfigurasi Database Connection

Edit file `development.ini`:

```ini
sqlalchemy.url = postgresql://postgres:your_password@localhost:5432/lms_database
```

Ganti `your_password` dengan password PostgreSQL Anda.

---

## ▶️ Running the Server

### Development Mode

```bash
pserve development.ini --reload
```

Server akan berjalan di: `http://localhost:6543`

### Production Mode

```bash
pserve production.ini
```

---

## 🧪 Testing API

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

### Test Get Books

```bash
curl http://localhost:6543/api/books
```

---

## 📁 Project Structure

```
lms_backend/lms_api/
├── lms_api/
│   ├── __init__.py              # Main app configuration & CORS
│   ├── routes.py                # All API routes
│   ├── models/
│   │   ├── models.py            # Database models
│   │   └── meta.py              # SQLAlchemy base
│   ├── views/
│   │   ├── auth.py              # Authentication APIs
│   │   ├── books.py             # Book management APIs
│   │   ├── borrowing.py         # Borrowing management APIs
│   │   ├── statistics.py        # Statistics & Dashboard APIs
│   │   └── debug.py             # Debug endpoints
│   └── scripts/
│       └── init_database.py     # Database initialization
├── development.ini              # Development config
├── production.ini               # Production config
├── setup.py                     # Package setup
└── LMS.sql                      # Database schema
```

---

## 🗄️ Database Models

### Users
- id, name, email, password (hashed), role

### Authors
- id, name

### Categories
- id, name

### Books
- id, title, author_id, category_id, description, stock

### Borrowings
- id, member_id, book_id, borrow_date, due_date, return_date, fine

---

## 📡 Available API Endpoints

Lihat dokumentasi lengkap di [API_ENDPOINTS.md](API_ENDPOINTS.md)

**Summary:**
- **Authentication**: `/api/auth/register`, `/api/auth/login`
- **Users**: `/api/users`, `/api/users/{id}`
- **Books**: `/api/books`, `/api/books/{id}`, `/api/categories`
- **Borrowings**: `/api/borrowings`, `/api/borrowings/{id}`, `/api/borrowings/{id}/return`
- **Dashboard**: `/api/statistics`, `/api/dashboard/librarian`, `/api/dashboard/member/{id}`
- **Debug**: `/api/debug/db-check`

---

## 🔐 Security Features

- ✅ Password hashing dengan bcrypt
- ✅ CORS configuration untuk frontend
- ✅ Input validation
- ✅ SQL injection protection (SQLAlchemy ORM)
- ✅ Error handling

---

## 🌐 CORS Configuration

CORS sudah dikonfigurasi untuk:
- **Allowed Origins**: `http://localhost:3000`
- **Allowed Methods**: GET, POST, PUT, DELETE, OPTIONS
- **Allowed Headers**: Content-Type, Authorization

Edit di `lms_api/__init__.py` jika perlu mengubah konfigurasi.

---

## 🛠️ Common Issues & Solutions

### Issue: Database connection failed

**Solution:**
1. Pastikan PostgreSQL sudah berjalan
2. Cek username, password, dan database name di `development.ini`
3. Test koneksi: `psql -U postgres -d lms_database`

### Issue: Port 6543 already in use

**Solution:**
```bash
# Windows
netstat -ano | findstr :6543
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :6543
kill -9 <PID>
```

### Issue: Module not found

**Solution:**
```bash
# Pastikan virtual environment aktif
pip install -e .
```

---

## 📝 Environment Variables

Anda bisa menggunakan environment variables untuk konfigurasi sensitif:

```bash
# Windows
set DB_USER=postgres
set DB_PASSWORD=your_password
set DB_HOST=localhost
set DB_PORT=5432
set DB_NAME=lms_database

# Linux/Mac
export DB_USER=postgres
export DB_PASSWORD=your_password
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=lms_database
```

---

## 🔄 Database Migration

Jika ada perubahan schema:

```bash
# Backup database dulu
pg_dump -U postgres lms_database > backup.sql

# Import schema baru
psql -U postgres -d lms_database -f lms_api/LMS.sql
```

---

## 📊 Monitoring & Logging

Logs akan muncul di terminal saat development mode.

Untuk production, log akan disimpan sesuai konfigurasi di `production.ini`.

---

## 🚀 Deployment

### Using Waitress (Production WSGI Server)

```bash
pserve production.ini
```

### Using Docker (Optional)

```dockerfile
FROM python:3.9
WORKDIR /app
COPY . .
RUN pip install -e .
CMD ["pserve", "production.ini"]
```

---

## 👥 Default Users

Setelah import database, tersedia user default:

**Librarian:**
- Email: `finaltest@example.com`
- Password: `testpass123`

**Member:**
- Email: `member@example.com`
- Password: `password123`

---

## 📚 Additional Documentation

- [API Endpoints](API_ENDPOINTS.md) - Daftar lengkap semua endpoints
- [API Documentation](API_DOCUMENTATION.md) - Dokumentasi lengkap dengan contoh
- [Architecture](ARCHITECTURE.md) - Arsitektur sistem
- [Frontend Integration](FRONTEND_INTEGRATION.md) - Integrasi dengan React

---

## 🤝 Contributing

Untuk development:
1. Fork repository
2. Buat branch baru
3. Commit changes
4. Push dan buat Pull Request

---

## 📄 License

MIT License

---

## 💡 Tips

- Gunakan `--reload` flag saat development untuk auto-reload
- Test API dengan Postman atau Thunder Client
- Lihat dokumentasi Pyramid: https://docs.pylonsproject.org/
- Gunakan PostgreSQL GUI seperti pgAdmin untuk manage database

---

**Happy Coding! 🎉**
