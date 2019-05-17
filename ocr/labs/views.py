from django.shortcuts import render, redirect, reverse
import datetime
from .models import *
from django.conf import settings
from django.http import HttpResponse,HttpResponseRedirect
from .forms import *
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required

# Create your views here.

from django.views.decorators.csrf import csrf_exempt


def main(request):
	if request.user.is_authenticated:
		user = User.objects.get(email=request.user)
		if user.usertype == 0:
			return HttpResponseRedirect('/all-labs/')
		
		return HttpResponseRedirect('/lab/')
	return render(request, 'login.html')

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
			print(user.usertype, "logged in")
			if user.usertype == 0:
				return HttpResponseRedirect('/all-labs/')
			return HttpResponseRedirect('/lab/')
		else:
			return render(request, "login.html", {"message":"Wrong Email or Password.."})
		return HttpResponseRedirect('')

	return render(request, 'login.html')

@login_required(login_url='/')
def labProjects(request, lab_id=None):
	if request.user.is_authenticated:
		if lab_id is None:
			user = User.objects.filter(email=request.user.email)
			lab_id = user.lab_id
			projects = Projects.objects.filter(lab_id=lab_id)
			context = {"projects": projects}
			lab = Lab.objects.get(id=lab_id)
			context["lab"] = lab
			return render(request, "projects.html", context)
		else:
			projects = Projects.objects.filter(lab_id=lab_id)
			context = {"projects": projects}
			return render(request, "projects.html", context)
	else:
		return HttpResponseRedirect('/')


@login_required(login_url='/')
def allLabs(request):
	if  request.user.is_authenticated:
		print(request.user)
		labs = Lab.objects.all()
		context = {}
		context["labs"] = labs
		return render(request, "all_labs.html", context)
	else:
		return HttpResponseRedirect('/')

def logout(request):
	logout(request)
	return HttpResponseRedirect('/')