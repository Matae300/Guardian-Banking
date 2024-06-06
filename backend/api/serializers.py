from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user

class AccountSerializer(serializers.ModelSerializer):
  class Meta:
    model = Account
    fields = ['account_number', 'balance', 'account_type']

class CardSerializer(serializers.ModelSerializer):
  class Meta:
    model = Card
    fields = ['card_number', 'card_type', 'expiration', 'cvv']

class TransactionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Transaction
    fields = ['destination_account', 'amount', 'transaction_type', 'description']

    