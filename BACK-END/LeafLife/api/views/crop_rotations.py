#!/usr/bin/env python3
"""This module contains crop rotations endpoints using Django Rest Framework CBV"""

from rest_framework import generics
from ..models import CropRotation
from ..serializers import CropRotationSerializer


class CropRotationListCreate(generics.ListCreateAPIView):
    """
    Create a new crop rotation or list all crop rotations
    """
    queryset = CropRotation.objects.all()
    serializer_class = CropRotationSerializer

class CropRotationDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Update or delete a crop rotation
    """
    queryset = CropRotation.objects.all()
    serializer_class = CropRotationSerializer
    lookup_field = 'id'
