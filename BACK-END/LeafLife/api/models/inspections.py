from . import models, Base


class Inspection(Base):
    """Inspection model that inherits from Base and has additional attributes"""
    user_id = models.ForeignKey('User',
                             on_delete=models.CASCADE,
                             related_name='inspections')
    garden_id = models.ForeignKey('Garden',
                               on_delete=models.CASCADE,
                               related_name='inspections')
    inspection_date = models.DateField()
    notes = models.TextField()

    def __str__(self):
        """string representation of inspection object"""
        return f"{self.__class__.__name__}:{self.id}"

    class Meta:
        """sets the table name in the database"""
        db_table = 'inspections'
