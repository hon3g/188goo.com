from django.http import HttpResponse
from .models import Post, City, User
import random

def _init_posts(request):
    # for _ in range(88888):
    #     NY = ['曼哈顿', '布鲁伦', '法拉盛', '皇后区', '布朗士', '长岛', '史登岛']
    #     c = City.objects.get(name=random.choice(NY))
    #     p = Post(city=c, )

    html = "<html><body>status</body></html>"
    return HttpResponse(html)