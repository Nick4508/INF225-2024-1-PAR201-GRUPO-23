#Django
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404, HttpResponse
from .models import rayos_X,ecografias,tomografias,resonancias
from .models import User 
from .forms import *
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.contrib.auth.views import LoginView
from django.urls import reverse_lazy
from django.views.generic.edit import FormView
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login

#from .forms import ProductForm
# Utilities
from datetime import datetime

@login_required
def home(request):
    usuario_actual = request.user
    reservas_rayos_x = rayos_X.objects.filter(usuario=usuario_actual)
    reservas_ecografia = ecografias.objects.filter(usuario=usuario_actual)
    reservas_resonancia_magnetica = resonancias.objects.filter(usuario=usuario_actual)
    reservas_analisis_de_sangre = tomografias.objects.filter(usuario=usuario_actual)
    
    # Combinar todas las reservas en una lista
    todas_las_reservas = list(reservas_rayos_x) + list(reservas_ecografia) + list(reservas_resonancia_magnetica) + list(reservas_analisis_de_sangre)
    
    return render(request, 'index.html', {'reservas_usuario': todas_las_reservas})

def profile(request):
	posts = User.objects.all()
	context = { 'posts': posts}
	return render(request, 'profile.html', context)



class get_name(LoginView):
	template_name = 'login.html'
	fields = '__all__'
	redirect_authenticated_user = True

	def get_success_url(self):
		return '../'


class RegisterPage(FormView):
	template_name='register.html'
	form_class = UserCreationForm
	redirect_authenticated_user = True

	def form_valid(self, form):
		user = form.save()
		if user is not None:
			login(self.request, user)
		return super(RegisterPage, self).form_valid(form)
	
def edit_profile(request):
    perfil_usuario_actual = request.user
    # print(request.method)
    if request.method == 'POST':
        form = ProfileForm(request.POST, instance=perfil_usuario_actual)
        if form.is_valid():
            form.save()
            return redirect('profile')  # Redirigir a la página de perfil después de editar
    else:
        form = ProfileForm(instance=perfil_usuario_actual)
    
    return render(request, 'edit_profile.html', {'form': form})

def reservas(request):
    if request.method == 'POST':
        form = ReservaForm(request.POST)
        if form.is_valid():
            tipo_examen = form.cleaned_data['tipo_examen']
            if tipo_examen == 'rayos_x':
                return redirect('reservas_rayos_x')
            elif tipo_examen == 'ecografia':
                return redirect('reservas_ecografias')
            elif tipo_examen == 'resonancia_magnetica':
                return redirect('reservas_resonancias')
            elif tipo_examen == 'tomografias':
                return redirect('reservas_tomografias')
    else:
        form = ReservaForm()
    return render(request, 'eleccion.html', {'form': form})

def reservas_resonancias(request):
    if request.method == 'POST':
        form = resonancia_ReservaForm(request.POST)
        if form.is_valid():
            fecha_reserva = form.cleaned_data['fecha_reserva']
            bloque_horas = form.cleaned_data['bloque_horas']
            
            # Verificar la disponibilidad en el bloque de horas deseado
            reservas_en_bloque = resonancias.objects.filter(fecha_reserva=fecha_reserva, bloque_horas=bloque_horas).count()
            if reservas_en_bloque < 3:
                reserva = form.save(commit=False)
                reserva.usuario = request.user
                reserva.save()
                return redirect('index')
            else:
                # Manejar el caso donde no hay disponibilidad suficiente en el bloque de horas deseado
                return render(request, 'error.html', {'message': 'No hay disponibilidad suficiente en el bloque de horas deseado'})
    else:
        form = resonancia_ReservaForm()
    return render(request, 'reservas_resonancias.html', {'form': form})	

def reservas_rayosX(request):
    if request.method == 'POST':
        form = rayos_x_ReservaForm(request.POST)
        if form.is_valid():
            fecha_reserva = form.cleaned_data['fecha_reserva']
            bloque_horas = form.cleaned_data['bloque_horas']
            
            # Verificar la disponibilidad en el bloque de horas deseado
            reservas_en_bloque = rayos_X.objects.filter(fecha_reserva=fecha_reserva, bloque_horas=bloque_horas).count()
            if reservas_en_bloque < 3:
                reserva = form.save(commit=False)
                reserva.usuario = request.user
                reserva.save()
                return redirect('index')
            else:
                # Manejar el caso donde no hay disponibilidad suficiente en el bloque de horas deseado
                return render(request, 'error.html', {'message': 'No hay disponibilidad suficiente en el bloque de horas deseado'})
    else:
        form = rayos_x_ReservaForm()
    return render(request, 'reservas_rayosX.html', {'form': form})	

