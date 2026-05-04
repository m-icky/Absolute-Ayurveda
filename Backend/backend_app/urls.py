from django.urls import path
from .views import GalleryListCreateAPIView, GalleryDetailAPIView

urlpatterns = [
    path('gallery/', GalleryListCreateAPIView.as_view(), name='gallery-list-create'),
    path('gallery/<int:pk>/', GalleryDetailAPIView.as_view(), name='gallery-detail'),
]