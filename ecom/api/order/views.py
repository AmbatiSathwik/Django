from django.shortcuts import render
from rest_framework import viewsets
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from .serializers import OrderSerializer
from .models import Order
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

def validate_user_sessiontoken(id,token):
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExsist:
        return False

@csrf_exempt
def add(request,id,token):
    if not validate_user_sessiontoken(id,token):
        return JsonResponse({"error":"Login Again", "code":"500"})
    if request.method == "POST":
        user_id = id
        transaction_id = request.POST['transaction_id']
        ammount = request.POST['ammount']
        products = request.POST['products']
        total_products = len(products.split(",")[:-1])

        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(pk=id)
        except UserModel.DoesNotExsist:
            return JsonResponse({"error":"user doesnot exists", "code":"500"})

        ord = Order(user=user,product_name=products,total_products=total_products,transaction_id=transaction_id,total_ammount=ammount)
        ord.save()
        return JsonResponse({"success":True,"error":False,"msg":"Order Successful"})

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all().order_by('id')