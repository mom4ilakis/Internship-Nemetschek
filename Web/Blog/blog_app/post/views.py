from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from blog_app.permissions import IsOwnerOrReadOnly
from .serializers import PostSerializer
from .models import Post
from author.models import Author


class PostViewSet(ModelViewSet):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        senderUsername = self.request.data.get('username', None)

        if senderUsername:
            senderID = Author.objects.get(username=senderUsername)
        if senderID:
            author = Author.objects.get(pk=senderID)
            serializer.save(author=author)
        