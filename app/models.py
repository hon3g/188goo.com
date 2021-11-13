from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE, PROTECT
from django.utils import timezone


class State(models.Model):
    name = models.CharField(max_length=5, unique=True)
    region = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.name


class City(models.Model):
    name = models.CharField(max_length=10, unique=True)
    state_id = models.ForeignKey(State, on_delete=PROTECT)

    def __str__(self):
        return self.name


class Post(models.Model):
    class Meta:
        ordering = ['-pub_date']

    city_id = models.ForeignKey(City, on_delete=PROTECT)
    category = models.CharField(max_length=10, unique=True)

    author_id = models.ForeignKey(User, on_delete=CASCADE)
    title = models.CharField(max_length=50)
    content = models.TextField()

    slug = models.SlugField(max_length=50, unique_for_date='pub_date')
    pub_date = models.DateField(default=timezone.now)

    def __str__(self):
        return self.title
