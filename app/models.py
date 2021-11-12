from django.db import models
from django.contrib.auth.models import User
from django.db.models.base import Model
from django.db.models.deletion import CASCADE, PROTECT
from django.utils import timezone

from choices import STATE_CHOICES, REGION_CHOICES


class State(models.Model):
    name = models.CharField(max_length=2, choices=STATE_CHOICES)

    def __str__(self):
        return self.name


class City(models.Model):
    state = models.ForeignKey(State, on_delete=PROTECT)
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class SubCategory(models.Model):
    category = models.ForeignKey(Category, on_delete=PROTECT)
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Post(models.Model):
    class Meta:
        ordering = ['-pub_date']

    state = models.ForeignKey(State, on_delete=PROTECT)
    city = models.ForeignKey(City, on_delete=PROTECT)

    category = models.ForeignKey(Category, on_delete=PROTECT)
    sub_category = models.ForeignKey(SubCategory, on_delete=PROTECT)

    author = models.ForeignKey(User, on_delete=CASCADE)
    title = models.CharField(max_length=250)
    content = models.TextField()

    slug = models.SlugField(max_length=250, unique_for_date='pub_date')
    pub_date = models.DateField(default=timezone.now)

    def __str__(self):
        return self.title
