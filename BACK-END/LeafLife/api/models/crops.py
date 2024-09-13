from . import models, Base


class Crop(Base):
    """Crop model that inherits from Base"""

    # crop status choices
    CROP_STATUS = (
        ('G', 'Growing'),
        ('H', 'Harvested'),
        ('D', 'Dead'),
    )
    name = models.CharField(max_length=255)
    variety = models.CharField(max_length=255)
    planting_date = models.DateField()
    harvest_date = models.DateField()
    status = models.CharField(max_length=1, choices=CROP_STATUS, default='G')
    bed_id = models.ForeignKey('Bed',
                            on_delete=models.CASCADE,
                            related_name='crops')
    

    def __str__(self):
        """string representation of crop object"""
        return f"{self.__class__.__name__}:{self.id}-{self.name}"

    class Meta:
        """sets the table name in the database"""
        db_table = 'crops'
