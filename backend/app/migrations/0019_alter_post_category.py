# Generated by Django 3.2.9 on 2021-11-15 22:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0018_auto_20211115_2241'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='category',
            field=models.CharField(choices=[('work', 'work'), ('housing', 'housing')], max_length=50),
        ),
    ]
