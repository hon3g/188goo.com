from rest_framework import generics
from app.models import Post
from .serializers import PostSerializer


class AllPosts(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class CategoryPosts(generics.ListCreateAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        current_category = self.kwargs['category']
        category_posts = Post.objects.filter(category=current_category)
        return category_posts


class SinglePost(generics.RetrieveUpdateAPIView):
    serializer_class = PostSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        current_category = self.kwargs['category']
        current_slug = self.kwargs['slug']
        single_post = Post.objects.filter(
            category=current_category, slug=current_slug)
        return single_post
