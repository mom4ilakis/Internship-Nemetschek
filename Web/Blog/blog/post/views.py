
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import SAFE_METHODS
from rest_framework.response import Response
from datetime import date
from django import http

from blog_app.permissions import IsOwnerOrReadOnly
from .serializers import PostSerializer
from .models import Post
from author.models import Author


class PostViewSet(ModelViewSet):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
