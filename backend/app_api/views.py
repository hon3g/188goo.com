from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend

from app.models import Post
from .serializers import PostSerializer


class PostList(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = {DjangoFilterBackend}
    filterset_fields = {
        'id',
        'city__state__name', 'city__name',
        'category__type', 'category__name',
        'slug',
    }
