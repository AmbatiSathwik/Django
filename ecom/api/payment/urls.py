from django.urls import path, include
from . import views

urlpatterns = [
    path('gettoken/<str:id>/<str:token>/',views.generate_token,name="Generate Token"),
    path('payment/<str:id>/<str:token>/',views.process_payment,name="Process Payment"),
]