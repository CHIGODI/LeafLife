from . import models, Base


class CropRotation(Base):
    """CropRotation model that tracks crop rotations in a garden"""
    garden = models.ForeignKey('Garden',
                               on_delete=models.CASCADE,
                               related_name='crop_rotations')
    previous_crop = models.ForeignKey('Crop',
                                      on_delete=models.CASCADE,
                                      related_name='previous_crop_rotations')
    current_crop = models.ForeignKey('Crop',
                                     on_delete=models.CASCADE,
                                     related_name='current_crop_rotations')

    def __str__(self):
        return f'{self.previous_crop.name} to {self.current_crop.name} in {self.garden.name}'

    class Meta:
        db_table = 'crop_rotations'
