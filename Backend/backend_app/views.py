from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import *
from .serializers import GallerySerializer, SpecialistSerializer
from rest_framework.decorators import api_view


# 1. The List/Create View (You probably have this one)
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

# 2. The Detail/Delete View (THIS IS WHAT IS MISSING!)
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