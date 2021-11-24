from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend

from app.models import Post
from .serializers import PostSerializer


class PostList(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = {DjangoFilterBackend}
    filterset_fields = {
        'id': ['exact'],
        'city__state__name': ['exact'], 
        'city__name': ['exact'],
        'category__type': ['exact'], 
        'category__name': ['exact'],
        'slug': ['exact'],
    }
