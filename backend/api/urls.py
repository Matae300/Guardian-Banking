from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('member', MemberViewset, basename='member')
router.register('account', AccountViewset, basename='account')
router.register('card', CardViewset, basename='card')
router.register('transaction', TransactionViewset, basename='transaction')



urlpatterns = router.urls

