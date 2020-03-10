from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'avatar', 'first_name', 'last_name', 'is_author']


class UsernameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']
