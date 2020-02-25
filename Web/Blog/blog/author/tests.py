import pytest
from datetime import date
from rest_framework.test import APIClient
from django.contrib.auth.models import User

from author.models import Author


@pytest.fixture
def client():
    return APIClient()

@pytest.fixture
def user():
    user = User(password='123456', username='user')
    user.save()
    return user


@pytest.fixture
def author():
    author = Author(username='author', password='123456', avatar='avtr')
    author.save()
    return author


@pytest.mark.django_db
def test_user_creation(user, client):
    result = client.post('/authors/', {
        'username': user.username,
        'password': user.password,

    })
    assert result.status_code == 201
