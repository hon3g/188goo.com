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
        ('recruitment', 'Recruitment'),
        ('house_rental_and_sale', 'House Rental and Sale'),
        ('flea_market', 'Flea Market'),
        ('business_transfer', 'Business Transfer'),
        ('city_service', 'City Service'),
    ]

    CATEGORY_CHOICES = [
        # Recruitment
        ('restaurant', 'Restaurant'),
        ('construction', 'Construction'),
        ('manicure', 'Manicure'),
        ('office', 'Office'),
        ('massage', 'Massage'),
        ('other_recruitment', 'Other Recruitment'),
        # House Rental and Sale
        ('house_for_rent', 'House for Rent'),
        ('house_rent_seeking', 'House Rent Seeking'),
        ('store_rental', 'Store Rental'),
        ('property_sale', 'Property Sale'),
        # Business Transfer
        ('used_cars', 'Used Cars'),
        ('used_goods', 'Used Goods'),
        ('used_restaurant_stuff', 'Used Restaurant Stuff'),
        # City Service
        ('car_service', 'Car Service'),
        ('renovation', 'Renovation'),
        ('hotel', 'Hotel'),
        ('lawyer', 'Lawyer'),
        ('doctor', 'Doctor'),
    ]
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
