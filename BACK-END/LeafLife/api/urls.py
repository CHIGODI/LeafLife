#!/usr/bin/env python
from django.urls import path
from .views.users import UserList, UserCreate, UserDetail
from .views.gardens import GardenListCreate, GardenDetail
from .views.beds import BedListCreate,  BedDetail
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views.login import CustomLoginJWTView

urlpatterns = [
    path('signup/', UserCreate.as_view(), name='user-create'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/', UserList.as_view(), name='user-list'),
    path('users/<uuid:id>/', UserDetail.as_view(), name='user-detail'),
    path('users/<uuid:user_id>/gardens/', GardenListCreate.as_view(), name='gardens-list-create'),
    path('users/<uuid:user_id>/gardens/<uuid:garden_id>/', GardenDetail.as_view(), name='gardens-detail'),
    path('users/<uuid:user_id>/gardens/<uuid:garden_id>/beds/', BedListCreate.as_view(), name='bed-list-create'),
    path('beds/', BedListCreate.as_view(), name='bed-list-create'),
    path('bed/<int:id>/', BedDetail.as_view(), name='bed-detail'),
    # path('beds/<int:id>/', BedDetail.as_view(), name='bed-detail'),
    # path('beds/<int:id>/crops/', BedDetail.as_view(), name='bed-crops'),
    # URLS to obtain and refresh tokens
]