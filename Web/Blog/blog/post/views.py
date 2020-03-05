from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet

from blog_app.permissions import IsOwnerOrReadOnly
from .serializers import PostSerializer, PostPreviewSerializer
from .models import Post


class PostViewSet(ModelViewSet):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostPreviewSet(ReadOnlyModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostPreviewSerializer
