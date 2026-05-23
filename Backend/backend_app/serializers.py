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


class BlogPostSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = [
            'id', 'category', 'title', 'slug', 'excerpt', 'content', 'image', 
            'author_name', 'author_avatar', 'date', 'views', 'likes', 'status', 
            'created_at', 'updated_at', 'author'
        ]

    def get_author(self, obj):
        request = self.context.get('request')
        avatar_url = None
        if obj.author_avatar:
            if request:
                avatar_url = request.build_absolute_uri(obj.author_avatar.url)
            else:
                avatar_url = obj.author_avatar.url
        else:
            avatar_url = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100"
            
        return {
            'name': obj.author_name or "Dr. Naveen Kumar",
            'avatar': avatar_url
        }