#!/usr/bin/env python
from django.urls import path
from .views.users import UserListCreate, UserDetail
from .views.beds import BedListCreate,  BedDetail

urlpatterns = [
    path('users/', UserListCreate.as_view(), name='user-list-create'),
    path('users/<int:id>/', UserDetail.as_view(), name='user-detail'),
    path('users/<int:id>/gardens/', UserDetail.as_view(), name='user-gardens'),
    path('users/<int:id>/gardens/<int:id>/', UserDetail.as_view(), name='user-garden'),
    path('users/<int:id>/gardens/<int:id>/beds/', UserDetail.as_view(), name='user-garden-beds'),
    path('users/<int:id>/gardens/<int:id>/beds/<int:id>/', UserDetail.as_view(), name='user-garden-bed'),
    path('beds/', BedListCreate.as_view(), name='bed-list-create'),
    path('beds/<int:id>/', BedDetail.as_view(), name='bed-detail'),
    path('beds/<int:id>/crops/', BedDetail.as_view(), name='bed-crops'),
    
]