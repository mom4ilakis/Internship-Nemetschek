from .models import Post
from rest_framework import serializers

from author.serializers import AuthorSerializer, UsernameSerializer


class PostSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True, required=False)

    class Meta:
        model = Post
        fields = ['title', 'content', 'author', 'cover', 'date']
        read_only_fields = ['date', 'author',]


class PostPreviewSerializer(serializers.ModelSerializer):
    author = UsernameSerializer(read_only=True, required=False)

    class Meta:
        model = Post
        fields = ['title', 'author', 'cover', 'date', 'id']
        read_only_fields = ['title', 'author', 'cover', 'date', 'id']
