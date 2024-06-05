from django.db import models
from django.contrib.auth.models import User

class Account(models.Model):
    account_number = models.IntegerField(unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    ACCOUNT_TYPES = (
        ('checking', 'Checking'),
        ('savings', 'Savings'),
    )
    account_type = models.CharField(max_length=20, choices=ACCOUNT_TYPES, default='checking')
    created_at = models.DateTimeField(auto_now_add=True)

class Card(models.Model):
    card_number = models.IntegerField(unique=True)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    CARD_TYPES = (
      ('debit', 'Debit'),
      ('credit', 'Credit'),
    )
    card_type = models.CharField(max_length=20, choices=CARD_TYPES, default='debit')
    expiration = models.DateField()
    cvv = models.IntegerField(unique=True)

class Transaction(models.Model):
    transaction_id = models.UUIDField(primary_key=True, editable=False)
    source_account = models.ForeignKey(Account, related_name='source_transactions', on_delete=models.CASCADE)
    destination_account = models.ForeignKey(Account, related_name='destination_transactions', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    TRANSACTION_TYPES = (
        ('deposit', 'Deposit'),
        ('withdrawal', 'Withdrawal'),
        ('transfer', 'Transfer'),
    )
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
    date_time = models.DateTimeField(auto_now_add=True)
    description = models.TextField(max_length=255)

    def __str__(self):
        return f"Transaction ID: {self.transaction_id}"