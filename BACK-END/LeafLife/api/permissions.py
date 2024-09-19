"""
Handles permissions for the API views by extending the
BasePermission class from Django Rest Framework
"""
from rest_framework.permissions import BasePermission

class IsGardenOwner(BasePermission):
    """ Checks garden ownership."""

    def __init__(self):
        super().__init__()
        print("IsBedOwner permission class initialized")

    def has_object_permission(self, request, view, obj):
        """ Check if the authenticated user is the owner of the garden"""
        return obj.user == request.user

class IsBedOwner(BasePermission):
    """ Checks bed ownership."""
    def has_object_permission(self, request, view, obj):
        """ Determines if the authenticated user is the owner of the bed."""
        return obj.garden.user == request.user

class IsCropOwner(BasePermission):
    """ Checks crop ownership."""
    def has_object_permission(self, request, view, obj):
        """Determines if the authenticated user is the owner of the crop."""
        return obj.bed.garden.user == request.user