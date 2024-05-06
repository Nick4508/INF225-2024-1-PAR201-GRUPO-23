from django.urls import path
from . import views  as local_views
from django.conf import settings
from django.conf.urls.static import static
from .views import get_name
from django.contrib.auth.views import LogoutView
from django.views.generic.edit import FormView
from .views import RegisterPage


urlpatterns = [	
	path('Login/', get_name.as_view(), name='login'),
	path('Logout/', LogoutView.as_view(next_page='index'), name='logout'),
	path('', local_views.home, name='index'),
	path('User-account/', local_views.profile, name='profile'),
    path('edit-profile/',local_views.edit_profile, name='editar'),
	path('Register/', RegisterPage.as_view(success_url='../') ),
	path('reservas/', local_views.reservas, name='reservas'),
    path('rayosX_reservar/',local_views.reservas_rayosX, name='reservas_rayos_x' ),
    path('resonancia_reservar/',local_views.reservas_resonancias, name='reservas_resonancias' ),
    path('tomografias_reservar/',local_views.reservas_tomografias, name='reservas_tomografias' ),
	path('ecografias_reservar/',local_views.reservas_ecografias, name='reservas_ecografias' ),

	path('editar_reserva/<str:tipo>/<int:id>/', local_views.editar_reservas, name='editar_reserva'),
    path('eliminar_reserva/<str:tipo>/<int:id>/', local_views.eliminar_reserva, name='eliminar_reserva'),
]