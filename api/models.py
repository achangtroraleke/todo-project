from django.db import models

# Create your models here.

class Task(models.Model):
    title = models.CharField(max_length=200, null=True, blank=True)
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)   
    created = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False, blank=True, null=True)
    due_date = models.DateTimeField(null=True)
    def __str__(self):
        return self.title