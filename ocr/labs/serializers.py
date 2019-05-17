from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import *

class LabelSerializer(ModelSerializer):

	class Meta:
		model = Labels
		fields = ["id", "project_id", "label_name", "color"]