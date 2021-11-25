from django.http import HttpResponse
from .models import Post, City, User, Category
import random


NY = ['曼哈顿', '布鲁伦', '法拉盛', '皇后区', '布朗士', '长岛', '史登岛']

CATEGORIES = ['餐饮招聘', '美甲招聘', '文职招聘', '酒庄招聘', '按摩招聘', '装修招聘', '其他招聘', '房屋出租',
              '房屋求租', '店铺出租', '房产出租', '餐馆转让', '甲店转让', '按摩转让', '其他转让', '二手物品', '二手汽车', '餐馆用具']

TITLES = ['法拉盛中心商铺 一楼1000尺 加地下室500尺 租$7000/月 可以做餐馆 欢迎合作 电话：917-508-9318', '长岛55出库高薪 会计 收账文员 运输公司', '🦋🦋🦋 布鲁克林甲店誠請全能小工和大工 有意者請電 646-288-6025', '威廉斯堡奶茶店招人 收银/调茶师']

CONTENT = "滚滚长江东逝水，浪花淘尽英雄。是非成败转头空，青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢，古今多少事，都付笑谈中。是非成败转头空，青山依旧在，惯看秋月春风。一壶浊酒喜相逢，古今多少事，滚滚长江东逝水，浪花淘尽英雄。 几度夕阳红。白发渔樵江渚上，都付笑谈中"


def _fake_posts(request):
    for _ in range(88):
        city = City.objects.get(name=random.choice(NY))
        category = Category.objects.get(name=random.choice(CATEGORIES))
        user = User.objects.get(username='hongzhao')
        p = Post(city=city, category=category, user=user, title=random.choice(TITLES), content=CONTENT)
        p.save()

    html = "<html><body>Fake posts created!</body></html>"
    return HttpResponse(html)
