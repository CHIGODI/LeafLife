#!/usr/bin/env python3
"""This module contains crops endpoints using Django Rest Framework CBV"""

from django.shortcuts import get_object_or_404, Http404
from django.core.exceptions import PermissionDenied
from rest_framework.exceptions import NotFound
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from ..models import Crop, Bed
from ..serializers import CropSerializer
from ..permissions import IsCropOwner


class CropList(generics.ListAPIView):
    """
    Create a new crop or list all crops
    """
    serializer_class = CropSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """ Filter crops belonging to the authenticated user """
        auth_user = self.request.user
        query_user = self.kwargs.get('user_id')
        if auth_user.id != query_user:
            raise PermissionDenied("Not authorized")
        return Crop.objects.filter(bed__garden__user=self.request.user)

class CropCreate(generics.CreateAPIView):
    """
    Create a new crop or list all crops
    """
    serializer_class = CropSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """Set the authenticated user as the owner of the crop"""
        query_user = self.kwargs.get('user_id')
        if self.request.user.id != query_user:
            raise PermissionDenied("You don't have permission to add crop to this bed")
        # retrieve the bed id from the url
        bed_id = self.kwargs.get('bed_id')
        # retrieve the bed object
        bed = get_object_or_404(Bed, id=bed_id, garden__user=self.request.user)
        # save the crop with the bed object
        serializer.save(bed=bed)


class CropDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Update or delete a crop
    """
    serializer_class = CropSerializer
    permission_classes = [IsAuthenticated, IsCropOwner]
    lookup_field = 'id'
    lookup_url_kwarg = 'crop_id'

    def get_object(self):
        """Retrieve and return a crop for the logged-in user"""
        try:
            crop = super().get_object()
            if crop.bed.garden.user != self.request.user:
                raise PermissionDenied("You do not have permission to access this crop.")
            return crop
        except Crop.DoesNotExist:
            raise NotFound("Crop does not exist")
