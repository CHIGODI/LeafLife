from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

from rest_framework import status
from django.contrib.auth import authenticate

def set_cookie(response, key, value, max_age, httponly=True, samesite='Lax'):
    """
    Utility function to set a cookie with HttpOnly and Secure flags
    """
    response.set_cookie(
        key=key,
        value=value,
        max_age=max_age,
        httponly=httponly,  # Cannot be accessed by JavaScript
        samesite=samesite  # Protect against CSRF attacks
    )
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # Authenticate user, generate tokens (using SimpleJWT or any token library)
        
        user = authenticate(request,
                            username=request.data['username'],
                            password=request.data['password'])
        
        if user is not None:
            # Generate tokens
            refresh = RefreshToken.for_user(user)
            # print("refresh token", refresh)
            response = Response({'user_id': user.id,
                                 'access': str(refresh.access_token),
                                 'refresh': str(refresh),
                                 'message': 'Login successful'},
                                status=status.HTTP_200_OK)
            # print("refresh.access_token", refresh.access_token)
            # Set the access and refresh tokens in HttpOnly cookies
            set_cookie(response, 'access_token',
                       str(refresh.access_token),
                       max_age=3600)  # Expires in 60 minutes
            set_cookie(response, 'refresh_token',
                       str(refresh),
                       max_age=60*60*24*7)  # Expires in 7 days

            return response
        else:
            return Response({'error': 'Invalid credentials'},
                            status=status.HTTP_401_UNAUTHORIZED)