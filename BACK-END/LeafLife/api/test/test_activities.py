# tests/test_activity_model.py

from django.test import TestCase
from ..models.activities import Activity
from ..models.users import User  # Make sure to import the User model
from ..models.gardens import Garden  # Import the Garden model
from ..models.beds import Bed  # Import the Bed model
from django.utils import timezone
from django.core.exceptions import ValidationError

class ActivityModelTests(TestCase):
    def setUp(self):
        # Create test instances for User, Garden, and Bed
        self.user = User.objects.create(username='testuser')
        self.garden = Garden.objects.create(name='Test Garden', user=self.user)
        self.bed = Bed.objects.create(bed_number='B001', garden=self.garden, bed_type='raised', length=3.00, width=2.00)

    def test_activity_creation(self):
        # Create an activity instance
        activity = Activity.objects.create(
            user=self.user,
            garden=self.garden,
            bed=self.bed,
            activity_type='watering',
            date=timezone.now().date(),
            notes='Watering the plants'
        )
        self.assertEqual(activity.user, self.user)
        self.assertEqual(activity.garden, self.garden)
        self.assertEqual(activity.bed, self.bed)
        self.assertEqual(activity.activity_type, 'watering')
        self.assertIsNotNone(activity.date)
        self.assertEqual(activity.notes, 'Watering the plants')

    def test_default_activity_type(self):
        # Create an activity without specifying the activity_type
        activity = Activity.objects.create(
            user=self.user,
            garden=self.garden,
            date=timezone.now().date(),
            notes='General inspection'
        )
        self.assertEqual(activity.activity_type, 'inspection')

    def test_invalid_activity_type(self):
        # Attempt to create an activity with an invalid activity type
        with self.assertRaises(ValidationError):
            Activity.objects.create(bed=self.bed, activity_type='invalid_type')

    def test_string_representation(self):
        # Test the string representation of the activity
        activity = Activity.objects.create(
            user=self.user,
            garden=self.garden,
            bed=self.bed,
            activity_type='pruning',
            date=timezone.now().date(),
            notes='Pruning the plants'
        )
        self.assertEqual(str(activity), f"Activity:{activity.id}")

    def tearDown(self):
        # Clean up test data
        self.user.delete()
        self.garden.delete()
        self.bed.delete()
