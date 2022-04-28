from rest_framework import serializers
from app.models import Post, State, City, Category, Image
from django.contrib.auth.models import User

from .banned import BANNED_WORDS


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
                  'category', 'title', 'slug', 'description', 'images', 'pub_date')


    def validate(self, attrs):
        for word in BANNED_WORDS:
            if word in attrs['title'] or word in attrs['description']:
                raise serializers.ValidationError()
        return attrs


    # Hide some fields in get requests for now
    def to_representation(self, obj):
        rep = super(PostSerializer, self).to_representation(obj)
        rep.pop('user', None)
        rep.pop('slug', None)
        return rep


    def get_images(self, post):
        queryset = Image.objects.filter(post=post.id)
        img_urls = queryset.values_list('img_url', flat=True)
        return list(img_urls)


class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = ('post', 'img_url')
