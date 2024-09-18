"""Handles permissions for the API views."""
from rest_framework.permissions import BasePermission

class IsBedOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.garden.user == request.user

class IsCropOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.bed.garden.user == request.user
