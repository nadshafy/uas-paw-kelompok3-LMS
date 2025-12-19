-- Database initialization for LMS
-- Creates tables matching SQLAlchemy models and seeds minimal data.

-- Drop existing tables if rerun (non-production safe)
DROP TABLE IF EXISTS borrowings CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'member'
);

CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author_id INTEGER REFERENCES authors(id) ON DELETE SET NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    description TEXT,
    stock INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE borrowings (
    id SERIAL PRIMARY KEY,
    member_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    book_id INTEGER NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    borrow_date DATE,
    due_date DATE,
    return_date DATE,
    fine NUMERIC(10,2)
);

-- Seed categories
INSERT INTO categories (name) VALUES
 ('Fiction'),
 ('Non-fiction'),
 ('Science'),
 ('Technology'),
 ('History'),
 ('Biography'),
 ('Fantasy'),
 ('Mystery'),
 ('Romance'),
 ('Self-Help')
ON CONFLICT DO NOTHING;

-- Seed authors
INSERT INTO authors (name) VALUES
 ('Jane Austen'),
 ('George Orwell'),
 ('J.K. Rowling'),
 ('Yuval Noah Harari')
ON CONFLICT DO NOTHING;

-- Seed users (bcrypt hashes for "password123")
INSERT INTO users (email, name, password, role) VALUES
 ('librarian@lms.com', 'Librarian', '$2b$12$KIXFxb5HBP9a6YQ8VE3Gye2rDMAYA9YgAX.aCBXlI3VzsuYOPxfne', 'librarian'),
 ('member@lms.com', 'Member', '$2b$12$KIXFxb5HBP9a6YQ8VE3Gye2rDMAYA9YgAX.aCBXlI3VzsuYOPxfne', 'member')
ON CONFLICT (email) DO NOTHING;

-- Seed a couple of books
INSERT INTO books (title, author_id, category_id, description, stock) VALUES
 ('1984', (SELECT id FROM authors WHERE name = 'George Orwell'), (SELECT id FROM categories WHERE name = 'Fiction'), 'Dystopian classic', 5),
 ('Sapiens', (SELECT id FROM authors WHERE name = 'Yuval Noah Harari'), (SELECT id FROM categories WHERE name = 'History'), 'Brief history of humankind', 3)
ON CONFLICT DO NOTHING;

-- Borrowings left empty initially
