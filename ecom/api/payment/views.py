from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
import braintree
# Create your views here.


gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        braintree.Environment.Sandbox,
        merchant_id="4psxwrmxmf5mmsmm",
        public_key="k3j2whfhrdzdxw86",
        private_key="a8b3c557aaa4aa08ecd2240bf4412239"
    )
)

def vadilate_user_session(id,token):
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False

@csrf_exempt
def generate_token(request,id,token):
    if not vadilate_user_session(id,token):
        return JsonResponse({"error":"invalid session"})
    
    client_token = gateway.client_token.generate({
        "customer_id": token
        })
    return JsonResponse({"clienttoken":client_token, "success":True, "error":False})
    
@csrf_exempt
def process_payment(request,id,token):
    if not vadilate_user_session(id,token):
        return JsonResponse({"error":"invalid session"})
    
    nonce_from_fe = request.POST["paymentMethodNonce"]
    amount_from_fe = request.POST["ammount"]
    result =  gateway.transaction.sale({
                "amount": amount_from_fe,
                "payment_method_nonce": nonce_from_fe,
                "options": {
                    "submit_for_settlement": True
                }
            })
    if result.is_success:
        return JsonResponse({"success":True,
        "transaction":{"id": result.transaction.id, "ammount": result.tansaction.ammount}
        })
    else:
        return JsonResponse({"error":True,"success":False})
    