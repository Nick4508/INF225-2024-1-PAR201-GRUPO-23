## FORMULARIOS PARA PEDIR HORA

from django import forms

class ProductFrom(forms.Form):
    algo = forms.FloatField(label='wolas', min_value=1, max_value=2, required=True)