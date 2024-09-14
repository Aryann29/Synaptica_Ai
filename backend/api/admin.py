from django.contrib import admin
from .models import Expert, Consultation

@admin.register(Expert)
class ExpertAdmin(admin.ModelAdmin):
    list_display = ('name', 'field', 'user')

@admin.register(Consultation)
class ConsultationAdmin(admin.ModelAdmin):
    list_display = ('user', 'expert', 'question', 'created_at', 'updated_at')
