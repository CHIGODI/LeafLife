#!/usr/bin/env python3
"""
This module contains activities endpoints using Django Rest Framework CBV
"""
from rest_framework import generics
from ..models import Activity
from ..serializers import ActivitySerializer

class ActivityListCreate(generics.ListCreateAPIView):
    """
    Create a new activity or list all activities
    """
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
