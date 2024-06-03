from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
# Create your views here.

def home(request):
  return HttpResponse("this is homepage")

