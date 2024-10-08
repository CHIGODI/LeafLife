from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import Bed, Crop, Garden
from rest_framework.permissions import AllowAny

class GardenBedCropStatsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        """Return the number of gardens, beds, and crops for the authenticated user"""
        
        # Count the number of gardens for the user
        garden_count = Garden.objects.all().count()

        # Count the number of beds across all gardens
        bed_count = Bed.objects.all().count()

        # Count the number of crops across all beds
        crop_count = Crop.objects.all().count()

        # Prepare the response data
        data = {
            "gardens": garden_count,
            "beds": bed_count,
            "crops": crop_count
        }

        # Return the response as JSON
        return Response(data)
