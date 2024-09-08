#!/usr/bin/env python3
""" This module contains users endpoints using Django Rest Framework CBV """
from rest_framework import generics
from ..models import User
from ..serializers import UserSerializer


class UserListCreate(generics.ListCreateAPIView):
    """
    Create a new user or list all users
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Update or delete a user
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'
