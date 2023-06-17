from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='tasks'),
    path('tasks/', views.getTasks, name='all_tasks'),
    path('tasks/create/', views.createTask, name='create-task'),
    path('tasks/<str:pk>/', views.getOneTasks, name='one_task'),

    path('tasks/<str:pk>/update/', views.updateTask, name='update'),
    path('tasks/year/<str:year>/', views.getTasksByYear, name='year-task'),
    path('tasks/<str:pk>/delete/', views.deleteTask, name='delete')
    

]