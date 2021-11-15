from django.db import models
from django.db.models.deletion import CASCADE, PROTECT
from django.utils.text import slugify


class State(models.Model):
    name = models.CharField(max_length=50, unique=True)
    region = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class City(models.Model):
    class Meta:
        verbose_name_plural = "cities"
        
    name = models.CharField(max_length=50, unique=True)
    state = models.ForeignKey(State, on_delete=PROTECT)

    def __str__(self):
        return self.name


class User(models.Model):
    uid = models.CharField(max_length=150, unique=True)
    username = models.CharField(max_length=15, unique=True)

    def __str__(self):
        return self.username


class Category(models.Model):
    class Meta:
        verbose_name_plural = "categories"

    TYPE_CHOICES = [
        ('recruitment', '招聘求职'),
        ('house_rental_and_sale', '房屋租售'),
        ('flea_market', '二手买卖'),
        ('business_transfer', '生意转让'),
        ('city_service', '同城服务'),
    ]
    name = models.CharField(max_length=50)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)

    def __str__(self):
        return self.name


class Post(models.Model):
    class Meta:
        ordering = ['-pub_date']

    

    city = models.ForeignKey(City, on_delete=PROTECT)
    category = models.ForeignKey(Category, on_delete=PROTECT)

    user = models.ForeignKey(User, on_delete=CASCADE)
    title = models.CharField(max_length=50)
    content = models.TextField()

    slug = models.SlugField(blank=True, editable=False)
    pub_date = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title, allow_unicode=True)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Image(models.Model):
    class Meta:
        ordering = ['-pub_date']

    link = models.CharField(max_length=500)
    post = models.ForeignKey(Post, on_delete=CASCADE)
    pub_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.link
