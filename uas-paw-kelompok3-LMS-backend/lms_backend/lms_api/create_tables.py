"""Create all tables in the database"""
from sqlalchemy import create_engine
from lms_api.models.meta import Base
from lms_api.models import models  # Import models to register them

# Database connection
DATABASE_URL = "postgresql+psycopg2://postgres:postgres@localhost:5433/lms-frand"

# Create engine
engine = create_engine(DATABASE_URL)

# Create all tables
print("Creating tables...")
Base.metadata.create_all(engine)
print("Tables created successfully!")

# Print all table names
print("\nCreated tables:")
for table_name in Base.metadata.tables.keys():
    print(f"  - {table_name}")
