from django.test import TestCase
from django.contrib.auth import get_user_model
from ..models import Inspection, Garden  # Import the Inspection and Garden models
from datetime import date  # Import date to create date instances

class InspectionModelTest(TestCase):

    def setUp(self):
        # Set up test data
        User = get_user_model()
        self.user = User.objects.create_user(
            username='testuser', 
            password='testpassword', 
            email='test@email.com'
        )
        self.garden = Garden.objects.create(name='My Garden', user=self.user)

    def test_create_inspection(self):
        """Test creating an Inspection instance."""
        inspection = Inspection.objects.create(
            user_id=self.user,
            garden_id=self.garden,
            inspection_date=date(2024, 9, 25),  # Use a date object here
            notes='Inspection notes'
        )
        self.assertIsInstance(inspection, Inspection)
        self.assertEqual(inspection.user_id, self.user)
        self.assertEqual(inspection.garden_id, self.garden)
        self.assertEqual(inspection.inspection_date, date(2024, 9, 25))  # Compare date objects
        self.assertEqual(inspection.notes, 'Inspection notes')

    def test_string_representation(self):
        """Test the string representation of Inspection."""
        inspection = Inspection.objects.create(
            user_id=self.user,
            garden_id=self.garden,
            inspection_date=date(2024, 9, 25),  # Use a date object here
            notes='Inspection notes'
        )
        expected_string = f'Inspection:{inspection.id}'
        self.assertEqual(str(inspection), expected_string)

    def test_inspection_date(self):
        """Test the inspection_date field is a valid date."""
        inspection = Inspection.objects.create(
            user_id=self.user,
            garden_id=self.garden,
            inspection_date=date(2024, 9, 25),  # Use a date object here
            notes='Inspection notes'
        )
        self.assertEqual(inspection.inspection_date.year, 2024)
        self.assertEqual(inspection.inspection_date.month, 9)
        self.assertEqual(inspection.inspection_date.day, 25)

    def test_notes_field(self):
        """Test the notes field can be blank."""
        inspection = Inspection.objects.create(
            user_id=self.user,
            garden_id=self.garden,
            inspection_date=date(2024, 9, 25),  # Use a date object here
            notes=''  # Empty notes
        )
        self.assertEqual(inspection.notes, '')

    def test_user_relation(self):
        """Test the relation with the User model."""
        inspection = Inspection.objects.create(
            user_id=self.user,
            garden_id=self.garden,
            inspection_date=date(2024, 9, 25),  # Use a date object here
            notes='Inspection notes'
        )
        self.assertEqual(inspection.user_id.username, 'testuser')

    def test_garden_relation(self):
        """Test the relation with the Garden model."""
        inspection = Inspection.objects.create(
            user_id=self.user,
            garden_id=self.garden,
            inspection_date=date(2024, 9, 25),  # Use a date object here
            notes='Inspection notes'
        )
        self.assertEqual(inspection.garden_id.name, 'My Garden')
