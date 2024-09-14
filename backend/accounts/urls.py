from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ProfileViewSet,MyExpertViewSet
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'profiles', ProfileViewSet)
router.register(r'myexperts', MyExpertViewSet, basename='myexperts')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/signup/', UserViewSet.as_view({'post': 'signup'}), name='signup'),
    path('auth/me/', UserViewSet.as_view({'get': 'me'}), name='me'),
    path('auth/login/', UserViewSet.as_view({'post': 'login'}), name='login'),
    path('auth/logout/', UserViewSet.as_view({'post': 'logout'}), name='logout'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/protected/', UserViewSet.as_view({'get': 'protected_view'}), name='protected'),
]
