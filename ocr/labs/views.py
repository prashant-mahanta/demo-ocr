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
		if lab_id is None:
			user = User.objects.get(email=request.user.email)
			lab_id = user.lab_id.id
			projects = Projects.objects.filter(lab_id=lab_id)
			context = {"projects": projects}
			lab = Lab.objects.get(id=lab_id)
			context["lab"] = lab
			return render(request, "projects.html", context)
		else:
			projects = Projects.objects.filter(lab_id=lab_id)
			context = {"projects": projects}
			lab = Lab.objects.get(id=lab_id)
			context["lab"] = lab
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
	return HttpResponse("link pages")

@login_required(login_url='/')
def addNewProject(request):
	return render(request, 'newproj.html')



# -------------------------- APIs ---------------------------
class LabelsView(APIView):
	permission_classes = [AllowAny]

	# GET request
	def get(self, request, format=None):
		objects = Labels.objects.all()
		serialized_object = LabelSerializer(objects, many=True)

		return Response(serialized_object.data)

	# POST request
	# def post(self, request, format=None):
