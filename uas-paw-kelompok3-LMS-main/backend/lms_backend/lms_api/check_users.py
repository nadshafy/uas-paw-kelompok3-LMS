import psycopg2

# Connect to database
conn = psycopg2.connect(
    host="localhost",
    database="lms-frand",
    user="postgres",
    password="Dyocarol031003"
)

cursor = conn.cursor()

# Get all users
cursor.execute("SELECT id, name, email, role FROM users ORDER BY id")

print("=== ALL USERS IN DATABASE ===")
print(f"{'ID':<5} {'Name':<20} {'Email':<30} {'Role':<15}")
print("=" * 75)

users = cursor.fetchall()
for user in users:
    user_id, name, email, role = user
    print(f"{user_id:<5} {name:<20} {email:<30} {role:<15}")

print(f"\nTotal users: {len(users)}")

cursor.close()
conn.close()
