# 🔗 Frontend Integration Guide

Panduan integrasi Backend API dengan Frontend React.

---

## 📡 API Base URL

```javascript
const API_BASE_URL = 'http://localhost:6543/api';
```

---

## 🔧 Setup Axios (Recommended)

### Install Axios
```bash
cd lms_03
npm install axios
```

### Create API Service (src/services/api.js)

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:6543/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.id) {
      config.headers['User-ID'] = user.id;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// User APIs
export const userAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  updatePassword: (id, password) => api.put(`/users/${id}`, { password }),
  delete: (id) => api.delete(`/users/${id}`),
};

// Book APIs
export const bookAPI = {
  getAll: (params = {}) => api.get('/books', { params }),
  getById: (id) => api.get(`/books/${id}`),
  create: (data) => api.post('/books', data),
  update: (id, data) => api.put(`/books/${id}`, data),
  delete: (id) => api.delete(`/books/${id}`),
  getCategories: () => api.get('/categories'),
};

// Borrowing APIs
export const borrowingAPI = {
  getAll: (params = {}) => api.get('/borrowings', { params }),
  getById: (id) => api.get(`/borrowings/${id}`),
  create: (data) => api.post('/borrowings', data),
  return: (id) => api.post(`/borrowings/${id}/return`),
  delete: (id) => api.delete(`/borrowings/${id}`),
};

// Dashboard APIs
export const dashboardAPI = {
  getStatistics: () => api.get('/statistics'),
  getLibrarianDashboard: () => api.get('/dashboard/librarian'),
  getMemberDashboard: (id) => api.get(`/dashboard/member/${id}`),
};

export default api;
```

---

## 📝 Usage Examples

### 1. Login Component

```javascript
import React, { useState } from 'react';
import { authAPI } from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authAPI.login({ email, password });
      const { user } = response.data;
      
      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      // Redirect based on role
      if (user.role === 'librarian') {
        window.location.href = '/dashboard/librarian';
      } else {
        window.location.href = '/dashboard/member';
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <div className="error">{error}</div>}
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

---

### 2. Book List Component

```javascript
import React, { useState, useEffect } from 'react';
import { bookAPI } from '../services/api';

function BookList() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
    loadCategories();
  }, [search, category]);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const response = await bookAPI.getAll({ search, category });
      setBooks(response.data.books);
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await bookAPI.getCategories();
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  return (
    <div>
      <div className="filters">
        <input 
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="book-grid">
          {books.map(book => (
            <div key={book.id} className="book-card">
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Category: {book.category}</p>
              <p>Stock: {book.stock}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

### 3. Create Borrowing Component

```javascript
import React, { useState, useEffect } from 'react';
import { borrowingAPI, bookAPI } from '../services/api';

