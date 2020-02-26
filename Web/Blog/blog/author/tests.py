import pytest
from datetime import date
from rest_framework.test import APIClient
from django.contrib.auth.models import User

from author.models import Author


@pytest.fixture
def client():
    return APIClient()


@pytest.fixture
def author():
    author = Author(username='author', password='123456', avatar='avtr')
    author.save()
    return author


@pytest.mark.django_db
def test_author_creation(client):
    result = client.post('/authors/', {
        'username': 'user',
        'password': '1235456',
        'avatar': 'path_to_avatar'
    })
    assert result.status_code == 201


@pytest.mark.django_db
def test_author_retrieve(client, author):
    result = client.get(f'/authors/{author.pk}/')
    assert result.status_code == 200
    assert result.data == {
        'username': author.username,
        'avatar': author.avatar,
        'email': author.email
    }
