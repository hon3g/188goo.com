from rest_framework import serializers
from app.models import Post


class PostSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()
    city = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'city', 'category', 'user',
                  'title', 'slug', 'content', 'pub_date')

    def get_category(self, post):
        return post.category.name

    def get_city(self, post):
        return post.city.name
