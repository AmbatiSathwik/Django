from rest_framework import routers, viewsets
from django.urls import path, include
from . import views

router = routers.DefaultRouter()
router.register(r'', views.ProductViewSet)

urlpatterns = [
    path('',include(router.urls))
]