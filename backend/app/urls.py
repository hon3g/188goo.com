from django.urls import path
from django.views.generic.base import TemplateView

from .views import get_presigned_url

app_name = 'app'

urlpatterns = [
    path('', TemplateView.as_view(template_name="app/index.html")),
    path ('get_presigned_url', get_presigned_url),
    # path('_fake_posts', _fake_posts),
]