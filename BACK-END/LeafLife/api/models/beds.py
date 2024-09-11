from . import models, Base


class Bed(Base):
    """Bed model that represents a garden bed with specific attributes"""

    BED_TYPE_CHOICES = [
        ('raised', 'Raised Bed'),
        ('in_ground', 'In-Ground Bed'),
        ('container', 'Container Bed'),
    ]

    SOIL_TYPE_CHOICES = [
        ('clay', 'Clay'),
        ('sandy', 'Sandy'),
        ('loam', 'Loam'),
        ('peat', 'Peat'),
        ('blackcotton', 'BlackCotton'),
        ('redsoil', 'RedSoil'),
    ]

    # override the default primary key
    id = models.AutoField(primary_key=True)

    garden_id = models.ForeignKey('Garden', on_delete=models.CASCADE, related_name='beds')
    # predefined bed types
    bed_type = models.CharField(max_length=20, choices=BED_TYPE_CHOICES)
    # dimensions in meters
    length = models.DecimalField(max_digits=5, decimal_places=2)
    width = models.DecimalField(max_digits=5, decimal_places=2)
    # soil type
    soil_type = models.CharField(max_length=255, choices=SOIL_TYPE_CHOICES)

    def __str__(self):
        """String representation of the bed object"""
        return f"Bed {self.bed_number} ({self.bed_type}) in Garden {self.garden_id}"

    class Meta:
        """Set the table name in the database"""
        db_table = 'beds'
        # unique_together = ('garden_id', 'bed_number')
