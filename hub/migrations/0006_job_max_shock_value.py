# Generated by Django 2.2.1 on 2019-05-16 20:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hub', '0005_auto_20190517_0434'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='max_shock_value',
            field=models.IntegerField(default=5),
            preserve_default=False,
        ),
    ]
