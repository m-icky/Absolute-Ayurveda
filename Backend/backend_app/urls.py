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
    path('courses/<slug:slug>/', CourseBySlugView.as_view(),    name='course-by-slug'),

    path('packages/',          PackageListCreateView.as_view(), name='package-list'),
    path('packages/<int:pk>/', PackageDetailView.as_view(),     name='package-detail'),
    path('packages/<slug:slug>/', PackageBySlugView.as_view(),  name='package-by-slug'),

    path('consultations/',          ConsultationListAPIView.as_view(), name='consultation-list'),
    path('consultations/<int:pk>/', ConsultationDetailAPIView.as_view(), name='consultation-detail'),

    path('blogs/',                    BlogPostListCreateAPIView.as_view(), name='blog-list-create'),
    path('blogs/<int:pk>/',           BlogPostDetailAPIView.as_view(),     name='blog-detail'),
    path('blogs/<int:pk>/view/',      BlogPostViewCountView.as_view(),     name='blog-view-count'),
    path('blogs/<int:pk>/like/',      BlogPostLikeView.as_view(),          name='blog-like'),
    path('blogs/<slug:slug>/',        BlogBySlugView.as_view(),            name='blog-by-slug'),
    path('blogs/<slug:slug>/view/',   BlogBySlugViewCountView.as_view(),   name='blog-slug-view-count'),
    path('blogs/<slug:slug>/like/',   BlogBySlugLikeView.as_view(),        name='blog-slug-like'),

    # path('auth/setup/', FirstTimeSetupView.as_view(), name='first-time-setup'),
]