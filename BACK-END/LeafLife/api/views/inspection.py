#!/usr/bin/env python3
"""
This module contains inspections endpoints using Django Rest Framework CBV
"""

from rest_framework import generics
from ..models import Inspection
from ..serializers import InspectionSerializer


class InspectionListCreate(generics.ListCreateAPIView):
    """
    Create a new inspection or list all inspections
    """
    queryset = Inspection.objects.all()
    serializer_class = InspectionSerializer


class InspectionDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Update or delete an inspection
    """
    queryset = Inspection.objects.all()
    serializer_class = InspectionSerializer
    lookup_field = 'id'
