from django.test import TestCase
from datetime import datetime
from unittest.mock import patch
from uuid import UUID
from api.models.base import Base
from django.db import models

class TestModel(Base):
    """Concrete model for testing the abstract Base model."""
    name = models.CharField(max_length=100)

class BaseModelTests(TestCase):
    """Test suite for Base model functionality using TestModel"""

    @patch('api.models.base.datetime')
    def test_uuid_is_generated(self, mock_datetime):
        """Test that a UUID is generated when the object is created."""
        mock_datetime.utcnow.return_value = datetime(2023, 9, 23)
        obj = TestModel(name="Test Object")
        obj.save()

        self.assertIsInstance(obj.id, UUID)
        self.assertTrue(obj.id)  # Ensure a UUID was assigned

    def test_created_at_and_updated_at(self):
        """Test that created_at and updated_at are set on object creation."""
        obj = TestModel(name="Test Object")
        obj.save()

        self.assertIsNotNone(obj.created_at)
        self.assertIsNotNone(obj.updated_at)
        # Check they are approximately equal
        self.assertTrue(abs((obj.created_at - obj.updated_at).total_seconds()) < 1)


    def test_updated_at_is_modified_on_save(self):
        """Test that updated_at field is updated when the object is saved."""
        obj = TestModel(name="Test Object")
        obj.save()

        original_updated_at = obj.updated_at
        obj.save()  # Trigger an update
        self.assertGreater(obj.updated_at, original_updated_at)

    def test_to_dict_method(self):
        """Test that the to_dict method serializes the object correctly."""
        obj = TestModel(name="Test Object")
        obj.save()
        obj_dict = obj.to_dict()

        self.assertEqual(obj_dict['__class__'], 'TestModel')
        self.assertEqual(obj_dict['created_at'], obj.created_at.isoformat())
        self.assertEqual(obj_dict['updated_at'], obj.updated_at.isoformat())
        # Use the correct UUID initialization and comparison
        self.assertEqual(str(UUID(obj_dict['id'])), str(obj.id))

    def test_delete_method(self):
        """Test that the object can be deleted."""
        obj = TestModel(name="Test Object")
        obj.save()
        obj_id = obj.id
        obj.delete()

        with self.assertRaises(TestModel.DoesNotExist):
            TestModel.objects.get(id=obj_id)

    def test_string_representation(self):
        """Test the string representation of the object."""
        obj = TestModel(name="Test Object")
        obj.save()
        obj_str = str(obj)

        expected_str = f"[{obj.__class__.__name__}] ({obj.id}) {obj.to_dict()}"
        self.assertEqual(obj_str, expected_str)
