from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Author


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('username', 'email', 'avatar')