function CreateBorrowing() {
  const [bookId, setBookId] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await bookAPI.getAll();
      setBooks(response.data.books.filter(b => b.stock > 0));
    } catch (error) {
      console.error('Error loading books:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await borrowingAPI.create({
        member_id: user.id,
        book_id: parseInt(bookId),
      });
      
      setSuccess('Buku berhasil dipinjam!');
      setError('');
      setTimeout(() => {
        window.location.href = '/borrowings';
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create borrowing');
      setSuccess('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      
      <select value={bookId} onChange={(e) => setBookId(e.target.value)} required>
        <option value="">Select Book</option>
        {books.map(book => (
          <option key={book.id} value={book.id}>
            {book.title} - Stock: {book.stock}
          </option>
        ))}
      </select>
      
      <button type="submit">Borrow Book</button>
    </form>
  );
}
```

---

### 4. Librarian Dashboard Component

```javascript
import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';

function LibrarianDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await dashboardAPI.getLibrarianDashboard();
      setDashboard(response.data.dashboard);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!dashboard) return <div>No data</div>;

  return (
    <div className="dashboard">
      <h1>Librarian Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Books</h3>
          <p className="stat-number">{dashboard.books.total}</p>
        </div>
        <div className="stat-card">
          <h3>Total Stock</h3>
          <p className="stat-number">{dashboard.books.total_stock}</p>
        </div>
        <div className="stat-card">
          <h3>Active Borrowings</h3>
          <p className="stat-number">{dashboard.borrowings.active}</p>
        </div>
        <div className="stat-card">
          <h3>Late Returns</h3>
          <p className="stat-number">{dashboard.borrowings.late}</p>
        </div>
        <div className="stat-card">
          <h3>Total Members</h3>
          <p className="stat-number">{dashboard.users.total_members}</p>
        </div>
        <div className="stat-card">
          <h3>Total Fines</h3>
          <p className="stat-number">Rp {dashboard.fines.total.toLocaleString()}</p>
        </div>
      </div>

      <div className="section">
        <h2>Low Stock Books</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {dashboard.books.low_stock.map(book => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td className="low-stock">{book.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2>Popular Books</h2>
        <ul>
          {dashboard.popular_books.map((book, idx) => (
            <li key={idx}>
              {book.title} by {book.author} - {book.borrow_count} times borrowed
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>Recent Borrowings</h2>
        <table>
          <thead>
            <tr>
              <th>Member</th>
              <th>Book</th>
              <th>Borrow Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dashboard.recent_borrowings.map(b => (
              <tr key={b.id}>
                <td>{b.member_name}</td>
                <td>{b.book_title}</td>
                <td>{b.borrow_date}</td>
                <td>{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

---

### 5. Member Dashboard Component

```javascript
import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';

function MemberDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await dashboardAPI.getMemberDashboard(user.id);
      setDashboard(response.data.dashboard);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!dashboard) return <div>No data</div>;

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="dashboard">
      <h1>Welcome, {dashboard.user.name}!</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Active Borrowings</h3>
          <p className="stat-number">{dashboard.statistics.active_borrowings}</p>
        </div>
        <div className="stat-card">
          <h3>Late Returns</h3>
          <p className="stat-number">{dashboard.statistics.late_borrowings}</p>
        </div>
        <div className="stat-card">
          <h3>Total Fines</h3>
          <p className="stat-number">Rp {dashboard.statistics.total_fines.toLocaleString()}</p>
        </div>
      </div>

      <div className="section">
        <h2>My Active Borrowings</h2>
        {dashboard.active_borrowings.length === 0 ? (
          <p>No active borrowings</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Book</th>
                <th>Author</th>
                <th>Borrow Date</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.active_borrowings.map(b => (
                <tr key={b.id} className={b.is_late ? 'late' : ''}>
                  <td>{b.book_title}</td>
                  <td>{b.author}</td>
                  <td>{b.borrow_date}</td>
                  <td>{b.due_date}</td>
                  <td>{b.is_late ? '⚠️ Late' : '✓ On Time'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="section">
        <h2>Available Books</h2>
        <div className="book-grid">
          {dashboard.available_books.map(book => (
            <div key={book.id} className="book-card">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p>{book.category}</p>
              <p>Stock: {book.stock}</p>
              <button>Borrow</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## 🔒 Protected Routes

```javascript
// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!user.id) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  
  return children;
}

export default ProtectedRoute;
```

---

## 🛣️ React Router Setup

```javascript
// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import LibrarianDashboard from './pages/LibrarianDashboard';
import MemberDashboard from './pages/MemberDashboard';
import BookManagement from './pages/BookManagement';
import BorrowingManagement from './pages/BorrowingManagement';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/dashboard/librarian" element={
          <ProtectedRoute allowedRoles={['librarian']}>
            <LibrarianDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/member" element={
          <ProtectedRoute allowedRoles={['member']}>
            <MemberDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/books" element={
          <ProtectedRoute>
            <BookManagement />
          </ProtectedRoute>
        } />
        
        <Route path="/borrowings" element={
          <ProtectedRoute>
            <BorrowingManagement />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## ⚠️ Error Handling

```javascript
// Global error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## 📋 Checklist Integration

- [ ] Install axios
- [ ] Create api.js service file
- [ ] Implement login/register
- [ ] Add protected routes
- [ ] Create dashboard components
- [ ] Test CORS (backend harus running)
- [ ] Handle errors properly
- [ ] Add loading states
- [ ] Test all CRUD operations

---

## 🎯 Next Steps

1. **Copy** `api.js` ke folder `src/services/`
2. **Update** existing components untuk menggunakan API
3. **Test** dengan backend running di `http://localhost:6543`
4. **Implement** authentication flow
5. **Create** dashboard pages

---

**Happy Integration! 🚀**
