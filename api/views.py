from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from .serializers import TaskSerializer, UserSerializer
from .models import Task, User
from django.contrib.auth.hashers import make_password
# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username

        # ...

        return token
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(["GET"])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/tasks/',
            'method':'GET',
            'body': None,
            'description': 'Returns all To Do tasks.'
        }
    ]
    return Response(routes)

@api_view(['GET'])
def getTasks(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getOneTasks(request, pk):
    tasks = Task.objects.get(id=pk)
    serializer = TaskSerializer(tasks, many=False)

    return Response(serializer.data)

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateTask(request,pk):
    
    data = request.data
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(instance=task, data=data)
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createTask(request):
    data = request.data
    
    task = Task.objects.create(
        title = data['title'],
        body = data['body'],
        due_date= data['due_date'],
        user=request.user
        
    )
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getTasksByYear(request, year):
    user = request.user
    tasks = Task.objects.filter(due_date__year=year, user= user.id)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteTask(request,pk):
    task = Task.objects.get(id=pk)
    task.delete()
    return Response("Note was Delete")


@api_view(["POST"])
def registerUser(request):
    data = request.data
    instance=User(username=data['username'], password=data['password'])
    serializer = UserSerializer(data=data)
   
    if instance.full_clean()==None:
        if serializer.is_valid():
            password = serializer.validated_data.get('password')
            serializer.validated_data['password']=make_password(password)
            serializer.save()
            return Response('User Created')
    else:
        return Response('Error has occurred')
