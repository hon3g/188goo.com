from rest_framework import serializers
from app.models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['city', 'category', 'user_id',
                  'title', 'content', 'slug']
