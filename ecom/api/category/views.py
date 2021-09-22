from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CategorySerilizer
from .models import Category
# Create your views here.

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerilizer
    queryset = Category.objects.all().order_by('name')
    
