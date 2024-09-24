from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from ..models import User

class LogoutView(APIView):
    """Logout class"""
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """Method to handle user logout"""
        try:
            # Extract the current refresh token from cookies or request body
            refresh_token = request.data.get('refresh_token') or request.COOKIES.get('refresh_token')
            if refresh_token:
                # create a refresh token instance
                token = RefreshToken(refresh_token)
                # Blacklist the object
                token.blacklist()
            
            # Create a response instance
            response = Response(
                {'message': 'Successfully logged out'},
                status=status.HTTP_200_OK
            )

            # Delete the token cookies
            response.delete_cookie('access_token')
            response.delete_cookie('refresh_token')

            return response
        except Exception as e:
            return Response(
                {'error': 'Failed to log out'},
                status=status.HTTP_400_BAD_REQUEST
                )
