from django.urls import path
from .views import PostList

app_name = 'app_api'

urlpatterns = [
    path('', PostList.as_view(), name='post-list'),
]
