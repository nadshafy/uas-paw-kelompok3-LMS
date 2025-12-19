from pyramid.view import view_config
from sqlalchemy import func, and_, or_
from sqlalchemy.orm import joinedload
from datetime import datetime, timedelta, date
from ..models.models import Book, Borrowing, User, Category, Author


@view_config(route_name="api_statistics", request_method="GET", renderer="json")
def get_statistics(request):
    """Mendapatkan statistik umum sistem LMS"""
    db = request.dbsession

    # Total buku
    total_books = db.query(func.count(Book.id)).scalar()

    # Total stok buku
    total_stock = db.query(func.sum(Book.stock)).scalar() or 0

    # Total member
    total_members = db.query(func.count(User.id)).filter(User.role == 'member').scalar()

    # Total peminjaman aktif
    active_borrowings = db.query(func.count(Borrowing.id)).filter(
        Borrowing.return_date == None
    ).scalar()

    # Total peminjaman yang sudah dikembalikan
    returned_borrowings = db.query(func.count(Borrowing.id)).filter(
        Borrowing.return_date != None
    ).scalar()

    # Total denda
    total_fines = db.query(func.sum(Borrowing.fine)).scalar() or 0

    # Buku paling populer (paling banyak dipinjam)
    popular_books = db.query(
        Book.title,
        func.count(Borrowing.id).label('borrow_count')
    ).join(Borrowing).group_by(Book.id, Book.title).order_by(
        func.count(Borrowing.id).desc()
    ).limit(5).all()

    return {
        "statistics": {
            "total_books": total_books,
            "total_stock": int(total_stock),
            "total_members": total_members,
            "active_borrowings": active_borrowings,
            "returned_borrowings": returned_borrowings,
            "total_fines": float(total_fines),
            "popular_books": [
                {"title": book[0], "borrow_count": book[1]}
                for book in popular_books
            ]
        }
    }


@view_config(route_name="api_dashboard_librarian", request_method="GET", renderer="json")
def dashboard_librarian(request):
    """Dashboard untuk librarian dengan statistik lengkap"""
    db = request.dbsession

    # Total buku dan kategori
    total_books = db.query(func.count(Book.id)).scalar()
    total_categories = db.query(func.count(Category.id)).scalar()
    total_authors = db.query(func.count(Author.id)).scalar()
    total_stock = db.query(func.sum(Book.stock)).scalar() or 0

    # Total users
    total_members = db.query(func.count(User.id)).filter(User.role == 'member').scalar()
    total_librarians = db.query(func.count(User.id)).filter(User.role == 'librarian').scalar()

    # Peminjaman
    total_borrowings = db.query(func.count(Borrowing.id)).scalar()
    active_borrowings = db.query(func.count(Borrowing.id)).filter(
        Borrowing.return_date == None
    ).scalar()
    returned_borrowings = db.query(func.count(Borrowing.id)).filter(
        Borrowing.return_date != None
    ).scalar()

    # Peminjaman terlambat (belum dikembalikan dan melewati due date)
    today = date.today()
    late_borrowings = db.query(func.count(Borrowing.id)).filter(
        and_(
            Borrowing.return_date == None,
            Borrowing.due_date < today
        )
    ).scalar()

    # Total denda
    total_fines = db.query(func.sum(Borrowing.fine)).scalar() or 0

    # Peminjaman hari ini
    borrowings_today = db.query(func.count(Borrowing.id)).filter(
        Borrowing.borrow_date == today
    ).scalar()

    # Pengembalian hari ini
    returns_today = db.query(func.count(Borrowing.id)).filter(
        Borrowing.return_date == today
    ).scalar()

    # Recent borrowings (5 terakhir)
    recent_borrowings = db.query(Borrowing).options(
        joinedload(Borrowing.book),
        joinedload(Borrowing.user)
    ).order_by(Borrowing.id.desc()).limit(5).all()

    # Books dengan stok rendah (< 3)
    low_stock_books = db.query(Book).options(
        joinedload(Book.author),
        joinedload(Book.category)
    ).filter(Book.stock < 3).order_by(Book.stock).limit(5).all()

    # Buku paling populer
    popular_books = db.query(
        Book.title,
        Author.name,
        func.count(Borrowing.id).label('borrow_count')
    ).join(Borrowing).outerjoin(Author).group_by(
        Book.id, Book.title, Author.name
    ).order_by(func.count(Borrowing.id).desc()).limit(5).all()

    return {
        "dashboard": {
            "books": {
                "total": total_books,
                "total_stock": int(total_stock),
                "categories": total_categories,
                "authors": total_authors,
                "low_stock": [
                    {
                        "id": book.id,
                        "title": book.title,
                        "author": book.author.name if book.author else "",
                        "stock": book.stock
                    }
                    for book in low_stock_books
                ]
            },
            "users": {
                "total_members": total_members,
                "total_librarians": total_librarians
            },
            "borrowings": {
                "total": total_borrowings,
                "active": active_borrowings,
                "returned": returned_borrowings,
                "late": late_borrowings,
                "today": borrowings_today,
                "returns_today": returns_today
            },
            "fines": {
                "total": float(total_fines)
            },
            "recent_borrowings": [
                {
                    "id": b.id,
                    "member_name": b.user.name if b.user else "",
                    "book_title": b.book.title if b.book else "",
                    "borrow_date": b.borrow_date.strftime("%Y-%m-%d") if b.borrow_date else None,
                    "due_date": b.due_date.strftime("%Y-%m-%d") if b.due_date else None,
                    "status": "Dikembalikan" if b.return_date else "Dipinjam"
                }
                for b in recent_borrowings
            ],
            "popular_books": [
                {
                    "title": book[0],
                    "author": book[1] or "",
                    "borrow_count": book[2]
                }
                for book in popular_books
            ]
        }
    }


