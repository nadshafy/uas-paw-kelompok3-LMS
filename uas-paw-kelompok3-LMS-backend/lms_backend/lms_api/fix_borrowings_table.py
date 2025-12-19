import psycopg2

conn = psycopg2.connect(
    host="localhost",
    database="lms-frand",
    user="postgres",
    password="Dyocarol031003"
)

cursor = conn.cursor()

# Cek struktur tabel borrowings
cursor.execute("""
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'borrowings' 
    ORDER BY ordinal_position
""")

print("=" * 60)
print("STRUKTUR TABEL BORROWINGS")
print("=" * 60)
for col_name, data_type in cursor.fetchall():
    print(f"{col_name}: {data_type}")

# Alter table untuk menambahkan kolom due_date jika belum ada
try:
    print("\n" + "=" * 60)
    print("Menambahkan kolom due_date...")
    print("=" * 60)
    
    cursor.execute("ALTER TABLE borrowings ADD COLUMN IF NOT EXISTS due_date DATE")
    conn.commit()
    print("✓ Kolom due_date berhasil ditambahkan!")
except Exception as e:
    print(f"✗ Error: {e}")
    conn.rollback()

cursor.close()
conn.close()
