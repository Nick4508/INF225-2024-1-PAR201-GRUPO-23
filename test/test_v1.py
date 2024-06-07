import unittest
import json
from django.test import Client
from django.urls  import reverse
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import time

userModel = get_user_model()

class usersTest(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.client = Client()
    
    @classmethod
    def tearDownClass(cls):
        cls.client.delete        

    def test_crear_usuario(self):
        response = self.client.post(reverse('Register'), {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'password456'
        })
        self.assertEqual(response.status_code,201)

    def test_obtener_usuarios(self):
        response = self.client.get(reverse('get_users'))
        data = json.loads(response.content)
        self.assertIsInstance(data,list)


class horasTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client= Client()
        
    @classmethod
    def tearDownClass(cls):
        
        cls.client.delete
    
    def test_crear_hora(self):
        response = self.client.post(reverse('reservas_rayos_x'),{
            'fecha_reserva': timezone.now(),
            'bloque_horas': time(8,0),
            'posible_diagnostico' : 'test',
            'medico_deriva' : 'medic_test',
            'tipo_de_examen' : 'Ecografías',
        })
        self.assertEqual(response.status_code,200 )

    def test_editar_hora(self):
        
        response = self.client.get(reverse('Only_x_rays'))
        data = json.loads(response.content)
        self.assertNotIsInstance(data,list)
       


if __name__ == '__main__':
    unittest.main()
