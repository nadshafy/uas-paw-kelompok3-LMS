def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')

    # ===== API Auth =====
    config.add_route("api_register", "/api/auth/register")
    config.add_route("api_login", "/api/auth/login")
    
    # ===== API Users =====
    config.add_route("api_users", "/api/users")
    config.add_route("api_user_detail", "/api/users/{id}")

    # ===== API Books =====
    config.add_route("api_books", "/api/books")
    config.add_route("api_book_detail", "/api/books/{id}")
    config.add_route("api_categories", "/api/categories")

    # ===== API Borrowings =====
    config.add_route("api_borrowings", "/api/borrowings")
    config.add_route("api_borrowing_detail", "/api/borrowings/{id}")
    config.add_route("api_borrowing_return", "/api/borrowings/{id}/return")

    # ===== API Statistics =====
    config.add_route("api_statistics", "/api/statistics")
    config.add_route("api_dashboard_librarian", "/api/dashboard/librarian")
    config.add_route("api_dashboard_member", "/api/dashboard/member/{id}")

    # ===== Debug =====
    config.add_route("api_db_check", "/api/debug/db-check")

