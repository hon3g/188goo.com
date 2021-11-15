from django.db.models.query import QuerySet
from rest_framework import generics
from app.models import Post
from .serializers import PostSerializer


class AllPosts(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class SinglePost(generics.RetrieveUpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'slug'