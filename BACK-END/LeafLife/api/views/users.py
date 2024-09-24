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
    serializer_class = UserCustomSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        """Get the user object"""
        queryset = User.objects.all()
        obj = get_object_or_404(queryset, pk=self.request.user.id)
        return obj
      