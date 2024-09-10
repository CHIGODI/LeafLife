#!/usr/bin/env python3
"""This module contains gardens endpoints using Django Rest Framework CBV"""

from rest_framework import generics
from ..models import Garden
from ..serializers import GardenSerializer


class GardenListCreate(generics.ListCreateAPIView):
    """
    Create a new garden or list all gardens
    """
    queryset = Garden.objects.all()
    serializer_class = GardenSerializer


class GardenDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Update or delete a garden
    """
    queryset = Garden.objects.all()
    serializer_class = GardenSerializer
    lookup_field = 'id'
