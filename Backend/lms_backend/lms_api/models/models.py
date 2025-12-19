from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Date,
    DateTime,
    ForeignKey,
    Numeric,
    Boolean,
)
from sqlalchemy.orm import relationship
from datetime import datetime

from .meta import Base


class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    email = Column(String(255), unique=True, nullable=False)
    name = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False, default='member')
    
    # Relationships
    borrowings = relationship('Borrowing', back_populates='user', foreign_keys='Borrowing.member_id')


class Author(Base):
    __tablename__ = 'authors'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False, unique=True)
    
    # Relationships
    books = relationship('Book', back_populates='author')


class Category(Base):
    __tablename__ = 'categories'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False, unique=True)
    
    # Relationships
    books = relationship('Book', back_populates='category')


class Book(Base):
    __tablename__ = 'books'
    
    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    author_id = Column(Integer, ForeignKey('authors.id'))
    category_id = Column(Integer, ForeignKey('categories.id'))
    description = Column(Text)
    stock = Column(Integer, nullable=False, default=0)
    
    # Relationships
    author = relationship('Author', back_populates='books')
    category = relationship('Category', back_populates='books')
    borrowings = relationship('Borrowing', back_populates='book')


class Borrowing(Base):
    __tablename__ = 'borrowings'
    
    id = Column(Integer, primary_key=True)
    member_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    book_id = Column(Integer, ForeignKey('books.id'), nullable=False)
    borrow_date = Column(Date)
    due_date = Column(Date)
    return_date = Column(Date)
    fine = Column(Numeric(10, 2))
    
    # Relationships
    user = relationship('User', back_populates='borrowings', foreign_keys=[member_id])
    book = relationship('Book', back_populates='borrowings')
