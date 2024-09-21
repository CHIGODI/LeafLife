from rest_framework import generics
from rest_framework.permissions import AllowAny
from ..models import Crop
from ..serializers import CropSerializer
from django.db.models.functions import Lower

class AllCrops(generics.ListAPIView):
    """
    View to list all unique crop names and varieties in the database.
    """
    serializer_class = CropSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        """
        Returns a queryset of unique crop names and varieties in lowercase.
        """
        queryset = Crop.objects.values('name', 'variety') \
                        .annotate(
                            name_lower=Lower('name'),
                            variety_lower=Lower('variety')
                        ).distinct('name_lower', 'variety_lower')
        return queryset
    
