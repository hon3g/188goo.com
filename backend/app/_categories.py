CATEGORIES = {
    '招聘求职': ['餐饮招聘', '美甲招聘', '文职招聘', '酒庄招聘', '按摩招聘', '装修招聘', '其他招聘'],
    '房屋租售': ['房屋出租', '房屋求租', '店铺出租', '房产出租'],
    '生意转让': ['餐馆转让', '甲店转让', '按摩转让', '其他转让'],
    '二手买卖': ['二手物品', '二手汽车', '餐馆用具'],
}


# from django.db import migrations
# from app._category_data import CATEGORIES


# class Migration(migrations.Migration):

#     def init_categaories(apps, schema_editor):
#         Category = apps.get_model('app', 'Category')
#         for type, categories in CATEGORIES.items():
#             for category in categories:
#                 c = Category(name=category, type=type)
#                 c.save()

#     dependencies = [
#         ('app', '0003_auto_20211125_1701'),
#     ]

#     operations = [
#         migrations.RunPython(init_categaories),
#     ]