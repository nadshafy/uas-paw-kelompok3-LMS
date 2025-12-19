# 🗑️ Cleanup Guide - File yang Bisa Dihapus

## ❌ AMAN DIHAPUS (Testing/Development Tools):

```
lms_backend/lms_api/
├── check_all_tables.py          ❌ Testing tool
├── check_books.py               ❌ Testing tool
├── check_db_structure.py        ❌ Testing tool
├── check_users.py               ❌ Testing tool
├── check_users_full.py          ❌ Testing tool
├── fix_borrowings_table.py      ❌ One-time fix script
├── fix_password.py              ❌ One-time fix script
├── reset_password_finaltest.py  ❌ Testing tool
├── update_finaltest_password.py ❌ Testing tool
└── LMS.sql                      ❌ Sudah ada di docker/init-db.sql
```

## ⚠️ PERTAHANKAN (Backup/Fallback):

```
├── create_tables.py             ⚠️ Backup jika docker gagal
├── insert_categories.py         ⚠️ Backup manual insert
└── insert_sample_data.py        ⚠️ Backup manual insert
```

## ✅ WAJIB ADA (Core Files):

```
lms_backend/lms_api/
├── lms_api/                     ✅ Python package (JANGAN DIHAPUS!)
├── tests/                       ✅ Unit tests (optional tapi bagus)
├── development.ini              ✅ Config development
├── production.ini               ✅ Config production
├── setup.py                     ✅ Python setup
├── MANIFEST.in                  ✅ Package manifest
├── pytest.ini                   ✅ Test config
├── README.txt                   ✅ Dokumentasi
└── venv/                        ✅ Virtual env (local, tidak di-push)
```

## 🧹 Command untuk Cleanup:

```powershell
cd C:\Dyo\Kuliah\Pemweb\uas-paw-kelompok3-LMS\lms_backend\lms_api

# Hapus semua file testing
Remove-Item check_*.py, fix_*.py, reset_*.py, update_*.py, LMS.sql
```

## 📝 Rekomendasi:

**Untuk Production/Submit:**
- ✅ Hapus semua file testing (check_*, fix_*)
- ✅ Pertahankan create_tables.py dan insert_sample_data.py sebagai backup
- ✅ Pertahankan semua file config (.ini)
- ✅ Pastikan .gitignore mengabaikan venv/ dan __pycache__/

**Total file yang bisa dihapus: 10 file** (tidak mengganggu aplikasi sama sekali!)
