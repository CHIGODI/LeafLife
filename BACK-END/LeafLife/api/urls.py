#!/usr/bin/env python
from django.urls import path
from .views.users import UserListCreate, UserDetail
from .views.gardens import GardenListCreate, GardenDetail
from .views.beds import BedListCreate,  BedDetail

urlpatterns = [
    path('users/', UserListCreate.as_view(), name='user-list-create'),
    path('users/<str:id>/', UserDetail.as_view(), name='user-detail'),
    path('users/<str:id>/gardens/', GardenListCreate.as_view(), name='gardens-list-create'),
    path('users/<str:id>/gardens/<str:garden_id>/', GardenDetail.as_view(), name='gardens-detail'),
    # path('users/<uuid:user_id>/gardens/<uuid:garden_id>/beds', BedListCreate.as_view(), name='bed-list-create'),
    path('bed/<int:id>/', BedDetail.as_view(), name='bed-detail'),
    path('beds/', BedListCreate.as_view(), name='bed-list-create'),
    # path('beds/<int:id>/', BedDetail.as_view(), name='bed-detail'),
    # path('beds/<int:id>/crops/', BedDetail.as_view(), name='bed-crops'),
    
]