from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter


# Define your router
router = DefaultRouter()
router.register('accounts', AccountViewset)
router.register('cards', CardViewset)
router.register('transactions', TransactionViewset)

urlpatterns = [
    path('', include(router.urls)),
]