from pyramid.view import view_config
from sqlalchemy.orm import joinedload
from datetime import datetime, timedelta, date
from ..models.models import Borrowing, Book, User


@view_config(route_name="api_borrowings", request_method="GET", renderer="json")
def list_borrowings(request):
    """Mendapatkan daftar peminjaman dengan filter"""
    search = request.params.get("search", "").strip()

    db = request.dbsession
    query = db.query(Borrowing).options(
        joinedload(Borrowing.book),
        joinedload(Borrowing.user)
    )

    # Filter berdasarkan search
    if search:
        query = query.join(Book).join(User).filter(
            (User.name.ilike(f"%{search}%")) |
            (Book.title.ilike(f"%{search}%"))
        )

    borrowings = query.order_by(Borrowing.id.desc()).all()

    return {
        "borrowings": [
            {
                "id": b.id,
                "member_id": b.member_id,
                "member_name": b.user.name if b.user else "",
                "book_id": b.book_id,
                "book_title": b.book.title if b.book else "",
                "author": b.book.author.name if (b.book and b.book.author) else "",
                "category": b.book.category.name if (b.book and b.book.category) else "",
                "borrow_date": b.borrow_date.strftime("%Y-%m-%d") if b.borrow_date else None,
                "due_date": b.due_date.strftime("%Y-%m-%d") if b.due_date else None,
                "return_date": b.return_date.strftime("%Y-%m-%d") if b.return_date else None,
                "fine": float(b.fine) if b.fine else 0,
                "status": "Dikembalikan" if b.return_date else "Dipinjam",
            }
            for b in borrowings
        ]
    }


@view_config(route_name="api_borrowing_detail", request_method="GET", renderer="json")
def get_borrowing_detail(request):
    """Mendapatkan detail peminjaman berdasarkan ID"""
    borrowing_id = request.matchdict["id"]
    db = request.dbsession

    borrowing = db.query(Borrowing).options(
        joinedload(Borrowing.book),
        joinedload(Borrowing.user)
    ).filter(Borrowing.id == borrowing_id).first()

    if not borrowing:
        request.response.status = 404
        return {"error": "Data peminjaman tidak ditemukan"}

    return {
        "borrowing": {
            "id": borrowing.id,
            "member_id": borrowing.member_id,
            "member_name": borrowing.user.name if borrowing.user else "",
            "book_id": borrowing.book_id,
            "book_title": borrowing.book.title if borrowing.book else "",
            "author": borrowing.book.author.name if (borrowing.book and borrowing.book.author) else "",
            "category": borrowing.book.category.name if (borrowing.book and borrowing.book.category) else "",
            "borrow_date": borrowing.borrow_date.strftime("%Y-%m-%d") if borrowing.borrow_date else None,
            "due_date": borrowing.due_date.strftime("%Y-%m-%d") if borrowing.due_date else None,
            "return_date": borrowing.return_date.strftime("%Y-%m-%d") if borrowing.return_date else None,
            "fine": float(borrowing.fine) if borrowing.fine else 0,
            "status": "Dikembalikan" if borrowing.return_date else "Dipinjam",
        }
    }


@view_config(route_name="api_borrowings", request_method="POST", renderer="json")
def create_borrowing(request):
    """Membuat peminjaman buku baru dengan tanggal kembali yang bisa ditentukan"""
    data = request.json_body

    db = request.dbsession

    member_id = data.get("member_id") or data.get("userId", 1)
    book_id = data.get("book_id")

    if not book_id:
        request.response.status = 400
        return {"error": "Book ID wajib diisi"}

    book = db.query(Book).filter(Book.id == book_id).first()
    if not book:
        request.response.status = 404
        return {"error": "Buku tidak ditemukan"}

    if book.stock <= 0:
        request.response.status = 400
        return {"error": "Buku tidak tersedia untuk dipinjam"}

    # Allow custom borrow_date and due_date from request, or use defaults
    borrow_date_str = data.get("borrow_date")
    due_date_str = data.get("due_date")
    
    if borrow_date_str:
        try:
            borrow_date = datetime.strptime(borrow_date_str, "%Y-%m-%d").date()
        except ValueError:
            borrow_date = date.today()
    else:
        borrow_date = date.today()
    
    if due_date_str:
        try:
            due_date = datetime.strptime(due_date_str, "%Y-%m-%d").date()
        except ValueError:
            due_date = borrow_date + timedelta(days=7)
    else:
        due_date = borrow_date + timedelta(days=7)

    borrowing = Borrowing(
        member_id=member_id,
        book_id=book.id,
        borrow_date=borrow_date,
        due_date=due_date,
        return_date=None,
        fine=0
    )

    book.stock -= 1

    db.add(borrowing)
    db.flush()

    return {
        "message": "Peminjaman berhasil dibuat",
        "borrowing": {
            "id": borrowing.id,
            "member_id": borrowing.member_id,
            "book_id": borrowing.book_id,
            "book_title": book.title,
            "borrow_date": borrow_date.strftime("%Y-%m-%d"),
            "due_date": due_date.strftime("%Y-%m-%d"),
            "status": "Dipinjam",
        }
    }



@view_config(route_name="api_borrowing_return", request_method="POST", renderer="json")
def return_borrowing(request):
    """Mengembalikan buku (update status peminjaman)"""
    borrowing_id = request.matchdict["id"]
    db = request.dbsession

    borrowing = db.query(Borrowing).filter(Borrowing.id == borrowing_id).first()
    if not borrowing:
        request.response.status = 404
        return {"error": "Data peminjaman tidak ditemukan"}

    if borrowing.return_date:
        request.response.status = 400
        return {"error": "Buku sudah dikembalikan"}

    # Update return date
    borrowing.return_date = date.today()

    # Hitung denda jika terlambat
    if borrowing.due_date and borrowing.return_date > borrowing.due_date:
        days_late = (borrowing.return_date - borrowing.due_date).days
        fine_per_day = 1000  # Rp 1000 per hari
        borrowing.fine = days_late * fine_per_day
    else:
        borrowing.fine = 0

    # Tambah stok kembali
    book = db.query(Book).filter(Book.id == borrowing.book_id).first()
    if book:
        book.stock += 1

    db.flush()

    return {
        "message": "Buku berhasil dikembalikan",
        "borrowing": {
            "id": borrowing.id,
            "return_date": borrowing.return_date.strftime("%Y-%m-%d"),
            "fine": float(borrowing.fine) if borrowing.fine else 0,
            "status": "Dikembalikan",
        }
    }


@view_config(route_name="api_borrowing_detail", request_method="DELETE", renderer="json")
def delete_borrowing(request):
    """Menghapus data peminjaman"""
    borrowing_id = request.matchdict["id"]
    db = request.dbsession

    borrowing = db.query(Borrowing).filter(Borrowing.id == borrowing_id).first()
    if not borrowing:
        request.response.status = 404
        return {"error": "Data peminjaman tidak ditemukan"}

    # Jika masih dipinjam, kembalikan dulu stok buku
    if not borrowing.return_date:
        book = db.query(Book).filter(Book.id == borrowing.book_id).first()
        if book:
            book.stock += 1

    db.delete(borrowing)
    return {"message": "Data peminjaman berhasil dihapus"}
