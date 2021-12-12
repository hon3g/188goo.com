from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE, PROTECT
from django.utils.text import slugify

import re


class State(models.Model):
    name = models.CharField(max_length=50, unique=True)
    region = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class City(models.Model):
    class Meta:
        verbose_name_plural = "cities"

    name = models.CharField(max_length=50, unique=True)
    state = models.ForeignKey(State, on_delete=PROTECT)

    def __str__(self):
        return self.name


class Category(models.Model):
    class Meta:
        verbose_name_plural = "categories"

    name = models.CharField(max_length=50, unique=True)
    type = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Post(models.Model):
    class Meta:
        ordering = ['-pub_date']

    contact_num = models.CharField(max_length=20)

    state = models.ForeignKey(State, on_delete=PROTECT)
    city = models.ForeignKey(City, on_delete=PROTECT, blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=PROTECT)

    user = models.ForeignKey(User, on_delete=CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField()

    slug = models.SlugField(blank=True, editable=False)
    pub_date = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(de_emojified(self.title), allow_unicode=True)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Image(models.Model):
    class Meta:
        ordering = ['-pub_date']

    post = models.ForeignKey(Post, on_delete=CASCADE)
    img_url = models.CharField(max_length=500)
    pub_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.img_url


def de_emojified(text):
    regrex_pattern = re.compile(pattern="["
                                u"\U0001F600-\U0001F64F"  # emoticons
                                u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                                u"\U0001F680-\U0001F6FF"  # transport & map symbols
                                u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                                "]+", flags=re.UNICODE)
    return regrex_pattern.sub(r'', text)
