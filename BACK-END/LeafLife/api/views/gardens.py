from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied, NotFound
from ..models import Garden
from ..serializers import GardenSerializer
from ..permissions import IsGardenOwner

class GardenListCreate(generics.ListCreateAPIView):
    """
    Create a new garden or list all gardens
    """
    serializer_class = GardenSerializer
    permission_classes = [IsAuthenticated, IsGardenOwner]

    def get_queryset(self):
        """ Filter gardens that belong to the authenticated user """
        user = self.request.user
        if not user.is_authenticated:
            raise PermissionDenied("You must be logged in to view your gardens.")
        # retrieve gardens belonging to the authenticated user
        queryset = Garden.objects.filter(user=user)
        if not queryset.exists():
            raise NotFound("You have no gardens yet")
        return queryset
        
    
    def perform_create(self, serializer):
        """ Set the authenticated user as the owner of the garden """
        serializer.save(user=self.request.user)


class GardenDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Update or delete a garden
    """
    queryset = Garden.objects.all()
    serializer_class = GardenSerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'garden_id'
    permission_classes = [IsAuthenticated, IsGardenOwner]

    def get_object(self):
        """Retrieve and return a garden for the logged-in user"""
        try:
            garden = super().get_object()
            print(garden.user)
            print(self.request.user)
            if garden.user != self.request.user:
                raise PermissionDenied("You do not have permission to access this garden.")
            return garden
        except Garden.DoesNotExist:
            raise NotFound("Garden does not exist")
     
