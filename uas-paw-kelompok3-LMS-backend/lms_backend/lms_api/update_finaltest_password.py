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

# Hash password baru
password = "user123"
hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

# Update password user finaltest@test.com
cursor.execute(
    "UPDATE users SET password = %s WHERE email = %s",
    (hashed, "finaltest@test.com")
)

conn.commit()

print("✅ Password berhasil di-update!")
print(f"Email: finaltest@test.com")
print(f"Password: {password}")
print(f"Role: member")

cursor.close()
conn.close()
