from django.urls import path
from .views import PostList, PostCreate, ImageCreate

app_name = 'app_api'

urlpatterns = [
    path('list/', PostList.as_view(), name='post-list'),
    path('create/', PostCreate.as_view(), name='post-create'),
    path('images/', ImageCreate.as_view(), name='image-create'),
]
