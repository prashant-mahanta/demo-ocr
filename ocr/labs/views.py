from django.shortcuts import render, redirect, reverse
import datetime
from .models import *
from django.conf import settings
from django.http import HttpResponse,HttpResponseRedirect
from .forms import *
from django.contrib.auth import authenticate,login,logout

# Create your views here.

from django.views.decorators.csrf import csrf_exempt


def main(request):
	if request.user.is_authenticated:
		user = User.objects.get(email=request.user)
		if user.usertype == 0:
			return HttpResponseRedirect('/all-labs/')
		logout(request)
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
		if user is not None:
			login(request, user)
			# If user is admin the shows all labs to him
			print(user.usertype)
			if user.usertype == 0:
				return HttpResponseRedirect('/all-labs/')
			return HttpResponseRedirect('/lab/')
		return HttpResponseRedirect('/lab/')

	return render(request, 'login.html')

def labProjects(request):
	user = User.objects.filter(email=request.user)
	print(user,user[0].usertype)
	return HttpResponse("Hello in Project directory")

def allLabs(request):
	print(request.user)
	return HttpResponse("All labs Sections")