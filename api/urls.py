from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
urlpatterns = [
    path('create-user/', views.registerUser, name='register'),
    path('token/', MyTokenObtainPairView.as_view(), name ='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name ='token_refresh'),
    path('', views.getRoutes, name='tasks'),
    
    path('tasks/', views.getTasks, name='all_tasks'),
    path('tasks/create/', views.createTask, name='create-task'),
    path('tasks/<str:pk>/', views.getOneTasks, name='one_task'),
    path('tasks/<str:pk>/update/', views.updateTask, name='update'),
    path('tasks/year/<str:year>/', views.getTasksByYear, name='year-task'),
    path('tasks/<str:pk>/delete/', views.deleteTask, name='delete'),
    

]