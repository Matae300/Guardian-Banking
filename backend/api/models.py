from django.db import models

# Create your models here.
class Member(models.Model):
  fname = models.CharField(max_length=50)
  lname = models.CharField(max_length=50)
  email = models.EmailField()
  passwd = models.CharField(max_length=30)
  age = models.IntegerField()

  def __str__(self):
    return self.fname + ' ' + self.lname

class Account(models.Model):
    account_number = models.IntegerField(unique=True, max_length=12)
    user = models.ForeignKey(Member, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    ACCOUNT_TYPES = (
        ('checking', 'Checking'),
        ('savings', 'Savings'),
    )
    account_type = models.CharField(max_length=20, choices=ACCOUNT_TYPES, default='checking')  
    createdat = models.DateTimeField(auto_now_add=True)

class Card(models.Model):
    card_number = models.IntegerField(unique=True, max_length=20)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    CARD_TYPES = (
        ('debit', 'Debit'),
        ('credit', 'Credit'),
    )
    card_type = models.CharField(max_length=20, choices=CARD_TYPES, default='debit') 
    expiration = models.DateField()
    cvv = models.IntegerField(unique=True, max_length=3)

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
    description = models.TextField()

    def __str__(self):
        return f"Transaction ID: {self.transaction_id}"