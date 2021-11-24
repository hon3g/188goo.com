from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE, PROTECT
from django.utils.text import slugify
from django.core.validators import RegexValidator

import re
from .choices import CATEGORY_CHOICES, TYPE_CHOICES


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


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_num_regex = RegexValidator(regex=r"^\d{10}$")
    phone_number = models.CharField(
        validators=[phone_num_regex], max_length=10)


class Category(models.Model):
    class Meta:
        verbose_name_plural = "categories"

    name = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)

    def __str__(self):
        return self.name


class Post(models.Model):
    class Meta:
        ordering = ['-pub_date']

    city = models.ForeignKey(City, on_delete=PROTECT)
    category = models.ForeignKey(Category, on_delete=PROTECT)

    user = models.ForeignKey(User, on_delete=CASCADE)
    title = models.CharField(max_length=50, blank=False, null=False)
    content = models.TextField(blank=False)

    slug = models.SlugField(blank=True, null=False, editable=False)
    pub_date = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(de_emojified(self.title), allow_unicode=True)
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


def de_emojified(text):
    regrex_pattern = re.compile(pattern="["
                                u"\U0001F600-\U0001F64F"  # emoticons
                                u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                                u"\U0001F680-\U0001F6FF"  # transport & map symbols
                                u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                                "]+", flags=re.UNICODE)
    return regrex_pattern.sub(r'', text)
