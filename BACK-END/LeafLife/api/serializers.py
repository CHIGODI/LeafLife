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



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        # hide password from json response
        extra_kwargs = {'password': {'write_only': True}}


class GardenSerializer(serializers.ModelSerializer):
    """
    Serialize garden class to json
    """
    class Meta:
        model = Garden
        fields = ['id', 'created_at', 'updated_at', 'name',
                'long', 'lat', 'description']

        
class GardenListSerializer(serializers.ModelSerializer):
    """
    Serialize garden class to json
    """
    class Meta:
        model = Garden
        fields = ['id', 'name']


class BedSerializer(serializers.ModelSerializer):
    """
    Serialize bed class to json
    """
    class Meta:
        model = Bed
        fields = ['id', 'created_at', 'updated_at', 'garden_id',
                  'bed_number', 'bed_type', 'soil_type']


class CropRotationSerializer(serializers.ModelSerializer):
    """
    Serialize crop rotation class to json
    """
    class Meta:
        model = CropRotation
        fields = ['id', 'created_at', 'updated_at', 'garden',
                  'previous_crop', 'next_crop']


class CropSerializer(serializers.ModelSerializer):
    """Serialize crop class to json"""
    class Meta:
        model = Crop
        fields = ['id', 'created_at', 'updated_at', 'name',
                  'variety', 'planting_date', 'bed_id']


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