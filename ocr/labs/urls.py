
from django.contrib import admin
from django.urls import path, include

from .views import *
from django.conf.urls import url

namespace = 'labs'
app_name = 'labs'

urlpatterns = [
	path('', main, name="main"),
	path('login/', signIn, name="signIn"),
	path('lab/', labProjects, name="labProjects"),

	# labs section for admin
	path('all-labs/', allLabs, name="allLabs"),
	# api to post 
]