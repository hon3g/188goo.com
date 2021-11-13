from django.urls import path
from .views import PostList, PostDetail

app_name = 'app_api'

urlpatterns = [
    path('<str:slug>/', PostDetail.as_view(), name='post-detail'),
    path('', PostList.as_view(), name='post-list'),
]
