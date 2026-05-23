from rest_framework import serializers
from .models import *
import json


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
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Packages
        fields = '__all__'

    def to_internal_value(self, data):
        """
        sections arrives as a JSON string when sent via FormData.
        Parse it into a Python list before validation.
        """
        # Convert to a standard dictionary to avoid QueryDict list-assignment quirks
        mutable_data = {}
        for key in data.keys():
            # .get() on a QueryDict returns the last value, which is usually correct
            # for single-valued fields and files in this context.
            mutable_data[key] = data.get(key)

        raw_sections = mutable_data.get('sections')
        if isinstance(raw_sections, str):
            try:
                mutable_data['sections'] = json.loads(raw_sections)
            except (json.JSONDecodeError, TypeError):
                raise serializers.ValidationError({'sections': 'Invalid JSON format.'})

        return super().to_internal_value(mutable_data)

    def validate_sections(self, value):
        """Ensure sections is a list of dicts with heading and description."""
        if not isinstance(value, list):
            raise serializers.ValidationError("Sections must be a list.")
        for i, section in enumerate(value):
            if not isinstance(section, dict):
                raise serializers.ValidationError(f"Section {i + 1} must be an object.")
            if not section.get('heading', '').strip():
                raise serializers.ValidationError(f"Section {i + 1} heading is required.")
            if not section.get('description', '').strip():
                raise serializers.ValidationError(f"Section {i + 1} description is required.")
        return value


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