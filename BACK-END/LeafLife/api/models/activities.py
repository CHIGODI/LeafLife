from . import models, Base


class Activity(Base):
    """Activity model that logs garden-related activities by a user"""

    ACTIVITY_TYPE_CHOICES = [
        ('fertilization', 'Fertilization'),
        ('watering', 'Watering'),
        ('weed_control', 'Weed Control'),
        ('pest_control', 'Pest Control'),
        ('inspection', 'Inspection'),
        ('planting', 'Planting'),
        ('pruning', 'Pruning'),
        ('transplanting', 'Transplanting'),
        ('other', 'Other'),
    ]
    user_id = models.ForeignKey('User',
                                on_delete=models.CASCADE,
                                related_name='activities')
    garden_id = models.ForeignKey('Garden',
                               on_delete=models.CASCADE,
                               related_name='activities')
    bed_id = models.ForeignKey('Bed',
                            on_delete=models.SET_NULL,
                            null=True,
                            blank=True,
                            related_name='activities')
    activity_type = models.CharField(max_length=20,
                                     choices=ACTIVITY_TYPE_CHOICES,default='inspection')
    date = models.DateField()
    notes = models.TextField()


    def __str__(self):
        """string representation of activity object"""
        return f"{self.__class__.__name__}:{self.id}"

    class Meta:
        """sets the table name in the database"""
        db_table = 'activities'