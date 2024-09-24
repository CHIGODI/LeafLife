from . import models, Base


class Harvest(Base):
    """
    Harvest model that records harvested quantities
    from a bed and crop
    """
    bed = models.ForeignKey('Bed',
                              on_delete=models.CASCADE,
                              related_name='harvests')
    crop = models.ForeignKey('Crop',
                                on_delete=models.CASCADE,
                                related_name='harvests')
    quantity_harvested = models.PositiveIntegerField()
    notes = models.TextField(blank=True, null=True)
    date = models.DateField(auto_now_add=True)

    def save(self, *args, **kwargs):
        """Override save to update the related crop's harvest date."""
        super().save(*args, **kwargs)
        self.crop.harvest_date = self.date
        self.crop.status = 'H'
        self.crop.save()

    def __str__(self):
        """string representation of harvest object"""
        return f"{self.__class__.__name__}:{self.id}"

    class Meta:
        """sets the table name in the database"""
        db_table = 'harvests'
