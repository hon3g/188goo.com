# Generated by Django 3.2.9 on 2021-11-13 17:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_rename_author_id_post_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='slug',
            field=models.SlugField(blank=True, unique_for_date='pub_date'),
        ),
    ]
