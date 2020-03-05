from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet, GenericViewSet, mixins
from rest_framework.response import Response

from blog_app.permissions import IsOwnerOrReadOnly
from .serializers import PostSerializer, PostPreviewSerializer
from .models import Post
from comment.serializers import CommentSerializer


class PostViewSet(ModelViewSet):
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class PostPreviewSet(ReadOnlyModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostPreviewSerializer


class CommentsOnPostViewSet(mixins.RetrieveModelMixin, GenericViewSet):
    queryset = Post.objects.all()

    def retrieve(self, request, *args, **kwargs):
        post = self.get_object()
        serializer = CommentSerializer(post.comments, many=True)
        return Response(serializer.data)
