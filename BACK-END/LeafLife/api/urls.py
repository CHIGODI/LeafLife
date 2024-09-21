#!/usr/bin/env python
from django.urls import path
from .views.users import UserList, UserCreate, UserDetail
from .views.gardens import GardenCreate, GardenDetail
from .views.beds import BedListCreate,  BedDetail
from .views.crops import CropListCreate, CropDetail
from .views.all_crops import AllCrops
from .views.all_gardens import AllGardens
from .views.user_garden_stats import GardenStatsView
from .views.login import LoginView
from .views.refresh import CustomTokenRefreshView
from .views.logout import logout_view

urlpatterns = [
    path('signup/', UserCreate.as_view(), name='user-create'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', logout_view, name='logout'),
    path('users/', UserList.as_view(), name='user-list'),
    path('users/<uuid:id>/', UserDetail.as_view(), name='user-detail'),
    path('gardens/create/', GardenCreate.as_view(), name='gardens-create'),
    path('users/<uuid:user_id>/gardens/<garden_id>/', GardenDetail.as_view(), name='gardens-detail'),
    path('users/<uuid:user_id>/gardens/<garden_id>/beds/', BedListCreate.as_view(), name='bed-list-create'),
    path('users/<uuid:user_id>/gardens/<garden_id>/beds/<bed_id>/', BedDetail.as_view(), name='bed-detail'),
    path('users/<uuid:user_id>/gardens/<garden_id>/beds/<bed_id>/crops/', CropListCreate.as_view(), name='bed-list-crops'),
    path('users/<uuid:user_id>/gardens/<garden_id>/beds/<bed_id>/crops/<crop_id>', CropDetail.as_view(), name='crop-detail'),
    path('crops/', AllCrops.as_view(), name='all-crops'),
    path('gardens/', AllGardens.as_view(), name='all-gardens'),
    path('stats/', GardenStatsView.as_view(), name='garden-stats'),

]