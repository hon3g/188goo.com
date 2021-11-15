from django.contrib import admin
from .models import Post, State, City, User, Image, Category


class PostAdmin(admin.ModelAdmin):
    ordering = ('-pub_date', )
    readonly_fields = ('slug', 'pub_date')
    list_filter = ('category', 'city_id')


admin.site.register(Post, PostAdmin)
admin.site.register({State, City, User, Image, Category})
