# 🐳 Docker Database Setup - LMS Project

## 📋 Cara Setup untuk Tim (Pertama Kali)

### 1️⃣ Pastikan Docker Desktop Running

### 2️⃣ Jalankan Database
```bash
cd docker
docker-compose up -d
```

### 3️⃣ Cek Database Sudah Ready
```bash
docker logs lms_postgres
```

Tunggu sampai muncul pesan:
```
✅ Database initialized successfully!
📚 Categories: 10 inserted
👥 Users: 2 inserted
```

### 4️⃣ Selesai! 🎉

Database sudah **otomatis terisi** dengan:
- ✅ Semua table (users, books, borrowings, categories, authors)
- ✅ 10 kategori buku
- ✅ 2 user default:
  - **Librarian**: librarian@lms.com (password: password123)
  - **Member**: member@lms.com (password: password123)

---

## 🔧 Command Berguna

### Lihat container yang running:
```bash
docker ps
```

### Stop database:
```bash
docker-compose down
```

### Reset database (hapus semua data):
```bash
docker-compose down -v
docker-compose up -d
```

### Akses database via terminal:
```bash
docker exec -it lms_postgres psql -U postgres -d lms-frand
```

### Cek tabel:
```sql
\dt
```

### Cek data users:
```sql
SELECT id, email, name, role FROM users;
```

---

## ⚠️ Troubleshooting

### Port 5433 sudah dipakai?
Ubah port di `docker-compose.yml`:
```yaml
ports:
  - "5434:5432"  # Ganti 5433 jadi 5434
```

Jangan lupa update `development.ini` juga!

### Database tidak terisi otomatis?
Hapus volume dan recreate:
```bash
docker-compose down -v
docker-compose up -d
```

---

## 📝 Note untuk Developer

- Script `init-db.sql` hanya jalan **sekali** saat container pertama dibuat
- Kalau sudah ada volume sebelumnya, script tidak akan jalan lagi
- Untuk reset, gunakan `docker-compose down -v`
