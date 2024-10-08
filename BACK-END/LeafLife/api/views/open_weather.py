import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.conf import settings

# Replace with your actual OpenWeather API key
API_KEY = 'ef1c821dfd4723c7c4d807fd246672f4'

class WeatherAPIView(APIView):
    permission_classes = [IsAuthenticated]

    
    def get(self, request):
        lat = request.query_params.get('lat')
        lon = request.query_params.get('lon')

        if not lat or not lon:
            return Response(
                {"error": "Missing latitude or longitude"}, 
                status=status.HTTP_400_BAD_REQUEST
                )

        url = f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric'
        
        try:
            response = requests.get(url)
            response.raise_for_status()
            return Response(
                response.json(),
                status=status.HTTP_200_OK
                )
        except requests.exceptions.RequestException:
            return Response(
                {"error": "Failed to fetch weather data"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
