#!/usr/bin/env python3
"""This module contains gardens endpoints using Django Rest Framework CBV"""

from django.core.exceptions import PermissionDenied
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from ..models import User, Garden
from ..serializers import GardenSerializer
from django.shortcuts import get_object_or_404, Http404


class GardenListCreate(generics.ListCreateAPIView):
    """
    Create a new garden or list all gardens
    """
    serializer_class = GardenSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """ Filter gardens that belong to the authenticated user """
        user = self.request.user
        queryset = Garden.objects.filter(user=user)
        if not queryset.exists():
            raise Http404( "You have no gardens yet")

        return queryset
    
    def perform_create(self, serializer):
        """Set the authenticated user as the onwer of the garden"""
        
        serializer.save(user=self.request.user)



class GardenDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Update or delete a garden
    """
    queryset = Garden.objects.all()
    serializer_class = GardenSerializer
    lookup_field = 'name'
    lookup_url_kwarg = 'garden_name'
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Only show the gardens of the logged in user.
        """
        # Return only the gardens that belong to the authenticated user
        return Garden.objects.filter(user=self.request.user)
    
    def get_object(self):
        """Retrieve and return a garden for the logged-in user"""
        try:
            # Use DRF's default object retrieval
            garden = super().get_object()
            # Check if the garden belongs to the authenticated user
            if garden.user != self.request.user:
                raise PermissionDenied("You don't have permission to access this garden.")
            return garden
        except Garden.DoesNotExist:
            raise Http404("Garden not found.")
