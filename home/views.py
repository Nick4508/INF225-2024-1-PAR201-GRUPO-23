#Django
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from .models import rayos_X
from .models import User 
from .models import Post
from .forms import ProfileForm,rayos_x_ReservaForm
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



# def home(request):
# 	return render(request,'index.html', {})
@login_required
def home(request):
    usuario_actual = request.user
    reservas_usuario = rayos_X.objects.filter(usuario_id=usuario_actual)
    return render(request, 'index.html', {'reservas_usuario': reservas_usuario})

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

def vista_reservas(request):
    usuario_actual = request.user
    print(usuario_actual)
    reservas_usuario = rayos_X.objects.filter(usuario_id=usuario_actual)
    print(reservas_usuario)
    # Ahora puedes hacer lo que quieras con las reservas del usuario, como pasarlas al contexto de la plantilla
    return render(request, 'index.html', {'reservas_usuario': reservas_usuario})

def reservas(request):
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
    return render(request, 'reservas.html', {'form': form})	