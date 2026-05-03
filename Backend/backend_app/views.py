from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Specialist
from .serializers import SpecialistSerializer


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

        print(serializer.errors)  # 👈 debug
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