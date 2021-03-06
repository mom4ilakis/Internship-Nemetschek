from django.shortcuts import render
from rest_framework import viewsets

from blog_app.permissions import CommentPermission
from .serializers import CommentSerializer, ReplySerializer
from .models import Comment, Reply


class CommentViewSet(viewsets.ModelViewSet):
    permission_classes = [CommentPermission]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ReplyViewSet(viewsets.ModelViewSet):
    permission_classes = [CommentPermission]
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
