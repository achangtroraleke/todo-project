from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import TaskSerializer
from .models import Task
# Create your views here.

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
def updateTask(request,pk):
    data = request.data
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(instance=task, data=data)

    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

@api_view(["POST"])
def createTask(request):
    data = request.data
    task = Task.objects.create(
        title = data['title'],
        body = data['body'],
        due_date= data['due_date']
    )
    serializer = TaskSerializer(task, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getTasksByYear(request, year):
    tasks = Task.objects.filter(due_date__year=year)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteTask(request,pk):
    task = Task.objects.get(id=pk)
    task.delete()
    return Response("Note was Delete")