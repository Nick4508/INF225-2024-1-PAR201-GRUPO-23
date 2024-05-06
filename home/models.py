from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import models
from django.contrib.auth.models import User, AbstractUser
from django.utils import timezone
from datetime import time


BLOQUES_RAYOSX_CHOICES = [
    (time(8,30),'08:30'),
    (time(9,0),'09:00'),
    (time(9,30),'09:30'),
]


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
    
# Create models
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    rut = models.CharField(max_length=20, blank=True)
    fecha_de_nacimiento = models.DateField(blank=True, null=True)
    alergias = models.TextField(blank=True)
    tramo_fonasa = models.CharField(max_length=20, blank=True)
    direccion = models.CharField(max_length=255, blank=True)
    telefono = models.CharField(max_length=20, blank=True)
    def __str__(self):
        return f'Perfil de {self.user.username}'
	
    
class rayos_X(models.Model):
    RAYOS_X = 'Rayos X'

    TIPO_EXAMEN_CHOICES = [
        (RAYOS_X, 'Rayos X'),
    ]
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    fecha_reserva = models.DateField(default=timezone.now())
    bloque_horas = models.TimeField(default=time(8,0))  # Define BLOQUE_HORAS_CHOICES según tus necesidades
    posible_diagnostico = models.TextField(blank=True)
    medico_deriva = models.CharField(max_length=100)
    tipo_de_examen = models.CharField(max_length=100,choices=TIPO_EXAMEN_CHOICES,default=RAYOS_X)

    def __str__(self):
        return f'Reserva de {self.usuario.username} para {self.fecha_reserva} a las {self.bloque_horas}'
    
class ecografias(models.Model):
    ECOGRAFIAS = 'Ecografías'

    TIPO_EXAMEN_CHOICES = [
        (ECOGRAFIAS, 'Ecografías'),
    ]
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    fecha_reserva = models.DateField(default= timezone.now())
    bloque_horas = models.TimeField(default=time(8,0))  # Define BLOQUE_HORAS_CHOICES según tus necesidades
    posible_diagnostico = models.TextField(blank=True)
    medico_deriva = models.CharField(max_length=100)
    tipo_de_examen = models.CharField(max_length=100,choices=TIPO_EXAMEN_CHOICES,default=ECOGRAFIAS)

    def __str__(self):
        return f'Reserva de {self.usuario.username} para {self.fecha_reserva} a las {self.bloque_horas}'

class tomografias(models.Model):
    TOMOGRAFIAS = 'Tomografías'

    TIPO_EXAMEN_CHOICES = [
        (TOMOGRAFIAS, 'Tomografías'),
    ]
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    fecha_reserva = models.DateField(default=timezone.now())
    bloque_horas = models.TimeField(default=time(8,0))  # Define BLOQUE_HORAS_CHOICES según tus necesidades
    posible_diagnostico = models.TextField(blank=True)
    medico_deriva = models.CharField(max_length=100)
    tipo_de_examen = models.CharField(max_length=100,choices=TIPO_EXAMEN_CHOICES,default=TOMOGRAFIAS)

    def __str__(self):
        return f'Reserva de {self.usuario.username} para {self.fecha_reserva} a las {self.bloque_horas}'

class resonancias(models.Model):
    RESONANCIA_MAGNETICA = 'Resonancia Magnética'

    TIPO_EXAMEN_CHOICES = [
        (RESONANCIA_MAGNETICA, 'Resonancia Magnética'),
    ]
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    fecha_reserva = models.DateField(default=timezone.now())
    bloque_horas = models.TimeField(default=time(8,0))  # Define BLOQUE_HORAS_CHOICES según tus necesidades
    posible_diagnostico = models.TextField(blank=True)
    medico_deriva = models.CharField(max_length=100)
    tipo_de_examen = models.CharField(max_length=100,choices= TIPO_EXAMEN_CHOICES ,default=RESONANCIA_MAGNETICA)

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