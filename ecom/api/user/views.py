from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from .models import CustomUser
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import login,logout
import re
import random
# Create your views here.

def generateSessionToken(length=10):
    l = [chr(i) for i in range(97,123)] + [str(i) for i in range(10)]
    return ''.join(random.SystemRandom().choice(l) for j in range(length))

@csrf_exempt
def signin(request):
    if not request.method == 'POST':
        return JsonResponse({'error':'send post request only.'})
    
    username = request.POST["email"]
    password = request.POST["password"]

    if not re.match("\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b",username):
        return JsonResponse({"error":"Enter valid email"})

    if not re.match("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$",password):
        return JsonResponse({"error":"Password is too weak."})

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(email=username)
        if user.check_password(password):
            user_dic = UserModel.objects.filter(email=username).values().first()
            user_dic.pop('password')

            if user.session_token != "0":
                user.session_token = "0"
                user.save()
                return JsonResponse({'error':'Previous session is not logged out. Please login again'})

            token = generateSessionToken
            user.session_token = token
            user.save()
            login(request,user)
            return JsonResponse({'token':token,'user_details':user_dic})
        else:
            return JsonResponse({"error":"Password doesn't matches."})

    except UserModel.DoesNotExist:
        return JsonResponse({'error':'Email not exist'})