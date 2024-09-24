from django.test import TestCase
from ..models import Crop, Bed, Garden, User  # Ensure you import all necessary models

class CropModelTest(TestCase):
    def setUp(self):
        """Set up a user, a garden, and a bed instance for testing"""
        self.user = User.objects.create(username='testuser', password='password')  # Create a user
        self.garden = Garden.objects.create(name='Garden 1', lat='12.34', long='56.78', description='Test Garden', user=self.user)  # Create a garden
        self.bed = Bed.objects.create(bed_number='1', garden=self.garden, length=2.0, width=1.5)  # Create a bed instance with dimensions

    def test_create_crop(self):
        """Test the creation of a crop"""
        crop = Crop.objects.create(name='Tomato', variety='Roma', bed=self.bed)
        self.assertEqual(crop.name, 'Tomato')
        self.assertEqual(crop.variety, 'Roma')
        self.assertEqual(crop.bed, self.bed)

    def test_crop_max_length(self):
        """Test the max_length of the crop name and variety"""
        crop = Crop(name='A' * 100, variety='B' * 100, bed=self.bed)
        crop.save()  # Save the crop to validate max_length
        self.assertEqual(len(crop.name), 100)
        self.assertEqual(len(crop.variety), 100)

    def test_crop_relationship(self):
        """Test the relationship between Crop and Bed"""
        crop = Crop.objects.create(name='Lettuce', variety='Butterhead', bed=self.bed)
        self.assertEqual(crop.bed, self.bed)

    def test_crop_status_choices(self):
        """Test crop status choices"""
        crop = Crop.objects.create(name='Corn', variety='Sweet', bed=self.bed)
        self.assertEqual(crop.status, 'G')  # Default status

    def test_string_representation(self):
        """Test the string representation of the crop"""
        crop = Crop.objects.create(name='Pepper', variety='Bell', bed=self.bed)
        self.assertEqual(str(crop), f"Crop:{crop.id}-{crop.name}")
