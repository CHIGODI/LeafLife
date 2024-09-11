#!/usr/bin/env python3
"""This module contains harvest endpoints using Django Rest Framework CBV"""


from rest_framework import generics
from ..models import Harvest
from ..serializers import HarvestSerializer


class HarvestListCreate(generics.ListCreateAPIView):
    """
    Create a new harvest or list all harvests
    """
    queryset = Harvest.objects.all()
    serializer_class = HarvestSerializer


class HarvestDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Update or delete a harvest
    """
    queryset = Harvest.objects.all()
    serializer_class = HarvestSerializer
    lookup_field = 'id'
