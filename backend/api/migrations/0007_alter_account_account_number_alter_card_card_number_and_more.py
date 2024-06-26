# Generated by Django 5.0.6 on 2024-06-04 22:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_account_balance'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='account_number',
            field=models.IntegerField(unique=True),
        ),
        migrations.AlterField(
            model_name='card',
            name='card_number',
            field=models.IntegerField(unique=True),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='description',
            field=models.TextField(max_length=255),
        ),
    ]
