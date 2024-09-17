from rest_framework.response import Response
from rest_framework import status

def logout_view(request):
    response = Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)
    
    # Delete the cookies by setting max_age to 0
    response.delete_cookie('access_token')
    response.delete_cookie('refresh_token')
    
    return response