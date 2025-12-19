import psycopg2

# Connect to database
conn = psycopg2.connect(
    host="localhost",
    database="lms-frand",
    user="postgres",
    password="Dyocarol031003"
)

cursor = conn.cursor()

# Get books with author and category
cursor.execute("""
    SELECT 
        b.id, 
        b.title, 
        a.name as author, 
        c.name as category, 
        b.description, 
        b.stock 
    FROM books b
    LEFT JOIN authors a ON b.author_id = a.id
    LEFT JOIN categories c ON b.category_id = c.id
    ORDER BY b.id
""")

books = cursor.fetchall()

print("=" * 80)
print("DATA BUKU DI DATABASE")
print("=" * 80)
print(f"Total buku: {len(books)}\n")

if len(books) > 0:
    print(f"{'ID':<5} {'Judul':<30} {'Penulis':<20} {'Kategori':<15} {'Stok':<5}")
    print("-" * 80)
    
    for book in books:
        book_id, title, author, category, description, stock = book
        print(f"{book_id:<5} {title[:29]:<30} {(author or '-')[:19]:<20} {(category or '-')[:14]:<15} {stock:<5}")
        if description:
            print(f"      Deskripsi: {description}")
else:
    print("Belum ada data buku.")

print("\n" + "=" * 80)

# Also check authors and categories
cursor.execute("SELECT COUNT(*) FROM authors")
author_count = cursor.fetchone()[0]

cursor.execute("SELECT COUNT(*) FROM categories")
category_count = cursor.fetchone()[0]

print(f"Total Authors: {author_count}")
print(f"Total Categories: {category_count}")
print("=" * 80)

cursor.close()
conn.close()
