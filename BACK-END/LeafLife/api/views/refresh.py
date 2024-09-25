from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.response import Response
from .login import set_cookie

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh_token') or request.data.get('refresh')
        print("Refresh Token [Refresh]:", refresh_token)
        if not refresh_token:
            return Response({'error': 'Refresh token not found in cookies'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            refresh = RefreshToken(refresh_token)
            new_access_token = str(refresh.access_token)

            response = Response({'message': 'Token refreshed'}, status=status.HTTP_200_OK)
            print("Access Token:", new_access_token)
            
            # Set the new access token in an HttpOnly cookie
            set_cookie(response, 'access_token', new_access_token, max_age=300)

            return response
        except Exception as e:
            return Response({'error': 'Token refresh failed'}, status=status.HTTP_400_BAD_REQUEST)
