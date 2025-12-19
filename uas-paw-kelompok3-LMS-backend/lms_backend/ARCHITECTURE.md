# 🏗️ Arsitektur Backend LMS

## Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                         │
│                     http://localhost:3000                        │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  AuthPage    │  │BookManagement│  │ PeminjamanBuku│          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬────────┘          │
│         │                 │                  │                   │
│         └─────────────────┴──────────────────┘                   │
│                           │                                      │
│                    ┌──────▼──────┐                               │
│                    │ api.js      │                               │
│                    │ (Services)  │                               │
│                    └──────┬──────┘                               │
└───────────────────────────┼──────────────────────────────────────┘
                            │
                        HTTP/JSON
                    (CORS Enabled)
                            │
┌───────────────────────────▼──────────────────────────────────────┐
│                      BACKEND (Pyramid)                            │
│                   http://localhost:6543/api                       │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    __init__.py                           │    │
│  │         (Application Config + CORS Setup)                │    │
│  └─────────────────────┬───────────────────────────────────┘    │
│                        │                                          │
│  ┌─────────────────────▼───────────────────────────────────┐    │
│  │                    routes.py                             │    │
│  │              (URL Routing Definitions)                   │    │
│  └─────┬─────────────┬─────────────┬──────────────────────┘    │
│        │             │             │                             │
│  ┌─────▼────┐  ┌────▼────┐  ┌────▼────┐                        │
│  │ auth.py  │  │books.py │  │borrowing│                         │
│  │          │  │         │  │  .py    │                         │
│  │ Register │  │  CRUD   │  │  CRUD   │                         │
│  │  Login   │  │ Books   │  │Borrowing│                         │
│  └─────┬────┘  └────┬────┘  └────┬────┘                         │
│        │            │            │                               │
│        └────────────┴────────────┘                               │
│                     │                                            │
│  ┌──────────────────▼────────────────────────────────────┐      │
│  │              models/__init__.py                        │      │
│  │              (SQLAlchemy Setup)                        │      │
│  └──────────────────┬────────────────────────────────────┘      │
│                     │                                            │
│  ┌──────────────────▼────────────────────────────────────┐      │
│  │                 models.py                              │      │
│  │                                                        │      │
│  │  ┌──────┐  ┌──────┐  ┌─────────┐  ┌──────────┐      │      │
│  │  │ User │  │ Book │  │ Author  │  │ Category │      │      │
│  │  └──────┘  └──┬───┘  └────┬────┘  └────┬─────┘      │      │
│  │             │          │             │               │      │
│  │  ┌──────────▼──────────┴──────────────┘               │      │
│  │  │         Borrowing                                  │      │
│  │  └────────────────────────────────────────────────────┘      │
│  └───────────────────────┬───────────────────────────────┘      │
└────────────────────────────┼────────────────────────────────────┘
                             │
                       SQLAlchemy ORM
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    PostgreSQL Database                           │
│                        lms-frand                                 │
│                                                                   │
│  ┌──────┐  ┌──────┐  ┌─────────┐  ┌──────────┐  ┌──────────┐  │
│  │users │  │books │  │ authors │  │categories│  │borrowings│  │
│  └──────┘  └──────┘  └─────────┘  └──────────┘  └──────────┘  │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

---

## 📦 Layer Architecture

### 1. Presentation Layer (Frontend - React)

**Location:** `lms_03/src/`

```
src/
├── pages/                  # Page Components
│   ├── AuthPage.js        # Login/Register
│   ├── BookManagement.js  # Book CRUD (Librarian)
│   └── PeminjamanBuku.js  # Borrowing Management
│
├── components/            # Reusable Components
│   ├── auth/             # Auth-related components
│   └── layout/           # Layout components
│
└── services/
    └── api.js            # ⭐ API Service Layer
                          # - AuthService
                          # - BookService
                          # - BorrowingService
                          # - CategoryService
```

**Responsibilities:**
- User interface & interaction
- Form validation
- State management
- Call API services
- Display data

---

### 2. API Layer (Services)

**Location:** `lms_03/src/services/api.js`

```javascript
// Centralized API configuration
API_BASE_URL = 'http://localhost:6543/api'

// Service Classes:
├── AuthService
│   ├── register(userData)
│   └── login(email, password)
│
├── BookService
│   ├── getAll(search, category)
│   ├── getById(id)
│   ├── create(bookData)
│   ├── update(id, bookData)
│   └── delete(id)
│
├── CategoryService
│   └── getAll()
│
└── BorrowingService
    ├── getAll(search, status)
    ├── getById(id)
    ├── create(borrowingData)
    ├── returnBook(id)
    └── delete(id)
```

**Responsibilities:**
- HTTP requests to backend
- Error handling
- Data transformation
- Request/Response formatting

---

### 3. Application Layer (Backend - Pyramid)

**Location:** `lms_backend/lms_api/lms_api/`

#### 3.1 Configuration Layer

```python
__init__.py
├── CORS Configuration
│   ├── Allow all origins
│   ├── Allow methods (GET, POST, PUT, DELETE, OPTIONS)
│   └── Handle preflight requests
│
└── Application Setup
    ├── Pyramid Configuration
    ├── Include routes
    └── Include models
```

