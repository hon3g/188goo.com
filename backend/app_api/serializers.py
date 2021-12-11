from rest_framework import serializers
from app.models import Post, State, City, Category, Image
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

    images = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'user', 'contact_num', 'state', 'city',
                  'category', 'title', 'slug', 'content', 'images', 'pub_date')

    def get_images(self, post):
        queryset = Image.objects.filter(post=post.id)
        img_urls = queryset.values_list('img_url', flat=True)
        return list(img_urls)


class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = ('post', 'img_url')
