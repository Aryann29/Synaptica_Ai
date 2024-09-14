from django.contrib.auth.models import User
from django.contrib.auth import login
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Expert, Consultation
from .serializers import ExpertSerializer, ConsultationSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import google.generativeai as genai
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import AnonymousUser

class ChatWithExpertView(APIView):
    def post(self, request, expert_id):
        try:
            expert = Expert.objects.get(id=expert_id)
        except Expert.DoesNotExist:
            return Response({"error": "Expert not found"}, status=status.HTTP_404_NOT_FOUND)

        message = request.data.get("message")
        if not message:
            return Response({"error": "Message is required"}, status=status.HTTP_400_BAD_REQUEST)

        genai.configure(api_key=settings.GOOGLE_AI_API_KEY)
        model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction=expert.prompt
        )
        chat = model.start_chat()
        response = chat.send_message(message)

        consultation = Consultation.objects.create(
            user=request.user if request.user.is_authenticated else None,
            expert=expert,
            question=message,
            answer=response.text
        )

        return Response({
            "expert_id": expert.id,
            "expert_name": expert.name,
            "question": message,
            "answer": response.text
        })
        
class ExpertViewSet(viewsets.ModelViewSet):
    queryset = Expert.objects.all()
    serializer_class = ExpertSerializer
    

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['patch'])
    def update_prompt(self, request, pk=None):
        expert = self.get_object()
        new_prompt = request.data.get('prompt')
        if new_prompt:
            expert.prompt = new_prompt
            expert.save()
            return Response({'status': 'prompt updated'})
        return Response({'error': 'No prompt provided'}, status=status.HTTP_400_BAD_REQUEST)

class ConsultationViewSet(viewsets.ModelViewSet):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer
  