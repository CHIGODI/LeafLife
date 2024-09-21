#!/usr/bin/env python3
""" This module contains users endpoints using Django Rest Framework CBV """
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied, NotFound
from ..models import User
from ..serializers import UserSerializer, UserCustomSerializer
from django.contrib.auth.hashers import make_password


class UserCreate(generics.CreateAPIView):
    """
    POST method to create new user
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        """Hash the password before saving the user"""
        password = serializer.validated_data.get('password')
        if password:
            serializer.validated_data['password'] = make_password(password)
        serializer.save()
  

class UserList(generics.ListAPIView):
    """
    GET mehod to list all users
    """
    queryset = User.objects.all()
    serializer_class = UserCustomSerializer
    permission_classes = [IsAuthenticated]                           


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Update or delete a user
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'id'
    permission_classes = [IsAuthenticated]

    def get_object(self):
        """Override to ensure that users can only access their own data."""
        try:
            queried_user = super().get_object()
            # Check if the authenticated user is trying to access their own data
            print(self.request.user)
            if queried_user != self.request.user:
                raise PermissionDenied("You are not authorized to access this user's details.")
            return queried_user
        except User.DoesNotExist:
            raise NotFound("User does not exist")
      