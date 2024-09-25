#!/usr/bin/env python
from django.urls import path
from .views.users import UserList, UserCreate, UserDetail
from .views.gardens import GardenList, GardenCreate, GardenDetail
from .views.beds import BedCreate, BedDetail, BedList
from .views.crops import CropCreate, CropDetail
from .views.user_garden_stats import GardenStatsView
from .views.all_stats import GardenBedCropStatsView
from .views.login import LoginView
from .views.refresh import CustomTokenRefreshView
from .views.logout import LogoutView
from rest_framework_simplejwt.views import TokenBlacklistView


urlpatterns = [
    path('signup/', UserCreate.as_view(), name='user-create'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('users/', UserList.as_view(), name='user-list'),
    path('profile/', UserDetail.as_view(), name='user-detail'),
    path('garden/create/', GardenCreate.as_view(), name='garden-create'),
    path('user/gardens/', GardenList.as_view(), name='garden-list'),
    path('user/<user_id>/garden/<garden_id>/', GardenDetail.as_view(), name='garden-detail'),
    path('user/<uuid:user_id>/garden/<garden_id>/beds/', BedList.as_view(), name='bed-list'),
    path('user/<uuid:user_id>/garden/<garden_id>/bed/', BedCreate.as_view(), name='bed-create'),
    path('user/<uuid:user_id>/garden/<garden_id>/bed/<bed_id>/', BedDetail.as_view(), name='bed-detail'),
    path('user/<uuid:user_id>/garden/<garden_id>/bed/<bed_id>/crop/', CropCreate.as_view(), name='crop-create'),
    path('user/<uuid:user_id>/garden/<garden_id>/bed/<bed_id>/crop/<crop_id>', CropDetail.as_view(), name='crop-detail'),
    path('user/stats/', GardenStatsView.as_view(), name='user-garden-stats'),
    path('stats/', GardenBedCropStatsView.as_view(), name='all-stats'),

]