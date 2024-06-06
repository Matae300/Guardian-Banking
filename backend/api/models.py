from django.db import models
from django.contrib.auth.models import User
import uuid

class Account(models.Model):
    account_number = models.BigIntegerField(unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='accounts')
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    ACCOUNT_TYPES = (
        ('checking', 'Checking'),
        ('savings', 'Savings'),
    )
    account_type = models.CharField(max_length=20, choices=ACCOUNT_TYPES, default='checking')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.account_type} - {self.account_number}"

class Card(models.Model):
    card_number = models.BigIntegerField(unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cards')
    CARD_TYPES = (
      ('debit', 'Debit'),
      ('credit', 'Credit'),
    )
    card_type = models.CharField(max_length=20, choices=CARD_TYPES, default='debit')
    expiration = models.DateField()
    cvv = models.IntegerField()

    def __str__(self):
        return f"{self.card_type} - {self.card_number}"

class Transaction(models.Model):
    transaction_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
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