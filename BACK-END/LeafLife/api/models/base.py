from datetime import datetime
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
        """Makes Base model abstract, so it is not created in the database"""
        abstract = True
    
    def to_dict(self):
        """Serializes an object to a dictionary"""
        obj_dict = {field.name: getattr(self, field.name) for field in self._meta.fields}
        obj_dict['__class__'] = self.__class__.__name__
        obj_dict['created_at'] = self.created_at.isoformat()
        obj_dict['updated_at'] = self.updated_at.isoformat()
        return obj_dict

    def save(self, *args, **kwargs):
        """Save the object and update the 'updated_at' field"""
        self.updated_at = datetime.utcnow()
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        """Delete the current instance"""
        super().delete(*args, **kwargs)

    def __str__(self):
        """String representation of the object"""
        return f"[{self.__class__.__name__}] ({self.id}) {self.to_dict}"