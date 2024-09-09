from . import models, Base


class Bed(Base):
    """Bed model that inherits from Base and has additional attributes"""
    name = models.CharField(max_length=5)
    garden_id = models.ForeignKey('Garden',
                               on_delete=models.CASCADE,
                               related_name='beds')

    def __str__(self):
        """string representation of bed object"""
        return f"{self.__class__.__name__}:{self.id}-{self.name}"

    class Meta:
        """sets the table name in the database"""
        db_table = 'beds'
