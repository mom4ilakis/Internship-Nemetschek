from rest_framework import serializers
from .models import Comment, Reply

from author.serializers import UserSerializer


class ReplySerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True, required=False)

    class Meta:
        fields = ['author', 'content', 'date', 'comment']
        read_only_fields = ['date', 'author']
        model = Reply


class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True, required=False)
    replies = ReplySerializer(read_only=True, many=True)

    class Meta:
        fields = ['author', 'content', 'date', 'post', 'replies']
        read_only_fields = ['date', 'author', 'replies']
        model = Comment


