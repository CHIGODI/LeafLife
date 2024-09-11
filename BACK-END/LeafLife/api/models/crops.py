from . import models, Base


class Crop(Base):
    """Crop model that inherits from Base"""
    name = models.CharField(max_length=255)
    variety = models.CharField(max_length=255)
    planting_date = models.DateField()
    bed_id = models.ForeignKey('Bed',
                            on_delete=models.CASCADE,
                            related_name='crops')

    def __str__(self):
        """string representation of crop object"""
        return f"{self.__class__.__name__}:{self.id}-{self.name}"

    class Meta:
        """sets the table name in the database"""
        db_table = 'crops'
