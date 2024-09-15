#!/usr/bin/env python3
"""This module contains gardens endpoints using Django Rest Framework CBV"""

from rest_framework import generics
from ..models import User, Garden
from ..serializers import GardenSerializer
from django.shortcuts import get_object_or_404


class GardenListCreate(generics.ListCreateAPIView):
    """
    Create a new garden or list all gardens
    """
    serializer_class = GardenSerializer

    def get_queryset(self):
        """ Filter gardens by user """
        user_id = self.kwargs['user_id']
        return Garden.objects.filter(user_id=user_id)
    
    def perform_create(self, serializer):
        # Extract user_id from URL kwargs
        user_id = self.kwargs.get('user_id')

        # Retrieve User instance or raise 404 if user not found
        user = get_object_or_404(User, id=user_id)
        
        # Set the user instance for the garden
        serializer.save(user=user)



class GardenDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Update or delete a garden
    """
    queryset = Garden.objects.all()
    serializer_class = GardenSerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'garden_id'
