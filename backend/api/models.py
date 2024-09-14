from django.db import models
from django.contrib.auth.models import User

def get_default_user():
    try:
        return User.objects.get(id=10).id
    except User.DoesNotExist:
        return None

class Expert(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    field = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(upload_to='expert_images/')
    prompt = models.TextField(default="You are an expert in your field. Provide accurate and helpful information.")
    
class Consultation(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    expert = models.ForeignKey(Expert, on_delete=models.CASCADE)
    question = models.TextField()
    answer = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
