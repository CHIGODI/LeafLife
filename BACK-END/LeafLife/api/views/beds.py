#!/usr/bin/env python3
"""This model contains beds endpoints using Django Rest Framework CBV"""

from rest_framework import generics
from ..models import Bed
from ..serializers import BedSerializer


class BedListCreate(generics.ListCreateAPIView):
    """
    Create a new bed or list all beds
    """
    # queryset = Bed.objects.all()
    serializer_class = BedSerializer

    def get_queryset(self):
        """ Filter beds in a garden """
        garden_id = self.kwargs['garden_id']
        return Bed.objects.filter(garden_id=garden_id)


class BedDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Update or delete a bed
    """
    queryset = Bed.objects.all()
    serializer_class = BedSerializer
    lookup_field = 'id'
