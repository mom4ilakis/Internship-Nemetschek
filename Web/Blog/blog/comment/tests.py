import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User

from datetime import datetime
from author.models import Author
from post.models import Post
from comment.models import Comment


@pytest.fixture
def anon_client():
    return APIClient()


@pytest.fixture
def comment(post, author):
    comment = Comment(author=author, post=post, content='comment')
    comment.save()
    return comment


@pytest.mark.django_db
def test_get_no_comment(client):
    result = client.get('/comments/1/')
    assert result.status_code == 404


@pytest.mark.django_db
def test_make_comment(client, post):
    result = client.post('/comments/', {
        'post': post.pk,
        'content': 'new content',
    })
    assert result.status_code == 201
    del result.data['date']
    assert result.data == {
        'post': post.pk,
        'content': 'new content',
        'author': {
            'username': post.author.username,
            'email': post.author.email,
        },
    }


@pytest.mark.django_db
def test_get_comment(client, comment):
    result = client.get(f'/comments/{comment.pk}/')
    assert result.status_code == 200
    del result.data['date']
    assert result.data == {
        'content': comment.content,
        'post': comment.post.pk,
        'author': {
            'username': comment.post.author.username,
            'email': comment.post.author.email,
        },
    }


@pytest.mark.django_db
def test_post_comment_no_auth(post, anon_client):
    result = anon_client.post('/comments/', {
        'post': post.pk,
        'content': 'new content',
    })
    assert result.status_code == 401


@pytest.mark.django_db
def test_post_comment_no_author(post, client):
    result = client.post('/comments/', {
        'post': post.pk,
        'content': 'new content',
    })
    assert result.status_code == 201


@pytest.mark.django_db
def test_post_comment_no_post(client):
    result = client.post('/comments/', {
        'content': 'new content'
    })
    assert result.status_code == 400
    