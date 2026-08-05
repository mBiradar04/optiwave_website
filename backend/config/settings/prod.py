import dj_database_url
from decouple import config

from .base import *

DEBUG = False

# Render provides a single DATABASE_URL when a Postgres instance is linked
# to this service in the Blueprint -- dev.py / docker-compose keep using the
# granular POSTGRES_* vars in base.py, untouched.
DATABASES = {
    'default': dj_database_url.config(
        default=config('DATABASE_URL'),
        conn_max_age=600,
        ssl_require=True,
    )
}

# There's no nginx in front of the Render web service -- whitenoise serves
# Django's own static assets (admin panel, DRF's Swagger UI) directly.
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
] + MIDDLEWARE[1:]

STORAGES = {
    'staticfiles': {
        'BACKEND': 'whitenoise.storage.CompressedManifestStaticFilesStorage',
    },
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

SECURE_SSL_REDIRECT = True
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
