from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ExpertViewSet, ConsultationViewSet,ChatWithExpertView

router = DefaultRouter()
router.register(r'experts', ExpertViewSet)
router.register(r'consultations', ConsultationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('chat/<int:expert_id>/', ChatWithExpertView.as_view(), name='chat-with-expert'),
]