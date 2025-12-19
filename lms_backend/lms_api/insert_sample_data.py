"""Insert sample data into the database"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from lms_api.models.models import Category, Author

# Database connection
DATABASE_URL = "postgresql+psycopg2://postgres:postgres@localhost:5433/lms-frand"

# Create engine and session
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

try:
    # Insert categories
    categories = [
        Category(name='Fiction'),
        Category(name='Non-Fiction'),
        Category(name='Science'),
        Category(name='Technology'),
        Category(name='History'),
        Category(name='Biography'),
        Category(name='Literature'),
        Category(name='Philosophy'),
        Category(name='Religion'),
        Category(name='Arts'),
    ]
    
    # Check if categories already exist
    existing_count = session.query(Category).count()
    if existing_count == 0:
        session.add_all(categories)
        session.commit()
        print(f"✓ Inserted {len(categories)} categories")
    else:
        print(f"✓ Categories already exist ({existing_count} categories)")
    
    print("\nSample data inserted successfully!")
    
except Exception as e:
    session.rollback()
    print(f"Error: {e}")
finally:
    session.close()
