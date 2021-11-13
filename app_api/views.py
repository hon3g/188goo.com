from django.db.models.query import QuerySet
from rest_framework import generics
from app.models import Post
from .serializers import PostSerializer


class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pass

class PostDetail(generics.RetrieveUpdateAPIView):
    pass