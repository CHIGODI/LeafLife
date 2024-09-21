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
        # get the id of the user making the request
        query_user = self.kwargs.get('user_id')
        if auth_user.id != query_user:
            raise PermissionDenied("Not authorized")
        # retrieve gardens belonging to the authenticated user
        queryset = Garden.objects.filter(user=auth_user)
        # return an empty list if there is no garden
        return queryset

class GardenCreate(generics.CreateAPIView):
    """ Create a new garden """
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
            # get user id from the request
            queried_user = self.kwargs.get('user_id')
            # check if the user id in the request matches the authenticated user
            if queried_user != self.request.user.id:
                raise PermissionDenied("You do not have permission to access this garden.")
            
            # get gardens belonging to the authenticated user
            garden = Garden.objects.get(id=self.kwargs['garden_id'])
            return garden
        except Garden.DoesNotExist:
            raise NotFound("Garden does not exist")
