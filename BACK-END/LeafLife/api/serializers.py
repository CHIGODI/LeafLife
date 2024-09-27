#!/usr/bin/env python3
"""
This module contains classes that serilize all models
to json objects, to be served by the API
"""

from rest_framework import serializers
from .models import User
from .models import Garden
from .models import Bed
from .models import CropRotation
from .models import Crop
from .models import Harvest
from .models import Inspection
from .models import Activity
from django.contrib.auth.hashers import make_password


class CropSerializer(serializers.ModelSerializer):
    """Serialize crop class to json"""
    class Meta:
        model = Crop
        fields = ['id', 'created_at', 'updated_at', 'name',
                  'variety', 'planting_date', 'bed_id', 'harvest_date']

class BedSerializer(serializers.ModelSerializer):
    """
    Serialize bed class to json
    """
    crops = CropSerializer(many=True, required=False)
    class Meta:
        model = Bed
        fields = ['id', 'created_at', 'updated_at', 'garden_id',
                  'bed_number', 'bed_type', 'soil_type', 'crops']

class GardenSerializer(serializers.ModelSerializer):
    """
    Serialize garden class to json
    """
    beds = BedSerializer(many=True, required=False)
    class Meta:
        model = Garden
        fields = ['id', 'created_at', 'updated_at', 'name',
                'long', 'lat', 'description', 'beds']

    def validate_name(self, value):
        """Check that the garden name is unique."""
        if Garden.objects.filter(name=value).exists():
            raise serializers.ValidationError("A garden with this name already exists. Please choose a different name.")
        return value


class GardenListSerializer(serializers.ModelSerializer):
    """
    Serialize garden class to json
    """
    class Meta:
        model = Garden
        fields = ['id', 'name']


class UserSerializer(serializers.ModelSerializer):
    """ Serialize user class to json"""
    gardens = GardenSerializer(many=True, required=False)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'gardens']
        # hide password from json response
        extra_kwargs = {'password': {'write_only': True}}

class UserCustomSerializer(serializers.ModelSerializer):
    """ Serialize user class to json"""
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'created_at', 'updated_at',
                  'last_login', 'bio']
        # hide password from json response
        extra_kwargs = {'password': {'write_only': True}}

class CropRotationSerializer(serializers.ModelSerializer):
    """
    Serialize crop rotation class to json
    """
    class Meta:
        model = CropRotation
        fields = ['id', 'created_at', 'updated_at', 'garden',
                  'previous_crop', 'next_crop']

class HarvestSerializer(serializers.ModelSerializer):
    """Serialize harvest class to json"""
    class Meta:
        model = Harvest
        fields = ['id', 'created_at', 'updated_at', 'bed_id',
                  'crop_id', 'quantity_harvested', 'notes']


class InspectionSerializer(serializers.ModelSerializer):
    """Serialize inspection class to json"""
    class Meta:
        model = Inspection
        fields = ['id', 'created_at', 'updated_at', 'user_id',
                  'bed_id', 'crop_id', 'inspection_date', 'notes']


class ActivitySerializer(serializers.ModelSerializer):
    """Serializes activities class to json"""
    class Meta:
        model = Activity
        fields = ['id', 'created_at', 'updated_at', 'user_id',
                  'garden_id', 'bed_id', 'date', 'activity_type', 'notes']