from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import time
BLOQUES_RAYOSX_CHOICES = [
    (time(8,30),'08:30'),
    (time(9,0),'09:00'),
    (time(9,30),'09:30'),
]
# Create models
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    def __str__(self):
        return f'Perfil de {self.user.username}'
	
	
class rayos_X(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    fecha_reserva = models.DateField(default=timezone.now())
    bloque_horas = models.TimeField(default=time(8,0))  # Define BLOQUE_HORAS_CHOICES según tus necesidades
    posible_diagnostico = models.TextField(blank=True)
    medico_deriva = models.CharField(max_length=100)

    def __str__(self):
        return f'Reserva de {self.usuario.username} para {self.fecha_reserva} a las {self.bloque_horas}'
    
    


class Post(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
	timestamp = models.DateTimeField(default=timezone.now)
	content = models.TextField()

	class Meta:
		ordering = ['-timestamp']

	def __str__(self):
		return f'{self.user.username}: {self.content}'