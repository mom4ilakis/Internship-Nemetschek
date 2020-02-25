from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from django.contrib.auth.models import User
from datetime import date

from .serializers import CommentSerializer
from .models import Comment


class CommentViewSet(viewsets.ModelViewSet):
    permission_class = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user, date=date.today())
