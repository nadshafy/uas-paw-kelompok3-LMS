import psycopg2

# Connect to database
conn = psycopg2.connect(
    host="localhost",
    database="lms-frand",
    user="postgres",
    password="Dyocarol031003"
)

cursor = conn.cursor()

# Daftar kategori untuk perpustakaan
categories = [
    "Fiksi",
    "Non-Fiksi",
    "Sains",
    "Teknologi",
    "Sejarah",
    "Biografi",
    "Self Development",
    "Bisnis",
    "Filosofi",
    "Agama",
    "Novel",
    "Komik",
    "Majalah",
    "Jurnal",
    "Referensi",
    "Pendidikan",
    "Kesehatan",
    "Seni",
    "Musik",
    "Olahraga"
]

print("=" * 60)
print("Menambahkan Kategori ke Database")
print("=" * 60)

# Insert categories
for category in categories:
    try:
        cursor.execute(
            "INSERT INTO categories (name) VALUES (%s) ON CONFLICT DO NOTHING",
            (category,)
        )
        print(f"✓ {category}")
    except Exception as e:
        print(f"✗ {category}: {e}")

# Commit changes
conn.commit()

# Verify
cursor.execute("SELECT COUNT(*) FROM categories")
count = cursor.fetchone()[0]

print("=" * 60)
print(f"Total kategori di database: {count}")
print("=" * 60)

# Show all categories
cursor.execute("SELECT id, name FROM categories ORDER BY name")
categories_data = cursor.fetchall()

print("\nDaftar Kategori:")
print("-" * 60)
for cat_id, cat_name in categories_data:
    print(f"{cat_id:3d}. {cat_name}")

cursor.close()
conn.close()

print("\n✓ Selesai!")
