// API Configuration untuk LMS Frontend
export const API_BASE_URL = 'http://localhost:6543/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
  },
  
  // Books Management
  BOOKS: {
    LIST: `${API_BASE_URL}/books`,
    DETAIL: (id) => `${API_BASE_URL}/books/${id}`,
    CREATE: `${API_BASE_URL}/books`,
    UPDATE: (id) => `${API_BASE_URL}/books/${id}`,
    DELETE: (id) => `${API_BASE_URL}/books/${id}`,
  },
  
  // Categories
  CATEGORIES: {
    LIST: `${API_BASE_URL}/categories`,
  },
  
  // Borrowings
  BORROWINGS: {
    LIST: `${API_BASE_URL}/borrowings`,
    DETAIL: (id) => `${API_BASE_URL}/borrowings/${id}`,
    CREATE: `${API_BASE_URL}/borrowings`,
    RETURN: (id) => `${API_BASE_URL}/borrowings/${id}/return`,
    DELETE: (id) => `${API_BASE_URL}/borrowings/${id}`,
  },
};

// Helper function untuk fetch dengan error handling
export const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// API Service Functions
export const AuthService = {
  register: async (userData) => {
    return apiRequest(API_ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (email, password) => {
    return apiRequest(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
};

export const BookService = {
  getAll: async (searchQuery = '', category = 'all') => {
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (category !== 'all') params.append('category', category);
    
    const url = `${API_ENDPOINTS.BOOKS.LIST}?${params.toString()}`;
    return apiRequest(url, { method: 'GET' });
  },

  getById: async (id) => {
    return apiRequest(API_ENDPOINTS.BOOKS.DETAIL(id), { method: 'GET' });
  },

  create: async (bookData) => {
    return apiRequest(API_ENDPOINTS.BOOKS.CREATE, {
      method: 'POST',
      body: JSON.stringify(bookData),
    });
  },

  update: async (id, bookData) => {
    return apiRequest(API_ENDPOINTS.BOOKS.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(bookData),
    });
  },

  delete: async (id) => {
    return apiRequest(API_ENDPOINTS.BOOKS.DELETE(id), { method: 'DELETE' });
  },
};

export const CategoryService = {
  getAll: async () => {
    return apiRequest(API_ENDPOINTS.CATEGORIES.LIST, { method: 'GET' });
  },
};

export const BorrowingService = {
  getAll: async (searchQuery = '', status = 'all') => {
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (status !== 'all') params.append('status', status);
    
    const url = `${API_ENDPOINTS.BORROWINGS.LIST}?${params.toString()}`;
    return apiRequest(url, { method: 'GET' });
  },

  getById: async (id) => {
    return apiRequest(API_ENDPOINTS.BORROWINGS.DETAIL(id), { method: 'GET' });
  },

  create: async (borrowingData) => {
    return apiRequest(API_ENDPOINTS.BORROWINGS.CREATE, {
      method: 'POST',
      body: JSON.stringify(borrowingData),
    });
  },

  returnBook: async (id) => {
    return apiRequest(API_ENDPOINTS.BORROWINGS.RETURN(id), {
      method: 'POST',
    });
  },

  delete: async (id) => {
    return apiRequest(API_ENDPOINTS.BORROWINGS.DELETE(id), {
      method: 'DELETE',
    });
  },
};

const ApiServices = {
  AuthService,
  BookService,
  CategoryService,
  BorrowingService,
};

export default ApiServices;