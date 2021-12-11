from django.urls import path
from .views import PostList, PostCreate

app_name = 'app_api'

urlpatterns = [
    path('list/', PostList.as_view(), name='post-list'),
    path('create/', PostCreate.as_view(), name='post-create'),
]
