from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from django.contrib.auth.models import User

from .serializers import CommentSerializer
from .models import Comment


class CommentViewSet(viewsets.ModelViewSet):
    permission_class = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        senderUsername = self.request.data.get('username', None)

        if senderUsername:
            senderId = User.objects.get(username=senderUsername)
        if senderId:
            user = User.objects.get(pk=senderId)
            serializer.save(user=user)
