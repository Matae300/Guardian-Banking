from django.contrib import admin
from .models import Member, Account, Card, Transaction

# Register your models here.
admin.site.register(Member)
admin.site.register(Account)
admin.site.register(Card)
admin.site.register(Transaction)