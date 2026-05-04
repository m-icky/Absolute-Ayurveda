from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Gallery
from .serializers import GallerySerializer

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