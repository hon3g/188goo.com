from django.urls import path
from django.views.generic.base import TemplateView

from .views import _init_posts

app_name = 'app'

urlpatterns = [
    path('', TemplateView.as_view(template_name="app/index.html")),
    path('_init_posts', _init_posts),
]