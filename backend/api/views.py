from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import *
from .models import *

def home(request):
    return HttpResponse("This is the homepage.")

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class AccountViewset(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Account.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CardViewset(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TransactionViewset(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        source_account_number = self.request.data.get('source_account_number')
        destination_account_number = self.request.data.get('destination_account_number')
        transaction_type = serializer.validated_data['transaction_type']
        amount = serializer.validated_data['amount']

        source_account = get_object_or_404(Account, account_number=source_account_number)

        if transaction_type in ['withdrawal', 'transfer']:
            if source_account.balance < amount:
                raise serializers.ValidationError("Insufficient funds in the source account")
            if amount == 0.00:
                raise serializers.ValidationError("must include amount")

        destination_account = None

        if transaction_type == 'transfer':
            if source_account_number == destination_account_number:
                raise serializers.ValidationError("Source and destination accounts cannot be the same")
            else:
                destination_account = get_object_or_404(Account, account_number=destination_account_number)
                destination_account.balance += amount
                destination_account.save()

        if transaction_type == 'deposit':
            if amount == 0.00:
                raise serializers.ValidationError("must include amount")
            source_account.balance += amount
        else:
            source_account.balance -= amount

        source_account.save()

        serializer.save(user=self.request.user, source_account=source_account, destination_account=destination_account)

    def list(self, request, *args, **kwargs):
        user_accounts = self.request.user.accounts.all()
        if user_accounts:
            source_transactions = self.queryset.filter(source_account__in=user_accounts)
            destination_transactions = self.queryset.filter(destination_account__in=user_accounts)
            transactions = (source_transactions | destination_transactions).distinct()
            serializer = self.serializer_class(transactions, many=True)
            return Response(serializer.data)
        else:
            return Response({"detail": "User has no associated accounts."}, status=400)

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        transaction = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(transaction)
        return Response(serializer.data)

    def update(self, request, pk=None):
        transaction = get_object_or_404(self.queryset, pk=pk)
        serializer = self.serializer_class(transaction, data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        transaction = get_object_or_404(self.queryset, pk=pk)
        transaction.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
