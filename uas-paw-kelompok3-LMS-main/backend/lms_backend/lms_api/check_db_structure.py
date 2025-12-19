import psycopg2

# Connect to database
conn = psycopg2.connect(
    host="localhost",
    database="lms-frand",
    user="postgres",
    password="Dyocarol031003"
)

cursor = conn.cursor()

# Get table structure
cursor.execute("""
    SELECT column_name, data_type, character_maximum_length
    FROM information_schema.columns
    WHERE table_name = 'books'
    ORDER BY ordinal_position;
""")

print("=== Struktur Tabel BOOKS ===")
print(f"{'Column Name':<25} {'Data Type':<20} {'Max Length':<15}")
print("=" * 60)

for row in cursor.fetchall():
    col_name, data_type, max_length = row
    max_len_str = str(max_length) if max_length else "N/A"
    print(f"{col_name:<25} {data_type:<20} {max_len_str:<15}")

cursor.close()
conn.close()
