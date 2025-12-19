from pyramid.view import view_config
from sqlalchemy import text

@view_config(route_name="api_db_check", request_method="GET", renderer="json")
def db_check(request):
    db = request.dbsession

    info = db.execute(text("""
        SELECT current_database() AS db,
               current_schema() AS schema,
               inet_server_addr()::text AS server_ip,
               inet_server_port() AS server_port,
               version() AS version
    """)).fetchone()

    count_users = db.execute(text("SELECT count(*) AS n FROM users")).fetchone()

    last_users = db.execute(text("""
        SELECT id, email, role
        FROM users
        ORDER BY id DESC
        LIMIT 5
    """)).fetchall()

    return {
        "db_info": dict(info._mapping),
        "users_count": count_users._mapping["n"],
        "last_users": [dict(r._mapping) for r in last_users],
    }
