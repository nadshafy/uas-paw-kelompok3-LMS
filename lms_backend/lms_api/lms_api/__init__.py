from pyramid.config import Configurator


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    with Configurator(settings=settings) as config:
        config.include('pyramid_jinja2')
        
        # Setup CORS
        def add_cors_headers(event):
            event.response.headers.update({
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '3600',
            })
        
        config.add_subscriber(add_cors_headers, 'pyramid.events.NewResponse')
        
        # Handle OPTIONS requests for CORS preflight
        def add_cors_preflight_handler():
            def cors_options_view(context, request):
                return {}
            
            config.add_view(cors_options_view, route_name='api_books', request_method='OPTIONS', renderer='json')
            config.add_view(cors_options_view, route_name='api_book_detail', request_method='OPTIONS', renderer='json')
            config.add_view(cors_options_view, route_name='api_categories', request_method='OPTIONS', renderer='json')
            config.add_view(cors_options_view, route_name='api_borrowings', request_method='OPTIONS', renderer='json')
            config.add_view(cors_options_view, route_name='api_borrowing_detail', request_method='OPTIONS', renderer='json')
            config.add_view(cors_options_view, route_name='api_borrowing_return', request_method='OPTIONS', renderer='json')
            config.add_view(cors_options_view, route_name='api_register', request_method='OPTIONS', renderer='json')
            config.add_view(cors_options_view, route_name='api_login', request_method='OPTIONS', renderer='json')
            config.add_view(cors_options_view, route_name='api_users', request_method='OPTIONS', renderer='json')
            config.add_view(cors_options_view, route_name='api_user_detail', request_method='OPTIONS', renderer='json')
        
        config.action('cors_preflight', add_cors_preflight_handler)
        
        config.include('.routes')
        config.include('.models')
        config.scan()
    return config.make_wsgi_app()
