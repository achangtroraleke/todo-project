from rest_framework.serializers import ModelSerializer
from .models import Task
from rest_framework import fields

class TaskSerializer(ModelSerializer):

    class Meta:
        model = Task
        fields = "__all__"