from . import models, Base


class User(Base):
    """Custom User model that inherits from the Base model"""
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)

    def __str__(self):
        """string representation of user object"""
        return f"{self.__class__.__name__}:{self.username}"


    class Meta:
        """sets the table name in the database"""
        db_table = 'users'
