from django.test import TestCase
from django.contrib.auth import get_user_model
from ..models import CropRotation, Garden, Crop, Bed  # Ensure Bed is imported

class CropRotationModelTest(TestCase):

    def setUp(self):
        # Set up test data
        User = get_user_model()
        self.user = User.objects.create_user(username='testuser', password='testpassword', email='test@email.com')
        self.garden = Garden.objects.create(name='My Garden', user=self.user)
        
        # Create a Bed instance
        self.bed = Bed.objects.create(
            bed_number='1',
            garden=self.garden,
            bed_type='raised',  # Example value
            length=2.0,
            width=1.0
        )
        
        # Create Crop instances without the garden parameter
        self.previous_crop = Crop.objects.create(name='Tomato', bed=self.bed)
        self.current_crop = Crop.objects.create(name='Lettuce', bed=self.bed)

    def test_create_crop_rotation(self):
        """Test creating a CropRotation instance."""
        crop_rotation = CropRotation.objects.create(
            garden=self.garden,
            previous_crop=self.previous_crop,
            current_crop=self.current_crop
        )
        self.assertIsInstance(crop_rotation, CropRotation)
        self.assertEqual(crop_rotation.garden, self.garden)
        self.assertEqual(crop_rotation.previous_crop, self.previous_crop)
        self.assertEqual(crop_rotation.current_crop, self.current_crop)

    def test_string_representation(self):
        """Test the string representation of CropRotation."""
        crop_rotation = CropRotation.objects.create(
            garden=self.garden,
            previous_crop=self.previous_crop,
            current_crop=self.current_crop
        )
        expected_string = 'Tomato to Lettuce in My Garden'
        self.assertEqual(str(crop_rotation), expected_string)

    def test_crop_rotation_unique_together(self):
        previous_crop = Crop.objects.create(name='Previous Crop', bed=self.bed)  # Added bed
        current_crop = Crop.objects.create(name='Current Crop', bed=self.bed)  # Added bed

        # Create the first CropRotation instance
        CropRotation.objects.create(previous_crop=previous_crop, current_crop=current_crop, garden=self.garden)

        with self.assertRaises(Exception):
            # Attempt to create a second instance that violates the unique constraint
            CropRotation.objects.create(previous_crop=previous_crop, current_crop=current_crop, garden=self.garden)

    def test_invalid_crop_rotation_creation(self):
        # Attempt to create CropRotation without required crops
        with self.assertRaises(Exception):
            CropRotation.objects.create(garden=self.garden)  # Missing previous and current crops

    def test_multiple_crop_rotations(self):
        """Test that multiple CropRotation instances can be created for different crops."""
        crop_rotation1 = CropRotation.objects.create(
            garden=self.garden,
            previous_crop=self.previous_crop,
            current_crop=self.current_crop
        )
        crop_rotation2 = CropRotation.objects.create(
            garden=self.garden,
            previous_crop=self.previous_crop,
            current_crop=Crop.objects.create(name='Carrot', bed=self.bed)  # New crop instance with Bed
        )
        self.assertNotEqual(crop_rotation1.id, crop_rotation2.id)
