
from django.contrib import admin
from django.urls import path, include

from .views import *
from django.conf.urls import url

namespace = 'labs'
app_name = 'labs'

urlpatterns = [
	path('', main, name="main"),

	path('login/', signIn, name="signIn"),
	path('logout/', logout_user, name="logout_user"),

	path('lab/', labProjects, name="labProjects"),
	path('lab/<int:lab_id>/', labProjects, name="labProjects"),

	path('project/<int:project_id>/', projectPage, name="projectPage"),
	path('new-project/<int:lab_id>/', addNewProject, name="addNewProject"),
	path('add_labels/<int:project_id>/', addLabels, name="addLabels"),

	# labs section for admin
	path('all-labs/', allLabs, name="allLabs"),

	# api to post 

	# APIS to store and retrieve labels
	path('labels/', LabelsView.as_view(), name="LabelsView"),
	path('labels/<int:lab_id>/<int:project_id>/', LabelsView.as_view(), name="LabelsView"),
]