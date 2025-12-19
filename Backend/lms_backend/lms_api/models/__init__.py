from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import configure_mappers
import zope.sqlalchemy


# Import or define all models here to ensure they are attached to the
# ``Base.metadata`` prior to any initialization routines.
from .mymodel import MyModel  # flake8: noqa
from .models import User, Author, Category, Book, Borrowing  # flake8: noqa


# Run ``configure_mappers`` after defining all of the models to ensure
# all relationships can be setup.
configure_mappers()


def get_engine(settings, prefix='sqlalchemy.'):
    return engine_from_config(settings, prefix)


def get_session_factory(engine):
    factory = sessionmaker()
    factory.configure(bind=engine)
    return factory


def get_tm_session(session_factory, transaction_manager, request=None):
    dbsession = session_factory(info={"request": request})
    zope.sqlalchemy.register(
        dbsession, 
        transaction_manager=transaction_manager,
        keep_session=True
    )
    return dbsession


def includeme(config):
    """
    Initialize the model for a Pyramid app.
    Activate this setup using ``config.include('lms_api.models')``.
    """
    settings = config.get_settings()

    # PENTING: JANGAN pakai explicit_manager untuk request web normal
    # settings['tm.manager_hook'] = 'pyramid_tm.explicit_manager'  <-- HAPUS

    # Hook transaction lifecycle ke request (auto-commit kalau sukses)
    config.include('pyramid_tm')

    # Retry request kalau transient error
    config.include('pyramid_retry')

    dbengine = settings.get('dbengine')
    if not dbengine:
        dbengine = get_engine(settings)

    session_factory = get_session_factory(dbengine)
    config.registry['dbsession_factory'] = session_factory

    def dbsession(request):
        dbsession = request.environ.get('app.dbsession')
        if dbsession is None:
            dbsession = get_tm_session(session_factory, request.tm, request=request)
        return dbsession

    config.add_request_method(dbsession, reify=True)
