from django.urls import path
from .views import index, get_presigned_url

app_name = 'app'

urlpatterns = [
    path('', index),
    path ('get_presigned_url', get_presigned_url),
    # path('_fake_posts', _fake_posts),
]