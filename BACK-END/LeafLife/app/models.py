from django.db import models

class User(models.Model):
    """User class"""
    username = models.CharField(max_length=255)
    email = models.CharField(max_length=128)
    password = models.CharField(max_length=255)


    def __str__(self):
        return self.name