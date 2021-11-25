from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import Post, State, City, UserProfile, Image, Category


class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False


class UserAdmin(BaseUserAdmin):
    inlines = (UserProfileInline,)


class PostAdmin(admin.ModelAdmin):
    ordering = ('-pub_date', )
    readonly_fields = ('slug', 'pub_date')
    list_filter = ('city_id', 'category')


admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Post, PostAdmin)
admin.site.register({State, City, Image, Category})
