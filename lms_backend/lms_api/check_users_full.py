import psycopg2

# Connect to database
conn = psycopg2.connect(
    host="localhost",
    database="lms-frand",
    user="postgres",
    password="Dyocarol031003"
)

cursor = conn.cursor()

# Get all users WITH password hash
cursor.execute("SELECT id, name, email, role, password FROM users ORDER BY id")

print("=== ALL USERS IN DATABASE (WITH PASSWORD HASH) ===")
print(f"{'ID':<5} {'Name':<20} {'Email':<30} {'Role':<15} {'Password Hash (first 30 chars)'}")
print("=" * 110)

users = cursor.fetchall()
for user in users:
    user_id, name, email, role, password = user
    # Tampilkan 30 karakter pertama dari password hash
    pwd_preview = password[:30] + "..." if password else "NULL"
    print(f"{user_id:<5} {name:<20} {email:<30} {role:<15} {pwd_preview}")

print(f"\nTotal users: {len(users)}")

cursor.close()
conn.close()
