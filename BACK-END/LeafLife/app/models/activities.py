from . import models, Base


class Activity(Base):
    """Activity model that logs garden-related activities by a user"""
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
    date = models.DateField()
    description = models.TextField()

    def __str__(self):
        """string representation of activity object"""
        return f"{self.__class__.__name__}:{self.id}"

    class Meta:
        """sets the table name in the database"""
        db_table = 'activities'