import bcrypt
from pyramid.view import view_config
from sqlalchemy import text


@view_config(route_name="api_register", request_method="POST", renderer="json")
def register(request):
    data = request.json_body
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "member")

    if not name or not email or not password:
        request.response.status = 400
        return {"error": "name, email, password wajib diisi"}

    db = request.dbsession

    exists = db.execute(
        text("SELECT id FROM users WHERE email = :email"),
        {"email": email}
    ).fetchone()

    if exists:
        request.response.status = 409
        return {"error": "email sudah terdaftar"}

    hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    connection = db.connection()
    result = connection.execute(
        text("""
            INSERT INTO users (name, email, password, role)
            VALUES (:name, :email, :password, :role)
            RETURNING id, name, email, role
        """),
        {"name": name, "email": email, "password": hashed, "role": role}
    )
    row = result.fetchone()
    connection.commit()
    
    return {"message": "register berhasil", "user": dict(row._mapping)}


@view_config(route_name="api_login", request_method="POST", renderer="json")
def login(request):
    data = request.json_body
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        request.response.status = 400
        return {"error": "email dan password wajib"}

    db = request.dbsession

    user = db.execute(
        text("SELECT id, name, email, password, role FROM users WHERE email = :email"),
        {"email": email}
    ).fetchone()

    if not user:
        request.response.status = 401
        return {"error": "email/password salah"}

    hashed = user._mapping["password"]
    if not bcrypt.checkpw(password.encode("utf-8"), hashed.encode("utf-8")):
        request.response.status = 401
        return {"error": "email/password salah"}

    return {
        "message": "login berhasil",
        "user": {
            "id": user._mapping["id"],
            "name": user._mapping["name"],
            "email": user._mapping["email"],
            "role": user._mapping["role"],
        }
    }


@view_config(route_name="api_users", request_method="GET", renderer="json")
def list_users(request):
    """Mendapatkan daftar semua users"""
    db = request.dbsession
    
    users = db.execute(
        text("SELECT id, name, email, role FROM users ORDER BY id")
    ).fetchall()
    
    return {
        "users": [
            {
                "id": user._mapping["id"],
                "name": user._mapping["name"],
                "email": user._mapping["email"],
                "role": user._mapping["role"],
            }
            for user in users
        ]
    }


@view_config(route_name="api_user_detail", request_method="GET", renderer="json")
def get_user_detail(request):
    """Mendapatkan detail user berdasarkan ID"""
    user_id = request.matchdict["id"]
    db = request.dbsession
    
    user = db.execute(
        text("SELECT id, name, email, role FROM users WHERE id = :id"),
        {"id": user_id}
    ).fetchone()
    
    if not user:
        request.response.status = 404
        return {"error": "User tidak ditemukan"}
    
    return {
        "user": {
            "id": user._mapping["id"],
            "name": user._mapping["name"],
            "email": user._mapping["email"],
            "role": user._mapping["role"],
        }
    }


@view_config(route_name="api_user_detail", request_method="DELETE", renderer="json")
def delete_user(request):
    """Menghapus user berdasarkan ID"""
    user_id = request.matchdict["id"]
    db = request.dbsession
    
    # Cek apakah user ada
    user = db.execute(
        text("SELECT id FROM users WHERE id = :id"),
        {"id": user_id}
    ).fetchone()
    
    if not user:
        request.response.status = 404
        return {"error": "User tidak ditemukan"}
    
    # Hapus user
    db.execute(
        text("DELETE FROM users WHERE id = :id"),
        {"id": user_id}
    )
    
    return {"message": "User berhasil dihapus"}


@view_config(route_name="api_user_detail", request_method="PUT", renderer="json")
def update_user_password(request):
    """Update password user"""
    user_id = request.matchdict["id"]
    data = request.json_body
    new_password = data.get("password")
    
    if not new_password:
        request.response.status = 400
        return {"error": "Password wajib diisi"}
    
    db = request.dbsession
    
    # Cek apakah user ada
    user = db.execute(
        text("SELECT id FROM users WHERE id = :id"),
        {"id": user_id}
    ).fetchone()
    
    if not user:
        request.response.status = 404
        return {"error": "User tidak ditemukan"}
    
    # Hash password baru
    hashed = bcrypt.hashpw(new_password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    
    # Update password
    db.execute(
        text("UPDATE users SET password = :password WHERE id = :id"),
        {"password": hashed, "id": user_id}
    )
    
    return {"message": "Password berhasil diupdate"}