def reservas_tomografias(request):
    if request.method == 'POST':
        form = tomografias_ReservaForm(request.POST)
        if form.is_valid():
            fecha_reserva = form.cleaned_data['fecha_reserva']
            bloque_horas = form.cleaned_data['bloque_horas']
            
            # Verificar la disponibilidad en el bloque de horas deseado
            reservas_en_bloque = tomografias.objects.filter(fecha_reserva=fecha_reserva, bloque_horas=bloque_horas).count()
            if reservas_en_bloque < 3:
                reserva = form.save(commit=False)
                reserva.usuario = request.user
                reserva.save()
                return redirect('index')
            else:
                # Manejar el caso donde no hay disponibilidad suficiente en el bloque de horas deseado
                return render(request, 'error.html', {'message': 'No hay disponibilidad suficiente en el bloque de horas deseado'})
    else:
        form = tomografias_ReservaForm()
    return render(request, 'reservas_tomografias.html', {'form': form})	

def reservas_ecografias(request):
    if request.method == 'POST':
        form = ecografias_ReservaForm(request.POST)
        if form.is_valid():
            fecha_reserva = form.cleaned_data['fecha_reserva']
            bloque_horas = form.cleaned_data['bloque_horas']
            
            # Verificar la disponibilidad en el bloque de horas deseado
            reservas_en_bloque = ecografias.objects.filter(fecha_reserva=fecha_reserva, bloque_horas=bloque_horas).count()
            if reservas_en_bloque < 3:
                reserva = form.save(commit=False)
                reserva.usuario = request.user
                reserva.save()
                return redirect('index')
            else:
                # Manejar el caso donde no hay disponibilidad suficiente en el bloque de horas deseado
                return render(request, 'error.html', {'message': 'No hay disponibilidad suficiente en el bloque de horas deseado'})
    else:
        form = ecografias_ReservaForm()
    return render(request, 'reservas_ecografias.html', {'form': form})	



def editar_reservas(request, tipo, id):
    # Determinar el modelo y el formulario basados en el tipo de reserva
    if tipo == 'Rayos X':
        ReservaModel = rayos_X
        Formulario = rayos_x_EditForm
    elif tipo == 'Tomografías':
        ReservaModel = tomografias
        Formulario = tomografias_EditForm
    elif tipo == 'Resonancia Magnética':
        ReservaModel = resonancias
        Formulario = resonancia_EditForm
    elif tipo == 'Ecografías':
        ReservaModel = ecografias
        Formulario = ecografias_EditForm
    else:
        # Manejar el caso donde el tipo de reserva no es válido
        return HttpResponse('Tipo de reserva no válido')

    # Obtener la reserva para editar
    reserva = get_object_or_404(ReservaModel, id=id)

    if request.method == 'POST':
        # Procesar el formulario enviado
        form = Formulario(request.POST, instance=reserva)
        if form.is_valid():
            form.save()
            return redirect('index')  # Redirigir a la página principal después de la edición
    else:
        # Mostrar el formulario para editar la reserva
        form = Formulario(instance=reserva)

    return render(request, 'editar_reservas.html', {'form': form})

def eliminar_reserva(request, tipo, id):
    # Determina el modelo de reserva en función del tipo pasado en la URL
    if tipo == 'Rayos X':
        modelo_reserva = rayos_X
    elif tipo == 'Ecografías':
        modelo_reserva = ecografias
    elif tipo == 'Resonancia Magnética':
        modelo_reserva = resonancias
    elif tipo == 'Tomografías':
        modelo_reserva = tomografias
    
    # Obtiene la reserva a eliminar
    reserva = get_object_or_404(modelo_reserva, id=id)
    
    if request.method == 'POST':
        # Elimina la reserva y redirige a la página de inicio
        reserva.delete()
        return redirect('index')
    else:
        # Si la solicitud no es POST, podría ser útil mostrar una página de confirmación de eliminación
        return render(request, 'confirmar_eliminar_reserva.html', {'reserva': reserva})
