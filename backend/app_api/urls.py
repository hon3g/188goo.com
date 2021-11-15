from django.urls import path
from .views import AllPosts, SinglePost, CategoryPosts

app_name = 'app_api'

urlpatterns = [
    path('', AllPosts.as_view(), name='all-posts'),
    path('<str:category>/', CategoryPosts.as_view(), name='category-posts'),
    path('<str:category>/<str:slug>/', SinglePost.as_view(), name='single-post'),
]
