from rest_framework import serializers
from app.models import Post, State, City, Category
from django.contrib.auth.models import User


class PostSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        slug_field='username', queryset=User.objects.all())
    state = serializers.SlugRelatedField(
        slug_field='name', queryset=State.objects.all())
    city = serializers.SlugRelatedField(
        slug_field='name', queryset=City.objects.all(), allow_null=True)
    category = serializers.SlugRelatedField(
        slug_field='name', queryset=Category.objects.all())

    class Meta:
        model = Post
        fields = ('id', 'user', 'contact_num', 'state', 'city',
                  'category', 'title', 'slug', 'content', 'pub_date')
