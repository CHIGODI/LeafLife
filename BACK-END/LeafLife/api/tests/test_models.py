from django.test import TestCase
from api.models.base import Base
from api.models.users import User
from api.models.gardens import Garden
from datetime import datetime
import uuid

class BaseModelTestCase(TestCase):
    """Test case for BaseModel"""

    def setUp(self):
        """Set up initial test data"""
        self.user = User.objects.create(username="testuser", email="testuser@example.com", password="password123")
        self.garden = Garden.objects.create(name="Test Garden", lat="0000", long="1111", description="A test garden", user_id=self.user)

    def test_base_model_creation(self):
        """Test if BaseModel fields are created properly"""
        self.assertIsInstance(self.garden.id, uuid.UUID)
        self.assertIsInstance(self.garden.created_at, datetime)
        self.assertIsInstance(self.garden.updated_at, datetime)

    def test_save_method(self):
        """Test that the save method works and updates 'updated_at'"""
        old_updated_at = self.garden.updated_at
        self.garden.name = "Updated Garden"
        self.garden.save()

        self.assertNotEqual(self.garden.updated_at, old_updated_at)

    def test_delete_method(self):
        """Test the delete method"""
        garden_id = self.garden.id
        self.garden.delete()
        with self.assertRaises(Garden.DoesNotExist):
            Garden.objects.get(id=garden_id)

    def test_to_dict_method(self):
        """Test the to_dict method"""
        garden_dict = self.garden.to_dict()

        self.assertEqual(garden_dict['name'], "Test Garden")
        self.assertEqual(garden_dict['__class__'], 'Garden')
        self.assertTrue('created_at' in garden_dict)
        self.assertTrue('updated_at' in garden_dict)

    def test_string_representation(self):
        """Test the string representation of the model"""
        garden_str = str(self.garden)
        self.assertIn("Garden", garden_str)
        self.assertIn(str(self.garden.id), garden_str)