#### 3.2 Routing Layer

```python
routes.py
├── Authentication Routes
│   ├── /api/auth/register  → auth.register
│   └── /api/auth/login     → auth.login
│
├── Books Routes
│   ├── /api/books                    → books.list_books
│   ├── /api/books/{id}               → books.get_book_detail
│   ├── /api/books (POST)             → books.create_book
│   ├── /api/books/{id} (PUT)         → books.update_book
│   └── /api/books/{id} (DELETE)      → books.delete_book
│
├── Category Routes
│   └── /api/categories               → books.list_categories
│
└── Borrowing Routes
    ├── /api/borrowings                  → borrowing.list_borrowings
    ├── /api/borrowings/{id}             → borrowing.get_borrowing_detail
    ├── /api/borrowings (POST)           → borrowing.create_borrowing
    ├── /api/borrowings/{id}/return      → borrowing.return_borrowing
    └── /api/borrowings/{id} (DELETE)    → borrowing.delete_borrowing
```

#### 3.3 Controller Layer (Views)

```python
views/
├── auth.py
│   ├── register()
│   │   ├── Validate input
│   │   ├── Check email uniqueness
│   │   ├── Hash password (bcrypt)
│   │   └── Create user
│   │
│   └── login()
│       ├── Validate credentials
│       ├── Verify password (bcrypt)
│       └── Return user data
│
├── books.py
│   ├── list_books()        # GET with search & filter
│   ├── get_book_detail()   # GET by ID
│   ├── create_book()       # POST - Add new book
│   ├── update_book()       # PUT - Update book
│   ├── delete_book()       # DELETE - Remove book
│   └── list_categories()   # GET categories
│
└── borrowing.py
    ├── list_borrowings()       # GET with filter
    ├── get_borrowing_detail()  # GET by ID
    ├── create_borrowing()      # POST - New borrowing
    │   └── Update book.available--
    ├── return_borrowing()      # POST - Return book
    │   └── Update book.available++
    └── delete_borrowing()      # DELETE
```

**Responsibilities:**
- Request handling
- Business logic
- Input validation
- Database operations via ORM
- Response formatting

---

### 4. Data Access Layer (Models)

**Location:** `lms_backend/lms_api/lms_api/models/`

```python
models.py

Enums:
├── UserRole          (member, librarian)
└── BorrowingStatus   (Dipinjam, Dikembalikan, Terlambat)

Models:
├── User
│   ├── id (PK)
│   ├── name
│   ├── email (unique)
│   ├── password (hashed)
│   ├── role (enum)
│   └── borrowings (relationship)
│
├── Author
│   ├── id (PK)
│   ├── name (unique)
│   └── books (relationship)
│
├── Category
│   ├── id (PK)
│   ├── name (unique)
│   └── books (relationship)
│
├── Book
│   ├── id (PK)
│   ├── isbn (unique)
│   ├── title
│   ├── author_id (FK → authors)
│   ├── category_id (FK → categories)
│   ├── copies (total)
│   ├── available (current)
│   ├── author (relationship)
│   ├── category (relationship)
│   └── borrowings (relationship)
│
└── Borrowing
    ├── id (PK)
    ├── kode_transaksi (unique)
    ├── user_id (FK → users)
    ├── book_id (FK → books)
    ├── nama_peminjam
    ├── no_telp
    ├── tgl_pinjam
    ├── tgl_kembali_rencana
    ├── tgl_kembali_aktual
    ├── status (enum)
    ├── user (relationship)
    └── book (relationship)
```

**Responsibilities:**
- Database schema definition
- Relationships between tables
- Data validation constraints
- ORM mapping

---

### 5. Database Layer

**PostgreSQL Database:** `lms-frand`

```sql
Tables & Relationships:

users (1) ────< (N) borrowings (N) >──── (1) books
                                              │
                                              ├──── (1) authors
                                              └──── (1) categories

Primary Keys:
- users.id
- books.id
- authors.id
- categories.id
- borrowings.id

Foreign Keys:
- books.author_id → authors.id
- books.category_id → categories.id
- borrowings.user_id → users.id
- borrowings.book_id → books.id

Unique Constraints:
- users.email
- books.isbn
- authors.name
- categories.name
- borrowings.kode_transaksi
```

---

## 🔄 Request Flow Example

### Example: Login Request

```
1. USER ACTION
   ├─ User enters email & password
   └─ Clicks "Login" button

2. FRONTEND (AuthPage.js)
   ├─ Validate form inputs
   ├─ Call: AuthService.login(email, password)
   └─ Show loading state

3. API SERVICE (api.js)
   ├─ Prepare request
   │  ├─ URL: http://localhost:6543/api/auth/login
   │  ├─ Method: POST
   │  ├─ Headers: Content-Type: application/json
   │  └─ Body: { email, password }
   ├─ Send HTTP request
   └─ Handle response

4. BACKEND - ROUTING (routes.py)
   ├─ Match route: /api/auth/login
   └─ Forward to: auth.login()

5. BACKEND - CONTROLLER (auth.py)
   ├─ Get request.json_body
   ├─ Validate inputs
   ├─ Query database for user by email
   ├─ Verify password with bcrypt
   └─ Return user data

6. DATABASE (PostgreSQL)
   ├─ Execute: SELECT * FROM users WHERE email = ?
   └─ Return user record

7. BACKEND RESPONSE
   ├─ Status: 200 OK
   └─ JSON: { message, user: { id, name, email, role } }

8. FRONTEND RECEIVES RESPONSE
   ├─ Check result.success
   ├─ Store user in localStorage
   ├─ Redirect to dashboard
   └─ Show success message
```

