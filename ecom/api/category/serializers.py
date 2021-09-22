from rest_framework import serializers
from .models import Category

class CategorySerilizer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ['name','description']