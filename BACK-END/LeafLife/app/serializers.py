from rest_framework import serializers
from .models import User  # Assuming you have a User model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password'] 