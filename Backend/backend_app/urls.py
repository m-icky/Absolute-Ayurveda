from django.urls import path
from .views import *
from .views import specialist_list, specialist_detail

urlpatterns = [

    path('auth/login/',  AdminLoginView.as_view(),       name='admin-login'),
    path('auth/verify/', AdminTokenVerifyView.as_view(), name='admin-token-verify'),

    path('auth/change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('auth/forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('auth/reset-password/',  ResetPasswordView.as_view(),  name='reset-password'), 
    path('auth/profile/', AdminProfileView.as_view(), name='admin-profile'), 

    path('gallery/',          GalleryListCreateAPIView.as_view(), name='gallery-list-create'),
    path('gallery/<int:pk>/', GalleryDetailAPIView.as_view(),     name='gallery-detail'),

    path('specialists/',          specialist_list),
    path('specialists/<int:pk>/', specialist_detail),

    path('courses/',          CourseListCreateAPIView.as_view(), name='course-list-create'),
    path('courses/<int:pk>/', CourseDetailAPIView.as_view(),     name='course-detail'),

    path('packages/',          PackageListCreateView.as_view(), name='package-list'),
    path('packages/<int:pk>/', PackageDetailView.as_view(),     name='package-detail'),

    path('consultations/',          ConsultationListAPIView.as_view(), name='consultation-list'),
    path('consultations/<int:pk>/', ConsultationDetailAPIView.as_view(), name='consultation-detail'),

    path('auth/setup/', FirstTimeSetupView.as_view(), name='first-time-setup'),
]