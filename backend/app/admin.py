from django.contrib import admin
from .models import Post, State, City, Image, Category


class PostAdmin(admin.ModelAdmin):
    ordering = ('-pub_date', )
    readonly_fields = ('slug', 'pub_date')
    list_filter = ('state_id', 'city_id', 'category')


admin.site.register(Post, PostAdmin)
admin.site.register({State, City, Image, Category})
