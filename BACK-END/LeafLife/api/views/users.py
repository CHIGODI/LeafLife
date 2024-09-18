#!/usr/bin/env python3
""" This module contains users endpoints using Django Rest Framework CBV """
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from ..models import User
from ..serializers import UserSerializer
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
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]                           


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Update or delete a user
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'
    permission_classes = [IsAuthenticated]

    def get_object(self):
        """
        Ensures that a user can only update or
        delete their own account
        """
        return self.request.user




