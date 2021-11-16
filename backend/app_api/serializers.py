from rest_framework import serializers
from app.models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'city', 'category', 'user',
                  'title', 'slug', 'content', 'pub_date')
