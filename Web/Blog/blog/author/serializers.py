from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Author


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('username', 'email', 'avatar', 'first_name', 'last_name')
