from django.shortcuts import render, redirect, reverse
import datetime
from .models import *
from django.conf import settings
from django.http import HttpResponse,HttpResponseRedirect
from .forms import *
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


def main(request):
	if request.user.is_authenticated:
		user = User.objects.get(email=request.user)
		if user.usertype == 0:
			return HttpResponseRedirect('/all-labs/')
		
		return HttpResponseRedirect('/lab/')
	return render(request, 'login.html')



def logout_user(request):
	logout(request)
	return HttpResponseRedirect('/')


@csrf_exempt
def signIn(request):
	if request.user.is_authenticated:
		if user.usertype == 0:
			return HttpResponseRedirect('/all-labs/')
		else:
			return HttpResponseRedirect('/lab/')
	if request.method == "POST":
		email = request.POST.get("email")
		password = request.POST.get("password")
		print(email, password)
		user = authenticate(email=email, password=password)
		print(user)
		if user is not None:
			login(request, user)
			# If user is admin the shows all labs to him
			loginTrail(request, email, 'success')
			print(user.usertype, "logged in")
			if user.usertype == 0:
				return HttpResponseRedirect('/all-labs/')
			return HttpResponseRedirect('/lab/')
		else:
			loginTrail(request, email, 'failed')
			return render(request, "login.html", {"message":"Wrong Email or Password.."})

		loginTrail(request, email, 'failed')
		return HttpResponseRedirect('/')

	return render(request, 'login.html')

@login_required(login_url='/')
def labProjects(request, lab_id=None):
	if request.user.is_authenticated:
		user = User.objects.get(email=request.user.email)
		if lab_id is None:
			lab_id = user.lab_id.id
			projects = Projects.objects.filter(lab_id=lab_id)
			context = {"projects": projects}
			lab = Lab.objects.get(id=lab_id)
			context["lab"] = lab
			context["user"] = user
			return render(request, "projects.html", context)
		else:
			projects = Projects.objects.filter(lab_id=lab_id)
			context = {"projects": projects}
			lab = Lab.objects.get(id=lab_id)
			context["lab"] = lab
			context["user"] = user
			return render(request, "projects.html", context)
	else:
		return HttpResponseRedirect('/')


@login_required(login_url='/')
def allLabs(request):
	if  request.user.is_authenticated:
		print(request.user)
		lab = Lab.objects.all()
		context = {}
		labs = []
		for i in lab:
			if i.labname != "AA":
				labs.append(i)
		context["labs"] = labs

		return render(request, "all_labs.html", context)
	else:
		return HttpResponseRedirect('/')

def loginTrail(request, email, status):
	email = email
	ip = request.get_host()
	server_name = request.META['SERVER_NAME']
	server_port = request.META['SERVER_PORT']
	secure = request.is_secure()
	browser = request.user_agent.browser.family +"\t"+ request.user_agent.browser.version_string

	if request.user_agent.is_pc:
		device = 'PC'
		os = request.user_agent.os.family +"\t"+ request.user_agent.os.version_string
		trail = LoginTrail(email=email,ip=ip, server_name=server_name, server_port=server_port, 
							secure=secure, status=status, browser=browser, device=device, os=os)
		trail.save()

	else:
		device = request.user_agent.device[0]
		brand = request.user_agent.device[1]
		model = request.user_agent.device[2]
		os = request.user_agent.os.family + request.user_agent.os.version_string
		trail = LoginTrail(email=email,ip=ip, server_name=server_name, server_port=server_port, 
							secure=secure, status=status, browser=browser,device=device, brand=brand,
							model=model, os=os)
		trail.save()


@login_required(login_url='/')
def projectPage(request, project_id=None):
	project = Projects.objects.get(id=project_id)
	context = {}
	context["project"] = project
	email = request.user.email
	user = User.objects.get(email=email)
	context["user"] = user
	return render(request, "seg-tool-test.html", context)


@login_required(login_url='/')
def addNewProject(request, lab_id=None):
	email = request.user.email
	user = User.objects.get(email=email)
	context = {}
	context["user"] = user
	context["lab_id"] = lab_id
	return render(request, 'newproj.html', context)



@login_required(login_url='/')
def addLabels(request, project_id=None):
	email = request.user.email
	user = User.objects.get(email=email)
	project = Projects.objects.get(id=project_id)
	lab_id = project.lab_id.id
	context = {}
	context["project"] = project
	context["user"] = user
	context["lab_id"] = lab_id
	return render(request, "new_label.html", context)

# -------------------------- APIs ---------------------------
# @login_required(login_url='/')
class LabelsView(APIView):
	permission_classes = [AllowAny]

	# GET request
	def get(self, request, format=None, lab_id=None, project_id=None):
		if lab_id is None and project_id is None:
			objects = Labels.objects.all()
			serialized_object = LabelSerializer(objects, many=True)
		else:
			project = Projects.objects.get(id=int(project_id))
			label = Labels.objects.filter(project_id=project)
			serialized_object = LabelSerializer(label, many=True)
		return Response(serialized_object.data)

	# POST request
	def post(self, request, format=None):
		lab_id = request.data.get("lab_id")
		project_name = request.data.get("project_name")
		description = request.data.get("description")
		labels = request.data.getlist("labels[]")
		project_id = request.data.get("project_id")
		if lab_id is not None and project_name is not None and description is not None and labels is not None:

			# u = User.objects.get(id=int(user))
			lab = Lab.objects.get(id=int(lab_id))
			project = Projects(lab_id=lab, project_name=project_name, description=description, created_by=request.user.email)
			project.save()
			for i in range(len(labels)):
				ln, color = labels[i].split(',')
				label = Labels(project_id=project, label_name=ln, color=color, created_by=request.user.email)
				label.save()
			# print(lab_id, project_name, description, labels)
			objects = Labels.objects.filter(project_id=project)
			serialized_object = LabelSerializer(objects, many=True)

		elif lab_id is not None and labels is not None and project_id is not None:
			lab = Lab.objects.get(id=int(lab_id))
			project = Projects.objects.get(id=int(project_id))
			for i in range(len(labels)):
				ln, color = labels[i].split(",")
				label = Labels(project_id=project, label_name=ln, color=color, created_by=request.user.email)
				label.save()
			objects = Labels.objects.filter(project_id=project)
			serialized_object = LabelSerializer(objects, many=True)

		return Response(serialized_object.data)
