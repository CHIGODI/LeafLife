import datetime
from . import models, Base


class Crop(Base):
    """Crop model that inherits from Base"""

    # crop status choices
    CROP_STATUS = (
        ('G', 'Growing'),
        ('H', 'Harvested'),
        ('D', 'Dead'),
    )
    name = models.CharField(max_length=100)
    variety = models.CharField(max_length=100)
    planting_date = models.DateField(default=datetime.date.today)
    harvest_date = models.DateField(default=datetime.date.strftime(
        datetime.date.today() + datetime.timedelta(days=90), "%Y-%m-%d"))
    status = models.CharField(max_length=1, choices=CROP_STATUS, default='G')
    bed = models.ForeignKey('Bed', related_name='crops',
                           on_delete=models.CASCADE)
    

    def __str__(self):
        """string representation of crop object"""
        return f"{self.__class__.__name__}:{self.id}-{self.name}"

    class Meta:
        """sets the table name in the database"""
        db_table = 'crops'
