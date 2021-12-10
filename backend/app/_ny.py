NY = ['曼哈顿', '布鲁伦', '法拉盛', '皇后区', '布朗士', '长岛', '史登岛']

# from django.db import migrations
# from app._ny import NY


# class Migration(migrations.Migration):

#     def init_new_york_city(apps, schema_editor):
#         State = apps.get_model('app', 'State')
#         City = apps.get_model('app', 'City')
#         for city in NY:
#             s = State.objects.get(name='纽约')
#             c = City(name=city, state=s)
#             c.save()

#     dependencies = [
#         ('app', '0002_auto_20211125_1646'),
#     ]

#     operations = [
#         migrations.RunPython(init_new_york_city),
#     ]