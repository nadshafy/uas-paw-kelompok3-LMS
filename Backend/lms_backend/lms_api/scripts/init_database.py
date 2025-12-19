"""
Script untuk inisialisasi database dengan membuat tabel dan mengisi data dummy
NOTE: Script ini tidak digunakan karena database sudah ada dari file SQL.
"""
import os
import sys
import transaction
import bcrypt
from datetime import datetime, timedelta, date

from pyramid.paster import get_appsettings, setup_logging
from sqlalchemy import engine_from_config

from ..models.meta import Base
from ..models.models import User, Author, Category, Book, Borrowing
from ..models import get_engine, get_session_factory, get_tm_session


def usage(argv):
    cmd = os.path.basename(argv[0])
    print(f'usage: {cmd} <config_uri>\n'
          '(example: "{cmd} development.ini")')
    sys.exit(1)


def main(argv=sys.argv):
    if len(argv) < 2:
        usage(argv)
    config_uri = argv[1]
    setup_logging(config_uri)
    settings = get_appsettings(config_uri)

    engine = get_engine(settings)

    # Drop semua tabel dan buat ulang
    print("Dropping all tables...")
    Base.metadata.drop_all(engine)
    
    print("Creating all tables...")
    Base.metadata.create_all(engine)

    session_factory = get_session_factory(engine)

    with transaction.manager:
        dbsession = get_tm_session(session_factory, transaction.manager)

        print("Database sudah ada dari file SQL.")
        print("Script ini tidak perlu dijalankan.")
        print("\nJika ingin menambah data dummy, edit script ini.")

        print("\n" + "="*50)
        print("Database initialized successfully!")
        print("="*50)
        print("\nTest Credentials:")
        print("-" * 50)
        print("Librarian:")
        print("  Email: admin@library.com")
        print("  Password: admin123")
        print("\nMember:")
        print("  Email: budi@mail.com")
        print("  Password: member123")
        print("-" * 50)


if __name__ == '__main__':
    main()
