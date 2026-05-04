from rest_framework import serializers
from .models import Gallery, Specialist

class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = ['id', 'title', 'image', 'description', 'category', 'created_at']

class SpecialistSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = Specialist
        fields = '__all__'