from django.urls import path
from .views import specialist_list, specialist_detail

urlpatterns = [
    path('specialists/', specialist_list),
    path('specialists/<int:pk>/', specialist_detail),
]