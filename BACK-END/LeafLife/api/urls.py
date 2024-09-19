#!/usr/bin/env python
from django.urls import path
from .views.users import UserList, UserCreate, UserDetail
from .views.gardens import GardenListCreate, GardenDetail
from .views.beds import BedListCreate,  BedDetail
from .views.crops import CropListCreate, CropDetail
from .views.all_crops import AllCrops
from .views.all_gardens import AllGardens
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views.login import LoginView
from .views.refresh import CustomTokenRefreshView
from .views.logout import logout_view

urlpatterns = [
    path('signup/', UserCreate.as_view(), name='user-create'),
    # path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/', LoginView.as_view(), name='login'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', logout_view, name='logout'),
    path('users/', UserList.as_view(), name='user-list'),
    path('users/<uuid:id>/', UserDetail.as_view(), name='user-detail'),
    path('users/<uuid:user_id>/gardens/', GardenListCreate.as_view(), name='gardens-list-create'),
    path('users/<uuid:user_id>/gardens/<garden_id>/', GardenDetail.as_view(), name='gardens-detail'),
    path('users/<uuid:user_id>/gardens/<garden_id>/beds/', BedListCreate.as_view(), name='bed-list-create'),
    path('users/<uuid:user_id>/gardens/<garden_id>/beds/<bed_id>/', BedDetail.as_view(), name='bed-detail'),
    path('users/<uuid:user_id>/gardens/<garden_id>/beds/<bed_id>/crops/', CropListCreate.as_view(), name='bed-list-crops'),
    path('users/<uuid:user_id>/gardens/<garden_id>/beds/<bed_id>/crops/<crop_id>', CropDetail.as_view(), name='crop-detail'),
    path('crops/', AllCrops.as_view(), name='all-crops'),
    path('gardens/', AllGardens.as_view(), name='all-gardens'),
    # path('beds/<int:id>/', BedDetail.as_view(), name='bed-detail'),
    # path('beds/<int:id>/crops/', BedDetail.as_view(), name='bed-crops'),
    # URLS to obtain and refresh tokens
]