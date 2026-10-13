from django.shortcuts import render
from django.http import HttpResponse
from .models import Operator

# Create your views here.
def get_operators(request):
    operators_list = []
    operators_queryset = Operator.objects.filter(is_active=True)
    for operator in operators_queryset:
        operators_list.append({
            "id" : operator.pk,
            "name" : f"{operator.last_name}, {operator.name}"
        })
    return HttpResponse(str(operators_list))