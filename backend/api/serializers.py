from rest_framework import serializers
from .models import *

class MemberSerializer(serializers.ModelSerializer):
  class Meta:
    model = Member
    fields = ('fname', 'lname', 'email', 'passwd', 'age')

class AccountSerializer(serializers.ModelSerializer):
  class Meta:
    model = Account
    fields = ['account_number', 'balance', 'account_type']

class CardSerializer(serializers.ModelSerializer):
  class Meta:
    model = Card
    fields = ['card_number', 'card_type', 'expiration']

class TransactionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Transaction
    fields = ['destination_account', 'amount', 'transaction_type', 'description']

    