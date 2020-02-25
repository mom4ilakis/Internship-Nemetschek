from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ['author', 'content', 'date', 'post']
        read_only_fields = ['date', 'author']
        model = Comment
