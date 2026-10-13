from django.urls import path

from .views import get_operators

urlpatterns = [
    path("operators", get_operators),
    
]
