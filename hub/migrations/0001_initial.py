# Generated by Django 2.2.1 on 2019-05-09 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Driver',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lat', models.DecimalField(decimal_places=6, max_digits=9)),
                ('lng', models.DecimalField(decimal_places=6, max_digits=9)),
            ],
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('origin_lat', models.DecimalField(decimal_places=6, max_digits=9)),
                ('origin_lng', models.DecimalField(decimal_places=6, max_digits=9)),
                ('end_lat', models.DecimalField(decimal_places=6, max_digits=9)),
                ('end_lng', models.DecimalField(decimal_places=6, max_digits=9)),
                ('status', models.CharField(max_length=20)),
                ('eTA', models.DateTimeField()),
                ('driver', models.ForeignKey(on_delete='PROTECT', to='hub.Driver')),
            ],
        ),
    ]