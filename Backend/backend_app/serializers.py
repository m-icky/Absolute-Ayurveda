from rest_framework import serializers
from .models import Specialist

class SpecialistSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = Specialist
        fields = '__all__'