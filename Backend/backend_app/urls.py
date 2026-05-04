from django.urls import path
from .views import *
from .views import specialist_list, specialist_detail

urlpatterns = [
    path('gallery/', GalleryListCreateAPIView.as_view(), name='gallery-list-create'),
    path('gallery/<int:pk>/', GalleryDetailAPIView.as_view(), name='gallery-detail'),

    path('specialists/', specialist_list),
    path('specialists/<int:pk>/', specialist_detail),

    path('courses/', CourseListCreateAPIView.as_view(), name='course-list-create'),
    path('courses/<int:pk>/', CourseDetailAPIView.as_view(), name='course-detail'),

]