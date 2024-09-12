#!/usr/bin/env python
from django.urls import path
from .views.users import UserList, UserCreate, UserDetail
from .views.gardens import GardenListCreate, GardenDetail
from .views.beds import BedListCreate,  BedDetail
from .views.register import RegisterUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views.login import CustomLoginJWTView

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', CustomLoginJWTView.as_view(), name='login'),
    path('register/', RegisterUserView.as_view(), name='register'),
    path('user/', UserCreate.as_view(), name='user-create'),
    path('users/', UserList.as_view(), name='user-list'),
    path('users/<str:id>/', UserDetail.as_view(), name='user-detail'),
    path('users/<str:id>/gardens/', GardenListCreate.as_view(), name='gardens-list-create'),
    path('users/<str:id>/gardens/<str:garden_id>/', GardenDetail.as_view(), name='gardens-detail'),
    # path('users/<uuid:user_id>/gardens/<uuid:garden_id>/beds', BedListCreate.as_view(), name='bed-list-create'),
    path('bed/<int:id>/', BedDetail.as_view(), name='bed-detail'),
    path('beds/', BedListCreate.as_view(), name='bed-list-create'),
    # path('beds/<int:id>/', BedDetail.as_view(), name='bed-detail'),
    # path('beds/<int:id>/crops/', BedDetail.as_view(), name='bed-crops'),
    # URLS to obtain and refresh tokens
]