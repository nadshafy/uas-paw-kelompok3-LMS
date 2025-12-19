import psycopg2

# Connect to database
conn = psycopg2.connect(
    host="localhost",
    database="lms-frand",
    user="postgres",
    password="Dyocarol031003"
)

cursor = conn.cursor()

# Get all tables
cursor.execute("""
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
    ORDER BY table_name;
""")

tables = cursor.fetchall()

print("=" * 80)
print("DAFTAR TABEL DI DATABASE 'lms-frand'")
print("=" * 80)
print()

for (table_name,) in tables:
    print(f"\n{'='*80}")
    print(f"TABEL: {table_name.upper()}")
    print(f"{'='*80}")
    
    # Get table structure
    cursor.execute(f"""
        SELECT column_name, data_type, character_maximum_length, is_nullable
        FROM information_schema.columns
        WHERE table_name = '{table_name}'
        ORDER BY ordinal_position;
    """)
    
    print(f"{'Column Name':<25} {'Data Type':<20} {'Max Length':<15} {'Nullable':<10}")
    print("-" * 80)
    
    for row in cursor.fetchall():
        col_name, data_type, max_length, is_nullable = row
        max_len_str = str(max_length) if max_length else "N/A"
        print(f"{col_name:<25} {data_type:<20} {max_len_str:<15} {is_nullable:<10}")
    
    # Get row count
    cursor.execute(f"SELECT COUNT(*) FROM {table_name};")
    count = cursor.fetchone()[0]
    print(f"\nTotal rows: {count}")
    
    # Show sample data (first 3 rows)
    if count > 0:
        cursor.execute(f"SELECT * FROM {table_name} LIMIT 3;")
        sample_data = cursor.fetchall()
        
        if sample_data:
            print(f"\nSample Data (first 3 rows):")
            print("-" * 80)
            
            # Get column names
            cursor.execute(f"""
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name = '{table_name}'
                ORDER BY ordinal_position;
            """)
            columns = [col[0] for col in cursor.fetchall()]
            
            # Print column headers
            header = " | ".join([f"{col[:15]:<15}" for col in columns])
            print(header)
            print("-" * 80)
            
            # Print data rows
            for row in sample_data:
                row_str = " | ".join([f"{str(val)[:15]:<15}" for val in row])
                print(row_str)

print("\n" + "=" * 80)
print("SELESAI")
print("=" * 80)

cursor.close()
conn.close()
