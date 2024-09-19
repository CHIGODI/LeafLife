#!/usr/bin/env python3
"""This model contains beds endpoints using Django Rest Framework CBV"""

from django.core.exceptions import PermissionDenied
from rest_framework.exceptions import NotFound
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from ..models import Bed, Garden
from ..serializers import BedSerializer
from ..permissions import IsBedOwner

class BedListCreate(generics.ListCreateAPIView):
    """
    Create a new bed or list all beds
    """
    serializer_class = BedSerializer
    permission_classes = [IsAuthenticated, IsBedOwner]

    def get_queryset(self):
        """ Filter beds belonging to the authenticated user """
        auth_user = self.request.user
        query_user = self.kwargs.get('user_id')
        if auth_user.id != query_user:
            raise PermissionDenied("Not authorized")
        query_set = (Bed.objects.filter(garden__user=auth_user,
                                        garden_id=self.kwargs.get('garden_id'))) 
        # returns empty an list if there is no bed
        return query_set
    
    def perform_create(self, serializer):
        """Set the authenticated user as the owner of the bed"""
        # retrieve the garden name from the url
        query_user = self.kwargs.get('user_id')
        if self.request.user.id != query_user:
            raise PermissionDenied("You don't have permission to create a bed in this garden")
        
        garden_id = self.kwargs.get('garden_id')
    
        # retrieve the garden object
        garden = generics.get_object_or_404(Garden, id=garden_id, user=self.request.user)
        # save the bed with the garden object
        serializer.save(garden=garden)


class BedDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Update or delete a bed
    """
    serializer_class = BedSerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'bed_id'
    permission_classes = [IsAuthenticated]
    

    def get_queryset(self):
        """Return the beds for the logged-in user"""
        # Filter beds based on the garden and the logged-in user
        garden_id = self.kwargs.get('garden_id')
        query_user = self.kwargs.get('user_id')
        auth_user = self.request.user
        if auth_user.id != query_user:
            raise PermissionDenied("Not authorized")
        return Bed.objects.filter(garden__id=garden_id, 
                                  garden__user__id=auth_user.id)
    
    
    def get_object(self):
        """Retrieve and return a bed for the logged-in user"""
        try:
            bed = super().get_object()
            print("bed.garden.user", bed.garden.user)
            print("self.request.user", self.request.user)
            if bed.garden.user != self.request.user:
                raise PermissionDenied("You do not have permission to access this bed.")
            return bed
        except Bed.DoesNotExist:
            raise NotFound("Bed does not exist")

