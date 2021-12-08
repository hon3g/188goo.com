from decouple import config
import firebase_admin
from firebase_admin import auth
from rest_framework import authentication
from django.contrib.auth.models import User
from .exceptions import InvalidAuthToken, FirebaseError


cred = firebase_admin.credentials.Certificate({
    'type': 'service_account',
    'project_id': config('FIREBASE_PROJECT_ID'),
    'private_key_id': config('FIREBASE_PRIVATE_KEY_ID'),
    'private_key': config('FIREBASE_PRIVATE_KEY').replace('\\n', '\n'),
    'client_email': config('FIREBASE_CLIENT_EMAIL'),
    'client_id': config('FIREBASE_CLIENT_ID'),
    'auth_uri': 'https://accounts.google.com/o/oauth2/auth',
    'token_uri': 'https://oauth2.googleapis.com/token',
    'auth_provider_x509_cert_url': 'https://www.googleapis.com/oauth2/v1/certs',
    'client_x509_cert_url': config('FIREBASE_CLIENT_X509_CERT_URL')
})

default_app = firebase_admin.initialize_app(cred)


class FirebaseAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if not auth_header:
            # raise NoAuthToken('No auth token provided')
            # IsAuthenticatedOrReadOnly
            return None

        id_token = auth_header.split(' ').pop()
        decoded_token = None

        try:
            decoded_token = auth.verify_id_token(id_token)
        except Exception:
            raise InvalidAuthToken('Invalid auth token')

        if not id_token or not decoded_token:
            return None

        try:
            uid = decoded_token.get('uid')
        except Exception:
            raise FirebaseError()

        user, _ = User.objects.get_or_create(username=uid)
        return (user, None)
