from django.contrib import admin
from .models import Account, Card, Transaction

# Register your models here.
admin.site.register(Account)
admin.site.register(Card)
admin.site.register(Transaction)