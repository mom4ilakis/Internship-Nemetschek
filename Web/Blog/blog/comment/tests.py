import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User

from comment.models import Comment, Reply


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


@pytest.fixture
def reply(comment, replying_user):
    reply = Reply(author=replying_user, content='ala bala orange',
                  comment=comment)
    reply.save()
    return reply


@pytest.mark.django_db
def test_make_reply(comment, replying_client, replying_user):
    result = replying_client.post('/replies/', {
        'comment': comment.pk,
        'content': 'mad',
    })
    assert result.status_code == 201
    del result.data['date']
    assert result.data == {
        'content': 'mad',
        'author': {
            'username': replying_user.username,
            'email': replying_user.email,
        },
        'comment': comment.pk
    }


@pytest.mark.django_db
def test_get_reply(reply, replying_client):
    result = replying_client.get(f'/replies/{reply.pk}/')

    assert result.status_code == 200
    del result.data['date']
    assert result.data == {
        'content': reply.content,
        'author': {
            'username': reply.author.username,
            'email': reply.author.email
        },
        'comment': reply.comment.pk
    }


@pytest.mark.django_db
def test_get_non_existing_reply(replying_client):
    result = replying_client.get('/replies/1/')
    assert result.status_code == 404


@pytest.mark.django_db
def test_make_reply_anon_user(comment, anon_client):
    result = anon_client.post('/replies/', {
        'content': 'no',
        'comment': comment.pk,
    })
    assert result.status_code == 401


@pytest.mark.django_db
def test_get_reply_anon_user(reply, anon_client):
    result = anon_client.get(f'/replies/{reply.pk}/')

    assert result.status_code == 200
    del result.data['date']
    assert result.data == {
        'content': reply.content,
        'comment': reply.comment.pk,
        'author': {
            'username': reply.author.username,
            'email': reply.author.email
        }
    }


@pytest.mark.django_db
def test_reply_non_existing_comment(replying_client):
    result = replying_client.post('/replies/', {
        'content': 'max'
    })
    assert result.status_code == 400
