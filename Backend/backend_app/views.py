from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import *
from .serializers import *
from rest_framework.decorators import api_view
from django.http import Http404

from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from django.contrib.auth.models import User
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.conf import settings
import base64
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str


class AdminLoginView(APIView):
    def post(self, request):
        username = request.data.get("username", "").strip()
        password = request.data.get("password", "")

        if not username or not password:
            return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=username, password=password)

        if user is None:
            return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)

        if not (user.is_staff or user.is_superuser):
            return Response({"error": "You do not have admin access."}, status=status.HTTP_403_FORBIDDEN)

        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "username": user.username,
        }, status=status.HTTP_200_OK)


class AdminTokenVerifyView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"valid": True, "username": request.user.username})



class ForgotPasswordView(APIView):
    def post(self, request):
        email = request.data.get("email", "").strip()

        if not email:
            return Response({"error": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"success": "If this email exists, a reset link has been sent."}, status=status.HTTP_200_OK)

        token     = PasswordResetTokenGenerator().make_token(user)
        uid       = urlsafe_base64_encode(force_bytes(user.pk))
        reset_url = f"{settings.FRONTEND_URL}/admin/reset-password?uid={uid}&token={token}"

        try:
            send_mail(
                subject="Absolute Ayurveda — Password Reset Request",
                message=f"Hi {user.username},\n\nClick the link below to reset your password:\n\n{reset_url}\n\nThis link expires in 1 hour. If you did not request this, ignore this email.",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
                fail_silently=False,
            )
        except Exception as e:
            print("Email error:", e)
            return Response({"error": "Failed to send email. Check your email configuration."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({"success": "If this email exists, a reset link has been sent."}, status=status.HTTP_200_OK)


        
class ResetPasswordView(APIView):
    def post(self, request):
        uid              = request.data.get("uid", "")
        token            = request.data.get("token", "")
        new_password     = request.data.get("new_password", "")
        confirm_password = request.data.get("confirm_password", "")

        if not all([uid, token, new_password, confirm_password]):
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return Response({"error": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

        if len(new_password) < 8:
            return Response({"error": "Password must be at least 8 characters."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_id = force_str(urlsafe_base64_decode(uid))
            user    = User.objects.get(pk=user_id)
        except (User.DoesNotExist, ValueError, TypeError):
            return Response({"error": "Invalid reset link."}, status=status.HTTP_400_BAD_REQUEST)

        if not PasswordResetTokenGenerator().check_token(user, token):
            return Response({"error": "Reset link is invalid or has expired."}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({"success": "Password reset successfully. You can now log in."}, status=status.HTTP_200_OK)


class GalleryListCreateAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        galleries = Gallery.objects.all().order_by('-created_at')
        serializer = GallerySerializer(galleries, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = GallerySerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GalleryDetailAPIView(APIView):
    def delete(self, request, pk, *args, **kwargs):
        try:
            gallery = Gallery.objects.get(pk=pk)
            gallery.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Gallery.DoesNotExist:
            return Response({'error': 'Image not found'}, status=status.HTTP_404_NOT_FOUND)

 

@api_view(['GET', 'POST'])
def specialist_list(request):

    if request.method == 'GET':
        specialists = Specialist.objects.all()
        serializer = SpecialistSerializer(
            specialists,
            many=True,
            context={'request': request}
        )
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = SpecialistSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        print(serializer.errors)  
        return Response(serializer.errors, status=400)


@api_view(['GET', 'PUT', 'DELETE'])
def specialist_detail(request, pk):

    try:
        specialist = Specialist.objects.get(pk=pk)
    except Specialist.DoesNotExist:
        return Response({"error": "Not found"}, status=404)

    if request.method == 'GET':
        serializer = SpecialistSerializer(specialist)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = SpecialistSerializer(specialist, data=request.data, partial=True) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        print(serializer.errors)
        return Response(serializer.errors, status=400)

    if request.method == 'DELETE':
        specialist.delete()
        return Response(status=204)


class CourseListCreateAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        all_courses = courses.objects.all().order_by('-created_at')
        serializer = CourseSerializer(all_courses, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = CourseSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseDetailAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get_object(self, pk):
        try:
            return courses.objects.get(pk=pk)
        except courses.DoesNotExist:
            from django.http import Http404
            raise Http404

    def put(self, request, pk, *args, **kwargs):
        course = self.get_object(pk)
        serializer = CourseSerializer(course, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        course = self.get_object(pk)
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class PackageListCreateView(APIView):
    def get(self, request):
        packages = Packages.objects.all()
        serializer = PackageSerializer(packages, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PackageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PackageListCreateView(APIView):
    def get(self, request):
        packages = Packages.objects.all()
        
        serializer = PackageSerializer(packages, many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = PackageSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PackageDetailView(APIView):
    def get_object(self, pk):
        try:
            return Packages.objects.get(pk=pk)
        except Packages.DoesNotExist:
            return None

    def get(self, request, pk):
        package = self.get_object(pk)
        if not package:
            return Response({"error": "Package not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = PackageSerializer(package, context={'request': request})
        return Response(serializer.data)

    def put(self, request, pk):
        package = self.get_object(pk)
        if not package:
            return Response({"error": "Package not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = PackageSerializer(package, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        package = self.get_object(pk)
        if not package:
            return Response({"error": "Package not found"}, status=status.HTTP_404_NOT_FOUND)
        
        package.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ConsultationListAPIView(APIView):
    def get(self, request, *args, **kwargs):
        consultations = ConsultationRequest.objects.all().order_by('-created_at')
        serializer = ConsultationRequestSerializer(consultations, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = ConsultationRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ConsultationDetailAPIView(APIView):
    def get_object(self, pk):
        try:
            return ConsultationRequest.objects.get(pk=pk)
        except ConsultationRequest.DoesNotExist:
            raise Http404

    def put(self, request, pk, *args, **kwargs):
        consultation = self.get_object(pk)
        serializer = ConsultationRequestSerializer(consultation, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        consultation = self.get_object(pk)
        consultation.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


from django.contrib.auth.hashers import check_password

class ChangePasswordView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        current_password = request.data.get("current_password", "")
        new_password     = request.data.get("new_password", "")
        confirm_password = request.data.get("confirm_password", "")

        if not current_password or not new_password or not confirm_password:
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        if not user.check_password(current_password):
            return Response({"error": "Current password is incorrect."}, status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return Response({"error": "New passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

        if len(new_password) < 8:
            return Response({"error": "Password must be at least 8 characters."}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({"success": "Password changed successfully."}, status=status.HTTP_200_OK)