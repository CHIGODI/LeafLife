from . import models, Base


class Harvest(Base):
    """Harvest model that records harvested quantities from a bed and crop"""
    bed_id= models.ForeignKey('Bed',
                              on_delete=models.CASCADE,
                              related_name='harvests')
    crop_id = models.ForeignKey('Crop',
                                on_delete=models.CASCADE,
                                related_name='harvests')
    quantity_harvested = models.PositiveIntegerField()
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        """string representation of harvest object"""
        return f"{self.__class__.__name__}:{self.id}"

    class Meta:
        """sets the table name in the database"""
        db_table = 'harvests'