---

## 🔐 Security Features

### 1. Password Security
```python
# Registration
password → bcrypt.hashpw() → hashed_password → DB

# Login
input_password → bcrypt.checkpw(input, stored_hash) → True/False
```

### 2. CORS Protection
```python
# Configured in __init__.py
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

### 3. Input Validation
```python
# All endpoints validate:
- Required fields
- Data types
- Unique constraints
- Foreign key references
```

---

## 📊 Data Flow Patterns

### 1. Create Operation (POST)
```
Frontend Form → API Service → Backend Controller
                                    ↓
                              Validate Input
                                    ↓
                              Check Constraints
                                    ↓
                             Create Database Record
                                    ↓
                              Return Created Object
                                    ↓
Frontend Updates UI ← API Service ← Backend Response
```

### 2. Read Operation (GET)
```
Frontend Component → API Service → Backend Controller
                                         ↓
                                   Build Query
                                         ↓
                                   Apply Filters
                                         ↓
                                  Execute Query
                                         ↓
                                  Format Response
                                         ↓
Frontend Displays Data ← API Service ← Backend Response
```

### 3. Update Operation (PUT)
```
Frontend Form → API Service → Backend Controller
                                    ↓
                              Find Record by ID
                                    ↓
                              Validate Changes
                                    ↓
                              Update Database
                                    ↓
                              Return Updated Object
                                    ↓
Frontend Updates UI ← API Service ← Backend Response
```

### 4. Delete Operation (DELETE)
```
Frontend Confirm → API Service → Backend Controller
                                       ↓
                                 Find Record
                                       ↓
                                 Check Dependencies
                                       ↓
                                 Delete Record
                                       ↓
                                 Return Success
                                       ↓
Frontend Removes Item ← API Service ← Backend Response
```

---

## 🚀 Deployment Architecture

```
┌────────────────────────────────────────────────────────────┐
│                    PRODUCTION                               │
│                                                             │
│  ┌──────────────┐              ┌──────────────┐           │
│  │   Frontend   │              │   Backend    │           │
│  │  (Netlify/   │              │  (Heroku/    │           │
│  │   Vercel)    │ ──HTTP──>   │   AWS/DO)    │           │
│  │              │              │              │           │
│  │ Static HTML/ │              │ Pyramid App  │           │
│  │  JS/CSS      │              │ + Gunicorn   │           │
│  └──────────────┘              └──────┬───────┘           │
│                                       │                    │
│                                 ┌─────▼──────┐            │
│                                 │ PostgreSQL │            │
│                                 │  Database  │            │
│                                 └────────────┘            │
└────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure Summary

```
uas-paw-kelompok3-LMS/
│
├── lms_03/                          # FRONTEND
│   └── src/
│       ├── services/
│       │   └── api.js              # ⭐ API Services
│       ├── pages/                   # Page Components
│       └── components/              # Reusable Components
│
└── lms_backend/                     # BACKEND
    ├── API_DOCUMENTATION.md         # 📚 API Docs
    ├── QUICK_START.md               # 🚀 Setup Guide
    ├── FRONTEND_INTEGRATION.md      # 🔗 Integration Guide
    │
    └── lms_api/
        └── lms_api/
            ├── __init__.py          # App Config + CORS
            ├── routes.py            # URL Routing
            ├── models/
            │   └── models.py        # Database Models
            ├── views/
            │   ├── auth.py          # Auth Endpoints
            │   ├── books.py         # Books Endpoints
            │   └── borrowing.py     # Borrowing Endpoints
            └── scripts/
                └── init_database.py # DB Initialization
```

---

## 🎯 Key Features Summary

### ✅ Implemented
1. **Complete REST API** (15+ endpoints)
2. **Database Models** with relationships
3. **Authentication** (bcrypt password hashing)
4. **CRUD Operations** for Books & Borrowings
5. **Search & Filter** functionality
6. **Stock Management** (available tracking)
7. **Status Tracking** for borrowings
8. **CORS Support** for frontend
9. **Error Handling** & validation
10. **API Documentation** complete

### 🔄 To Implement (Frontend)
1. Connect pages to API services
2. Remove dummy data
3. User session management
4. Protected routes
5. Loading states & error displays

---

**📖 Untuk detail lengkap, lihat:**
- [API_DOCUMENTATION.md](../API_DOCUMENTATION.md)
- [QUICK_START.md](../QUICK_START.md)
- [FRONTEND_INTEGRATION.md](../FRONTEND_INTEGRATION.md)
