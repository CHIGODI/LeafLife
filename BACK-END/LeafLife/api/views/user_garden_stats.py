from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import Bed, Crop, User
from rest_framework.permissions import IsAuthenticated
from ..serializers import UserSerializer

class GardenStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """Return the number of gardens, beds, and crops for the authenticated user"""
        user = request.user

        #full drill down of user, garden, bed, crop
        full_tree = User.objects.get(id=user.id)
        serialized_data = UserSerializer(full_tree).data
        
        # Count the number of gardens for the user
        garden_count = user.gardens.count()

        # Count the number of beds across all gardens
        bed_count = Bed.objects.filter(garden__user=user).count()

        # Count the number of crops across all beds
        crop_count = Crop.objects.filter(bed__garden__user=user).count()

        # Prepare the response data
        data = {
            "full_tree": serialized_data,
            "gardens": garden_count,
            "beds": bed_count,
            "crops": crop_count
        }

        # Return the response as JSON
        return Response(data)