@view_config(route_name="api_dashboard_member", request_method="GET", renderer="json")
def dashboard_member(request):
    """Dashboard untuk member dengan data peminjaman pribadi"""
    member_id = request.matchdict["id"]
    db = request.dbsession

    # Cek apakah user ada
    user = db.query(User).filter(User.id == member_id).first()
    if not user:
        request.response.status = 404
        return {"error": "User tidak ditemukan"}

    # Total peminjaman user
    total_borrowings = db.query(func.count(Borrowing.id)).filter(
        Borrowing.member_id == member_id
    ).scalar()

    # Peminjaman aktif
    active_borrowings = db.query(func.count(Borrowing.id)).filter(
        and_(
            Borrowing.member_id == member_id,
            Borrowing.return_date == None
        )
    ).scalar()

    # Total yang sudah dikembalikan
    returned_borrowings = db.query(func.count(Borrowing.id)).filter(
        and_(
            Borrowing.member_id == member_id,
            Borrowing.return_date != None
        )
    ).scalar()

    # Total denda
    total_fines = db.query(func.sum(Borrowing.fine)).filter(
        Borrowing.member_id == member_id
    ).scalar() or 0

    # Peminjaman yang terlambat
    today = date.today()
    late_borrowings = db.query(func.count(Borrowing.id)).filter(
        and_(
            Borrowing.member_id == member_id,
            Borrowing.return_date == None,
            Borrowing.due_date < today
        )
    ).scalar()

    # Daftar peminjaman aktif
    active_borrowings_list = db.query(Borrowing).options(
        joinedload(Borrowing.book).joinedload(Book.author),
        joinedload(Borrowing.book).joinedload(Book.category)
    ).filter(
        and_(
            Borrowing.member_id == member_id,
            Borrowing.return_date == None
        )
    ).order_by(Borrowing.borrow_date.desc()).all()

    # Riwayat peminjaman (yang sudah dikembalikan, 10 terakhir)
    borrowing_history = db.query(Borrowing).options(
        joinedload(Borrowing.book).joinedload(Book.author),
        joinedload(Borrowing.book).joinedload(Book.category)
    ).filter(
        and_(
            Borrowing.member_id == member_id,
            Borrowing.return_date != None
        )
    ).order_by(Borrowing.return_date.desc()).limit(10).all()

    # Buku yang tersedia untuk dipinjam (sample 10 buku)
    available_books = db.query(Book).options(
        joinedload(Book.author),
        joinedload(Book.category)
    ).filter(Book.stock > 0).order_by(Book.id.desc()).limit(10).all()

    return {
        "dashboard": {
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role
            },
            "statistics": {
                "total_borrowings": total_borrowings,
                "active_borrowings": active_borrowings,
                "returned_borrowings": returned_borrowings,
                "late_borrowings": late_borrowings,
                "total_fines": float(total_fines)
            },
            "active_borrowings": [
                {
                    "id": b.id,
                    "book_id": b.book_id,
                    "book_title": b.book.title if b.book else "",
                    "author": b.book.author.name if (b.book and b.book.author) else "",
                    "category": b.book.category.name if (b.book and b.book.category) else "",
                    "borrow_date": b.borrow_date.strftime("%Y-%m-%d") if b.borrow_date else None,
                    "due_date": b.due_date.strftime("%Y-%m-%d") if b.due_date else None,
                    "is_late": b.due_date < today if b.due_date else False
                }
                for b in active_borrowings_list
            ],
            "borrowing_history": [
                {
                    "id": b.id,
                    "book_title": b.book.title if b.book else "",
                    "author": b.book.author.name if (b.book and b.book.author) else "",
                    "borrow_date": b.borrow_date.strftime("%Y-%m-%d") if b.borrow_date else None,
                    "return_date": b.return_date.strftime("%Y-%m-%d") if b.return_date else None,
                    "fine": float(b.fine) if b.fine else 0
                }
                for b in borrowing_history
            ],
            "available_books": [
                {
                    "id": book.id,
                    "title": book.title,
                    "author": book.author.name if book.author else "",
                    "category": book.category.name if book.category else "",
                    "stock": book.stock
                }
                for book in available_books
            ]
        }
    }
