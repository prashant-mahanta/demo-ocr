from django import forms
from .models import *
class LoginForm(forms.ModelForm):
    email = forms.CharField(widget= forms.EmailInput(attrs={'placeholder':'Email'}))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'placeholder': 'Password'}))

    class Meta:
    	model = User
    	fields = ['email', 'password']