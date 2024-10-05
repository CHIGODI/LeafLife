from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied, NotFound
from ..models import Garden
from ..serializers import GardenSerializer
from ..permissions import IsGardenOwner


class GardenList(generics.ListAPIView):
    """
    Create a new garden or list all gardens
    """
    serializer_class = GardenSerializer
    permission_classes = [IsAuthenticated, IsGardenOwner]


    def get_queryset(self):
        """ Filter gardens that belong to the authenticated user """
        auth_user = self.request.user
        queryset = Garden.objects.filter(user=auth_user).order_by('name')
        # return an empty list if there is no garden
        return queryset

class GardenCreate(generics.CreateAPIView):
    serializer_class = GardenSerializer
    permission_classes = [IsAuthenticated, IsGardenOwner]

    def perform_create(self, serializer):
        """Save the post data when creating a new garden"""
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
            garden_id = self.kwargs['garden_id']
            # get gardens belonging to the authenticated user
            garden = Garden.objects.get(id=garden_id, user=self.request.user)
            return garden
        except Garden.DoesNotExist:
            raise NotFound("Garden does not exist")
