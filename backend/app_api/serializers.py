from rest_framework import serializers
from app.models import Post


class PostSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()
    city = serializers.SerializerMethodField()
    state = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'state', 'city', 'category', 'user',
                  'title', 'slug', 'content', 'pub_date')

    def get_category(self, post):
        return post.category.name

    def get_city(self, post):
        if post.city:
            return post.city.name
        return None

    def get_state(self, post):
        return post.state.name
