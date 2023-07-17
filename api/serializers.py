from rest_framework.serializers import ModelSerializer
from .models import Task, User
from rest_framework import fields
from django.contrib.auth.hashers import make_password

class TaskSerializer(ModelSerializer):

    class Meta:
        model = Task
        exclude = ['user']

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')
        

        def create(self, validated_data):
            user = User.objects.create_user(validated_data['username'], None, make_password(validated_data['password']))
            return user