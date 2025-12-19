import psycopg2
import bcrypt

# Connect to database
conn = psycopg2.connect(
    host="localhost",
    database="lms-frand",
    user="postgres",
    password="Dyocarol031003"
)

cursor = conn.cursor()

# Hash password yang benar
password = "admin123"
hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

# Update password user id=1
cursor.execute(
    "UPDATE users SET password = %s WHERE id = 1",
    (hashed,)
)

conn.commit()

print("✅ Password berhasil di-update!")
print(f"Email: admin@frand.com")
print(f"Password: {password}")
print(f"Role: librarian")
print(f"\nPassword Hash: {hashed[:50]}...")

cursor.close()
conn.close()
