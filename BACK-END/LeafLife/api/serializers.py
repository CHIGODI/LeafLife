#!/usr/bin/env python3
""" This module contains classes that serilize all models"""

from rest_framework import serializers
from .models import User
from .models import Garden
from .models import Bed
from .models import CropRotation
from .models import Crop
from .models import Harvest
from .models import Inspection


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']


class GardenSerializer(serializers.ModelSerializer):
    """
    Serialize garden class to json
    """
    class Meta:
        model = Garden
        fields = ['id', 'created_at', 'updated_at', 'name',
                'longitude', 'latitude', 'description', 'user_id']


class BedSerializer(serializers.ModelSerializer):
    """
    Serialize bed class to json
    """
    class Meta:
        model = Bed
        fields = ['id', 'created_at', 'updated_at', 'name',
                  'garden_id']


class CropRotation(serializers.ModelSerializers):
    """
    Serialize crop rotation class to json
    """
    class Meta:
        model = CropRotation
        fields = ['id', 'created_at', 'updated_at', 'garden',
                  'previous_crop', 'next_crop']


class Crop(serializers.ModelSerializers):
    """Serialize crop class to json"""
    class Meta:
        model = Crop
        fields = ['id', 'created_at', 'updated_at', 'name',
                  'variety', 'planting_date', 'bed_id']


class Harvest(serializers.ModelSerializers):
    """Serialize harvest class to json"""
    class Meta:
        model = Harvest
        fields = ['id', 'created_at', 'updated_at', 'bed_id',
                  'crop_id', 'quantity_harvested', 'notes']


class Inspection(serializers.ModelSerializers):
    """Serialize inspection class to json"""
    class Meta:
        model = Inspection
        fields = ['id', 'created_at', 'updated_at', 'user_id',
                  'bed_id', 'crop_id', 'inspection_date', 'notes']