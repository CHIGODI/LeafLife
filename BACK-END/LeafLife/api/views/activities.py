#!/usr/bin/env python3
"""
This module contains activities endpoints using Django Rest Framework CBV
"""
from rest_framework import generics
from ..models import Activity
from ..serializers import ActivitySerializer
from rest_framework.permissions import IsAuthenticated

class ActivityList(generics.ListAPIView):
    """
    List all activities
    """
    permission_classes = [IsAuthenticated]
    serializer_class = ActivitySerializer
    
    def get_queryset(self):
        """ Filter beds belonging to the authenticated user """
        auth_user = self.request.user
        query_set = Activity.objects.filter(user=auth_user) 
        # returns empty an list if there is no activity
        return query_set

class ActivityCreate(generics.CreateAPIView):
    """
    Create a new activity or list all activities
    """
    serializer_class = ActivitySerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """Save the post data when creating a new activity"""
        serializer.save(user=self.request.user)

class ActivityDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Update or delete an activity
    """
    serializer_class = ActivitySerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'activity_id'
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Retrieve and return an activity for the logged-in user"""
        auth_user = self.request.user
        query_set = Activity.objects.filter(user=auth_user, id=self.kwargs.get('activity_id'))
        return query_set
