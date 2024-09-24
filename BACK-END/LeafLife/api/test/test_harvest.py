from django.test import TestCase
from django.contrib.auth import get_user_model
from ..models import Harvest, Garden, Crop, Bed  # Import necessary models

class HarvestModelTest(TestCase):

    def setUp(self):
        # Set up test data
        User = get_user_model()
        self.user = User.objects.create_user(username='testuser', password='testpassword', email='test@email.com')
        self.garden = Garden.objects.create(name='My Garden', user=self.user)
        
        # Create a Bed instance
        self.bed = Bed.objects.create(
            bed_number='1',
            garden=self.garden,
            bed_type='raised',  # or any valid bed type from your choices
            length=2.0,
            width=1.0
        )
        
        # Create a Crop instance
        self.crop = Crop.objects.create(name='Tomato', bed=self.bed)

    def test_create_harvest(self):
        """Test creating a Harvest instance."""
        harvest = Harvest.objects.create(bed=self.bed, crop=self.crop, quantity_harvested=10, notes='First harvest')
        
        self.assertIsInstance(harvest, Harvest)
        self.assertEqual(harvest.bed, self.bed)
        self.assertEqual(harvest.crop, self.crop)
        self.assertEqual(harvest.quantity_harvested, 10)
        self.assertEqual(harvest.notes, 'First harvest')

    def test_harvest_updates_crop(self):
        """Test that creating a Harvest instance updates the related Crop."""
        harvest = Harvest.objects.create(bed=self.bed, crop=self.crop, quantity_harvested=10)
        
        # Check that the crop's status is updated
        self.crop.refresh_from_db()  # Refresh the crop instance from the database
        self.assertEqual(self.crop.status, 'H')
        # Check that the harvest date is set (you need to ensure the harvest model has a date field)
        self.assertEqual(self.crop.harvest_date, harvest.date)  # Adjust according to your model's attributes

    def test_string_representation(self):
        """Test the string representation of Harvest."""
        harvest = Harvest.objects.create(bed=self.bed, crop=self.crop, quantity_harvested=10)
        expected_string = f'Harvest:{harvest.id}'
        self.assertEqual(str(harvest), expected_string)
