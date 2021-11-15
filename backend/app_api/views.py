from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from app.models import Post
from .serializers import PostSerializer


class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = {DjangoFilterBackend}
    filterset_fields = {'city', 'category', 'user_id', 'slug'}
