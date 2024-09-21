from rest_framework import generics
from rest_framework.permissions import AllowAny
from ..models import Garden
from ..serializers import GardenListSerializer
from rest_framework.response import Response


class AllGardens(generics.ListAPIView):
    """
    View to list all gardens in the database.
    """
    fields = ['id', 'name']
    serializer_class = GardenListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        """
        Returns a queryset of unique garden names in lowercase.
        """
        # return count of gardenns
        queryset = Garden.objects.all()
        return queryset
    
    def list(self, request, *args, **kwargs):
        '''Lists the queryset and returns a custom response'''
        # Get the queryset
        queryset = self.get_queryset()
        
        # Serialize the queryset
        serializer = self.get_serializer(queryset, many=True)
        
        # Create a custom response with count and garden data
        return Response({
            "Gardens Count": queryset.count(),
            "Gardens": serializer.data
        })