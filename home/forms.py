## FORMULARIOS PARA PEDIR HORA
from .models import User,rayos_X
from django import forms
from datetime import time

BLOQUES_RAYOSX_CHOICES = [
    (time(8,30),'08:30'),
    (time(9,0),'09:00'),
    (time(9,30),'09:30'),
    (time(10,00),'10:00'),
    (time(10,30),'10:30'),
    (time(11,00),'11:00'),
    (time(11,30),'11:30'),
]

class ProfileForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username','email'] # agregar lo demás al actualizar el modelo



class rayos_x_ReservaForm(forms.ModelForm):
    fecha_reserva = forms.DateField(label='Fecha de reserva', widget=forms.DateInput(attrs={'type': 'date'}))
    bloque_horas = forms.ChoiceField(label='Bloque de horas', choices=BLOQUES_RAYOSX_CHOICES)  # Define BLOQUES_HORAS_CHOICES según tus necesidades

    class Meta:
        model = rayos_X
        exclude = ['usuario', 'cantidad']