# Generated by Django 5.0.6 on 2024-06-04 23:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_member_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='member',
            name='username',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
