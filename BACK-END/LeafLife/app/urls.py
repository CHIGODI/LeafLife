#!/usr/bin/env python
from django.urls import path
from .views import UserListCreate, UserDetail

urlpatterns = [
    path('users/', UserListCreate.as_view(), name='user-list-create'),
    path('users/<int:id>/', UserDetail.as_view(), name='user-detail'),
]
