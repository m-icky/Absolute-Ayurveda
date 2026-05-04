from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import *
from .serializers import *
from rest_framework.decorators import api_view
from django.http import Http404




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

class CourseDetailAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get_object(self, pk):
        try:
            return courses.objects.get(pk=pk)
        except courses.DoesNotExist:
            raise Http404

    def put(self, request, pk, *args, **kwargs):
        course = self.get_object(pk)
        serializer = CourseSerializer(course, data=request.data, partial=True, context={'request': request})

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

    def delete(self, request, pk, *args, **kwargs):
        course = self.get_object(pk)
        course.delete()
    def delete(self, request, pk):
        package = self.get_object(pk)
        if not package:
            return Response({"error": "Package not found"}, status=status.HTTP_404_NOT_FOUND)
        
        package.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)