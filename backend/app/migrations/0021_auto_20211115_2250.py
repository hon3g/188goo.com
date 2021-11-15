# Generated by Django 3.2.9 on 2021-11-15 22:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0020_alter_post_category'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='category',
            options={'verbose_name_plural': 'categories'},
        ),
        migrations.AlterModelOptions(
            name='city',
            options={'verbose_name_plural': 'cities'},
        ),
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='category',
            name='type',
            field=models.CharField(choices=[('work', 'work'), ('housing', 'housing')], max_length=50),
        ),
    ]