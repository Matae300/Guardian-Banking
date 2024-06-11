from django.contrib.auth.models import User
from rest_framework import serializers
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
    fields = ["id", 'account_number', 'balance', 'account_type']

class CardSerializer(serializers.ModelSerializer):
  class Meta:
    model = Card
    fields = ["id", 'card_number', 'card_type', 'expiration', 'cvv']

class TransactionSerializer(serializers.ModelSerializer):
    source_account_number = serializers.CharField(write_only=True)
    destination_account_number = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Transaction
        fields = ['transaction_id', 'source_account', 'destination_account', 'amount', 'transaction_type', 'date_time', 'source_account_number', 'destination_account_number']
        read_only_fields = ['transaction_id', 'date_time', 'source_account', 'destination_account']

    def create(self, validated_data):
        source_account_number = validated_data.pop('source_account_number')
        destination_account_number = validated_data.pop('destination_account_number', None)

        try:
            source_account = Account.objects.get(account_number=source_account_number)
        except Account.DoesNotExist:
            raise serializers.ValidationError("Source account does not exist")

        if destination_account_number:
            try:
                destination_account = Account.objects.get(account_number=destination_account_number)
            except Account.DoesNotExist:
                raise serializers.ValidationError("Destination account does not exist")
        else:
            destination_account = None

        validated_data['source_account'] = source_account
        validated_data['destination_account'] = destination_account
        return super().create(validated_data)