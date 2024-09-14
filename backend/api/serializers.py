from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Expert, Consultation

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class ExpertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expert
        fields = '__all__'
        read_only_fields = ('user',)

    def create(self, validated_data):
        user = self.context['request'].user
        return Expert.objects.create(user=user, **validated_data)



class ConsultationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    expert = ExpertSerializer(read_only=True)

    class Meta:
        model = Consultation
        fields = '__all__'
        
        
