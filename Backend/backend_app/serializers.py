from rest_framework import serializers
from .models import *

class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = ['id', 'title', 'image', 'description', 'created_at']
        
class SpecialistSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = Specialist
        fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = courses
        fields = ['id', 'title', 'description', 'image', 'duration', 'level', 'status', 'created_at', 'updated_at']
class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Packages
        fields = '__all__'



class ConsultationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultationRequest
        fields = ['id', 'name', 'phone', 'email', 'message', 'status', 'created_at']