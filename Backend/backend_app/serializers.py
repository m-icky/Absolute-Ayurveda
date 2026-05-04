from rest_framework import serializers
from .models import *

class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = ['id', 'title', 'image', 'description', 'category', 'created_at']

class SpecialistSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = Specialist
        fields = '__all__'


class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Packages
        fields = '__all__'