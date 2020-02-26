from rest_framework import serializers
from .models import Comment

from author.serializers import UserSerializer


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['author', 'content', 'date', 'post']
        read_only_fields = ['date', 'author']
        model = Comment

    author = UserSerializer(read_only=True, required=False)
