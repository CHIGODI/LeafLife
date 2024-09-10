#!/usr/bin/env python3
"""This module contains crops endpoints using Django Rest Framework CBV"""

from rest_framework import generics
from ..models import Crop
from ..serializers import CropSerializer


class CropListCreate(generics.ListCreateAPIView):
    """
    Create a new crop or list all crops
    """
    queryset = Crop.objects.all()
    serializer_class = CropSerializer


class CropDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Update or delete a crop
    """
    queryset = Crop.objects.all()
    serializer_class = CropSerializer
    lookup_field = 'id'
