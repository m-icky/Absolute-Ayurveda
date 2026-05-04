from django.urls import path
from .views import *

urlpatterns = [
    path('gallery/', GalleryListCreateAPIView.as_view(), name='gallery-list-create'),
    path('gallery/<int:pk>/', GalleryDetailAPIView.as_view(), name='gallery-detail'),

    path('specialists/', specialist_list),
    path('specialists/<int:pk>/', specialist_detail),

    path('packages/', PackageListCreateView.as_view(), name='package-list'),
    path('packages/<int:pk>/', PackageDetailView.as_view(), name='package-detail'),

]