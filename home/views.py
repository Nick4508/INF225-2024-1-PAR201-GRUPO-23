#Django
from django.shortcuts import render, redirect
from .models import *
from .models import Post
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



def home(request):
	return render(request,'index.html', {})

def profile(request):
	posts = Profile.objects.all()
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