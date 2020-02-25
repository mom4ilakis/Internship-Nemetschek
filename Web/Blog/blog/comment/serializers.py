from rest_framework import serializers
from .models import Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('author', 'content', 'date', 'post')
        model = Comment
