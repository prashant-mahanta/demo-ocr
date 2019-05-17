from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register([User,Projects,LoginTrail,Lab,Labels,Files,Access])
