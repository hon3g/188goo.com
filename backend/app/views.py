from django.http import HttpResponse
from .models import Post

def _init_posts(request):
    html = "<html><body>status</body></html>"
    return HttpResponse(html)