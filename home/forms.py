## FORMULARIOS PARA PEDIR HORA
from .models import Profile,User,rayos_X,ecografias,tomografias,resonancias
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
BLOQUES_RESONANCIAS_CHOICES =[

]

class userForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username','email']

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['fecha_de_nacimiento','rut','alergias','tramo_fonasa','direccion','telefono'] # agregar lo demás al actualizar el modelo
        # fields = ['username','email']

class ReservaForm(forms.Form):
    CHOICES = (
        ('rayos_x', 'Rayos X'),
        ('ecografia', 'Ecografía'),
        ('resonancia_magnetica', 'Resonancia Magnética'),
        ('tomografias', 'Tomografías'),
    )
    tipo_examen = forms.ChoiceField(choices=CHOICES, widget=forms.RadioSelect)

class rayos_x_ReservaForm(forms.ModelForm):
    fecha_reserva = forms.DateField(label='Fecha de reserva', widget=forms.DateInput(attrs={'type': 'date'}))
    bloque_horas = forms.ChoiceField(label='Bloque de horas', choices=BLOQUES_RAYOSX_CHOICES)  # Define BLOQUES_HORAS_CHOICES según tus necesidades

    class Meta:
        model = rayos_X
        exclude = ['usuario', 'cantidad']

class tomografias_ReservaForm(forms.ModelForm):
    fecha_reserva = forms.DateField(label='Fecha de reserva', widget=forms.DateInput(attrs={'type': 'date'}))
    bloque_horas = forms.ChoiceField(label='Bloque de horas', choices=BLOQUES_RAYOSX_CHOICES)  # Define BLOQUES_HORAS_CHOICES según tus necesidades

    class Meta:
        model = tomografias
        exclude = ['usuario', 'cantidad']

class ecografias_ReservaForm(forms.ModelForm):
    fecha_reserva = forms.DateField(label='Fecha de reserva', widget=forms.DateInput(attrs={'type': 'date'}))
    bloque_horas = forms.ChoiceField(label='Bloque de horas', choices=BLOQUES_RAYOSX_CHOICES)  # Define BLOQUES_HORAS_CHOICES según tus necesidades

    class Meta:
        model = ecografias
        exclude = ['usuario', 'cantidad']

class resonancia_ReservaForm(forms.ModelForm):
    fecha_reserva = forms.DateField(label='Fecha de reserva', widget=forms.DateInput(attrs={'type': 'date'}))
    bloque_horas = forms.ChoiceField(label='Bloque de horas', choices=BLOQUES_RAYOSX_CHOICES)  # Define BLOQUES_HORAS_CHOICES según tus necesidades

    class Meta:
        model = resonancias
        exclude = ['usuario', 'cantidad']



class rayos_x_EditForm(forms.ModelForm):
    fecha_reserva = forms.DateField(label='Fecha de reserva', widget=forms.DateInput(attrs={'type': 'date'}))
    bloque_horas = forms.ChoiceField(label='Bloque de horas', choices=BLOQUES_RAYOSX_CHOICES)  # Define BLOQUES_HORAS_CHOICES según tus necesidades
    class Meta:
        model = rayos_X
        exclude = ['usuario','cantidad']

class ecografias_EditForm(forms.ModelForm):
    fecha_reserva = forms.DateField(label='Fecha de reserva', widget=forms.DateInput(attrs={'type': 'date'}))
    bloque_horas = forms.ChoiceField(label='Bloque de horas', choices=BLOQUES_RAYOSX_CHOICES)  # Define BLOQUES_HORAS_CHOICES según tus necesidades
    class Meta:
        model = ecografias
        exclude = ['usuario','cantidad']

class tomografias_EditForm(forms.ModelForm):
    fecha_reserva = forms.DateField(label='Fecha de reserva', widget=forms.DateInput(attrs={'type': 'date'}))
    bloque_horas = forms.ChoiceField(label='Bloque de horas', choices=BLOQUES_RAYOSX_CHOICES)  # Define BLOQUES_HORAS_CHOICES según tus necesidades
    class Meta:
        model = tomografias
        exclude = ['usuario','cantidad']

class resonancia_EditForm(forms.ModelForm):
    fecha_reserva = forms.DateField(label='Fecha de reserva', widget=forms.DateInput(attrs={'type': 'date'}))
    bloque_horas = forms.ChoiceField(label='Bloque de horas', choices=BLOQUES_RAYOSX_CHOICES)  # Define BLOQUES_HORAS_CHOICES según tus necesidades
    class Meta:
        model = resonancias
        exclude = ['usuario','cantidad']