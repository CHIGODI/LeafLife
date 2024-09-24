from django.test import TestCase
from ..models import Garden, User  # Adjust the import according to your project structure

class GardenModelTest(TestCase):
    def setUp(self):
        """Set up a user instance for testing"""
        self.user = User.objects.create(username='testuser', password='password')  # Adjust fields as necessary

    def test_create_garden(self):
        """Test the creation of a garden"""
        garden = Garden.objects.create(
            name='My Garden',
            lat='34.0522',
            long='-118.2437',
            description='A beautiful garden.',
            user=self.user
        )

        self.assertEqual(garden.name, 'My Garden')
        self.assertEqual(garden.lat, '34.0522')
        self.assertEqual(garden.long, '-118.2437')
        self.assertEqual(garden.description, 'A beautiful garden.')
        self.assertEqual(garden.user, self.user)

    def test_string_representation(self):
        """Test the string representation of the garden"""
        garden = Garden.objects.create(
            name='My Garden',
            lat='34.0522',
            long='-118.2437',
            description='A beautiful garden.',
            user=self.user
        )
        self.assertEqual(str(garden), f"Garden:{garden.id}-My Garden")

    def test_garden_relationship(self):
        """Test the relationship between Garden and User"""
        garden = Garden.objects.create(
            name='My Garden',
            lat='34.0522',
            long='-118.2437',
            description='A beautiful garden.',
            user=self.user
        )
        self.assertIn(garden, self.user.gardens.all())

    def test_garden_max_length(self):
        """Test the max_length of the garden name"""
        garden = Garden(name='A' * 256, lat='34.0522', long='-118.2437', description='A beautiful garden.', user=self.user)
        with self.assertRaises(Exception):
            garden.full_clean()  # This will raise an error if the validation fails
