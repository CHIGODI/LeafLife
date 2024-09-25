from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from . import models, Base
from django.utils.translation import gettext_lazy as _
import uuid

class CustomUserManager(BaseUserManager):
    """methods to create and manage users"""
    
    '''
    def create_user(self, username, email, password=None, **extra_fields):
        """create and return a user with an email and password"""
        if not email:
            raise ValueError('Hey Email field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        # hashes the password
        user.set_password(password)
        print("password hashed")
        user.is_active = True
        user.save()
        return user
    

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, email, password, **extra_fields)
    '''
class User(AbstractBaseUser, Base):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()

    # set the username field to be the username
    USERNAME_FIELD = 'username'

    # required fields for creating a super user
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return f"{self.__class__.__name__}:{self.id}-{self.username}"

    class Meta:
        db_table = 'users'
