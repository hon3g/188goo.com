# Generated by Django 3.2.9 on 2021-11-15 04:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0014_auto_20211113_1956'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='category',
            field=models.CharField(choices=[('work', 'work'), ('housing', 'housing')], max_length=50),
        ),
    ]