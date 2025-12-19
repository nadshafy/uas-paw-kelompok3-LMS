from pyramid.view import view_config
from sqlalchemy.orm import joinedload
from ..models.models import Book, Author, Category


@view_config(route_name="api_books", request_method="GET", renderer="json")
def list_books(request):
    """Mendapatkan daftar buku dengan filter search dan category"""
    search = request.params.get("search", "").strip()
    category = request.params.get("category", "all").strip()

    db = request.dbsession
    query = db.query(Book).options(joinedload(Book.author), joinedload(Book.category))

    # Filter berdasarkan search
    if search:
        query = query.outerjoin(Book.author).outerjoin(Book.category).filter(
            (Book.title.ilike(f"%{search}%")) |
            (Author.name.ilike(f"%{search}%")) |
            (Category.name.ilike(f"%{search}%"))
        )

    # Filter berdasarkan category
    if category != "all":
        query = query.join(Book.category).filter(Category.name == category)

    books = query.order_by(Book.id).all()

    return {
        "books": [
            {
                "id": book.id,
                "title": book.title or "",
                "author": book.author.name if book.author else "",
                "category": book.category.name if book.category else "",
                "description": book.description or "",
                "stock": book.stock or 0,
            }
            for book in books
        ]
    }


@view_config(route_name="api_book_detail", request_method="GET", renderer="json")
def get_book_detail(request):
    """Mendapatkan detail buku berdasarkan ID"""
    book_id = request.matchdict["id"]
    db = request.dbsession

    book = db.query(Book).options(
        joinedload(Book.author),
        joinedload(Book.category)
    ).filter(Book.id == book_id).first()

    if not book:
        request.response.status = 404
        return {"error": "Buku tidak ditemukan"}

    return {
        "book": {
            "id": book.id,
            "title": book.title or "",
            "author": book.author.name if book.author else "",
            "category": book.category.name if book.category else "",
            "description": book.description or "",
            "stock": book.stock or 0,
        }
    }


@view_config(route_name="api_books", request_method="POST", renderer="json")
def create_book(request):
    """Menambahkan buku baru"""
    data = request.json_body
    title = data.get("title", "").strip()
    author_name = data.get("author", "").strip()
    category_name = data.get("category", "").strip()
    description = data.get("description", "").strip()
    stock = data.get("stock", 1)

    if not all([title, author_name, category_name]):
        request.response.status = 400
        return {"error": "Judul, Pengarang, dan Kategori wajib diisi"}

    db = request.dbsession

    # Cari atau buat author
    author = db.query(Author).filter(Author.name == author_name).first()
    if not author:
        author = Author(name=author_name)
        db.add(author)
        db.flush()

    # Cari atau buat category
    category = db.query(Category).filter(Category.name == category_name).first()
    if not category:
        category = Category(name=category_name)
        db.add(category)
        db.flush()

    # Buat buku baru
    book = Book(
        title=title,
        author_id=author.id,
        category_id=category.id,
        description=description,
        stock=stock
    )
    db.add(book)
    db.flush()

    return {
        "message": "Buku berhasil ditambahkan",
        "book": {
            "id": book.id,
            "title": book.title,
            "author": author.name,
            "category": category.name,
            "description": book.description or "",
            "stock": book.stock,
        }
    }


@view_config(route_name="api_book_detail", request_method="PUT", renderer="json")
def update_book(request):
    """Mengupdate data buku"""
    book_id = request.matchdict["id"]
    data = request.json_body
    db = request.dbsession

    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        request.response.status = 404
        return {"error": "Buku tidak ditemukan"}

    # Update fields
    if "title" in data and data["title"].strip():
        book.title = data["title"].strip()

    if "author" in data and data["author"].strip():
        author_name = data["author"].strip()
        author = db.query(Author).filter(Author.name == author_name).first()
        if not author:
            author = Author(name=author_name)
            db.add(author)
            db.flush()
        book.author_id = author.id

    if "category" in data and data["category"].strip():
        category_name = data["category"].strip()
        category = db.query(Category).filter(Category.name == category_name).first()
        if not category:
            category = Category(name=category_name)
            db.add(category)
            db.flush()
        book.category_id = category.id

    if "description" in data:
        book.description = data["description"].strip()

    if "stock" in data:
        book.stock = int(data["stock"])

    db.flush()
    db.refresh(book)

    return {
        "message": "Buku berhasil diupdate",
        "book": {
            "id": book.id,
            "title": book.title,
            "author": book.author.name if book.author else "",
            "category": book.category.name if book.category else "",
            "description": book.description or "",
            "stock": book.stock,
        }
    }


@view_config(route_name="api_book_detail", request_method="DELETE", renderer="json")
def delete_book(request):
    """Menghapus buku"""
    book_id = request.matchdict["id"]
    db = request.dbsession

    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        request.response.status = 404
        return {"error": "Buku tidak ditemukan"}

    # Cek apakah buku sedang dipinjam
    from ..models.models import Borrowing
    active_borrowing = db.query(Borrowing).filter(
        Borrowing.book_id == book_id,
        Borrowing.return_date == None
    ).first()

    if active_borrowing:
        request.response.status = 400
        return {"error": "Buku tidak dapat dihapus karena sedang dipinjam"}

    db.delete(book)
    return {"message": "Buku berhasil dihapus"}


@view_config(route_name="api_categories", request_method="GET", renderer="json")
def list_categories(request):
    """Mendapatkan daftar semua kategori"""
    db = request.dbsession
    categories = db.query(Category).order_by(Category.name).all()

    return {
        "categories": [category.name for category in categories]
    }
