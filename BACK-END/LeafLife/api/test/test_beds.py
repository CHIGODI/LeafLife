from django.test import TestCase
from ..models import Bed, Garden, User

class BedModelTests(TestCase):
    def setUp(self):
        # Create a user instance
        self.user = User.objects.create(username='testuser', password='password123')

        # Create a garden instance with the user
        self.garden = Garden.objects.create(name="Test Garden", user=self.user)

        # Create a bed instance associated with the garden
        self.bed = Bed.objects.create(
            bed_number="1",
            garden=self.garden,
            bed_type='raised',
            length=2.5,
            width=1.5,
            soil_type='loam'
        )

    def test_bed_creation(self):
        bed = Bed.objects.create(bed_number="2", garden=self.garden, length=2, width=3)
        self.assertIsNotNone(bed.id)

    def test_bed_string_representation(self):
        self.assertEqual(str(self.bed), "Bed 1 (raised) in Garden {}".format(self.garden.id))

    def test_default_bed_type(self):
        self.assertEqual(self.bed.bed_type, 'raised')

    def test_default_soil_type(self):
        self.assertEqual(self.bed.soil_type, 'loam')

    def test_bed_update(self):
        self.bed.bed_type = 'in-ground'
        self.bed.save()
        self.assertEqual(Bed.objects.get(id=self.bed.id).bed_type, 'in-ground')

    def test_bed_number_unique_constraint(self):
        with self.assertRaises(Exception):
            Bed.objects.create(
                bed_number="1",  # Same bed_number as existing bed
                garden=self.garden,
                bed_type='raised',
                length=2.0,
                width=1.0,
                soil_type='sandy'
            )

    def test_bed_with_invalid_dimensions(self):
        with self.assertRaises(ValueError):
            Bed.objects.create(
                bed_number="3",
                garden=self.garden,
                bed_type='raised',
                length=-1,  # Invalid length
                width=1.5,
                soil_type='loam'
            )

    def test_bed_association_with_garden(self):
        self.assertEqual(self.bed.garden, self.garden)

    def test_bed_type_choices(self):
        valid_types = ['raised', 'in_ground', 'container']
        for i, bed_type in enumerate(valid_types):
            bed = Bed.objects.create(
                bed_number=str(i + 3),  # Ensure unique bed_number
                garden=self.garden,
                bed_type=bed_type,
                length=2.0,
                width=1.0,
                soil_type='loam'
            )
            self.assertEqual(bed.bed_type, bed_type)

    def test_bed_soil_type_choices(self):
        valid_soil_types = ['loam', 'sandy', 'clay']
        for i, soil_type in enumerate(valid_soil_types):
            bed = Bed.objects.create(
                bed_number=str(i + 6),  # Ensure unique bed_number
                garden=self.garden,
                bed_type='raised',
                length=2.0,
                width=1.0,
                soil_type=soil_type
            )
            self.assertEqual(bed.soil_type, soil_type)

    def test_delete_bed(self):
        bed_id = self.bed.id
        self.bed.delete()
        with self.assertRaises(Bed.DoesNotExist):
            Bed.objects.get(id=bed_id)
