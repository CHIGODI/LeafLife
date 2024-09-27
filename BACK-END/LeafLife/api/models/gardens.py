from . import models, Base


class Garden(Base):
    """Garden model that inherits from Base and has additional attributes"""
    name = models.CharField(max_length=255, unique=True)
    lat = models.CharField(max_length=255)
    long = models.CharField(max_length=255)
    description = models.TextField()
    user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='gardens')

    def __str__(self):
        """string representation of garden object"""
        return f"{self.__class__.__name__}:{self.id}-{self.name}"

    class Meta:
        """sets the table name in the database"""
        db_table = 'gardens'
