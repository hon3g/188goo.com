# Generated by Django 3.2.9 on 2021-11-13 17:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_alter_user_username'),
    ]

    operations = [
        migrations.RenameField(
            model_name='post',
            old_name='author_id',
            new_name='user_id',
        ),
    ]