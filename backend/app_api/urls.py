from django.urls import path
from .views import AllPosts, SinglePost

app_name = 'app_api'

urlpatterns = [
    path('', AllPosts.as_view(), name='all-posts'),
    path('<str:slug>/', SinglePost.as_view(), name='single-post'),
]
