from django.db import models
from django.db.models.deletion import CASCADE, PROTECT
from django.utils.text import slugify


class State(models.Model):
    name = models.CharField(max_length=50, unique=True)
    region = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class City(models.Model):
    name = models.CharField(max_length=50, unique=True)
    state = models.ForeignKey(State, on_delete=PROTECT)

    def __str__(self):
        return self.name


class User(models.Model):
    uid = models.CharField(max_length=150, unique=True)
    username = models.CharField(max_length=15, unique=True)

    def __str__(self):
        return self.username


class Post(models.Model):
    class Meta:
        ordering = ['-pub_date']

    CATEGORY_CHOICES = [
        ('work', 'work'),
        ('housing', 'housing'),
    ]

    city = models.ForeignKey(City, on_delete=PROTECT)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)

    user = models.ForeignKey(User, on_delete=CASCADE)
    title = models.CharField(max_length=50)
    content = models.TextField()

    slug = models.SlugField(blank=True, editable=False,
                            db_index=True, unique=True)
    pub_date = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        current_slug = slugify(self.title, allow_unicode=True)

        # Delete old post with same title/slug
        filter_result = Post.objects.filter(slug=current_slug)
        if len(filter_result) != 0:
            Post.objects.filter(slug=current_slug).delete()

        self.slug = current_slug
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
