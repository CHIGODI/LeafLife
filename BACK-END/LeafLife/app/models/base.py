from datetime import date
from django.db import models
import uuid


class Base(models.Model):
    """Base model provides common fields to other models."""
    id = models.UUIDField(primary_key=True,
                          default=uuid.uuid4,
                          editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        """Makes the model abstract, so it is not created in the database"""
        abstract = True
