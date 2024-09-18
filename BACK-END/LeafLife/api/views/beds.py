#!/usr/bin/env python3
"""This model contains beds endpoints using Django Rest Framework CBV"""

from django.core.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404, Http404
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
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """ Filter beds belonging to the authenticated user """
        return Bed.objects.filter(garden__user=self.request.user)
    
    def perform_create(self, serializer):
        """Set the authenticated user as the owner of the bed"""
        # retrieve the garden name from the url
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
    permission_classes = [IsAuthenticated, IsBedOwner]

    def get_object(self):
        try:
            bed = super().get_object()
            if bed.garden.user != self.request.user:
                raise PermissionDenied("You do not have permission to access this bed.")
            return bed
        except Bed.DoesNotExist:
            raise Http404("Bed does not exist")
