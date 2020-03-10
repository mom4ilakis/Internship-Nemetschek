import pytest
from rest_framework.test import APIClient

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
        'id': 1,
        'content': 'new content',
        'replies': [],
        'author': {
            'id': post.author.id,
            'avatar': post.author.avatar,
            'is_author': post.author.is_author,
            'username': post.author.username,
            'email': post.author.email,
            'first_name': post.author.first_name,
            'last_name': post.author.last_name,
        },
    }


@pytest.mark.django_db
def test_get_comment(client, comment):
    result = client.get(f'/comments/{comment.pk}/')
    assert result.status_code == 200
    del result.data['date']
    assert result.data == {
        'id': comment.id,
        'content': comment.content,
        'post': comment.post.pk,
        'replies': [],
        'author': {
            'id': comment.post.author.id,
            'avatar': comment.post.author.avatar,
            'is_author': comment.post.author.is_author,
            'username': comment.post.author.username,
            'email': comment.post.author.email,
            'first_name': comment.author.first_name,
            'last_name': comment.author.last_name,
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
    reply = Reply(
        author=replying_user,
        content='ala bala orange',
        comment=comment
    )
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
        'id': 1,
        'author': {
            'id': replying_user.id,
            'avatar': replying_user.avatar,
            'is_author': replying_user.is_author,
            'username': replying_user.username,
            'email': replying_user.email,
            'first_name': replying_user.first_name,
            'last_name': replying_user.last_name,
        },
        'comment': comment.pk
    }


@pytest.mark.django_db
def test_get_reply(reply, replying_client):
    result = replying_client.get(f'/replies/{reply.pk}/')

    assert result.status_code == 200
    del result.data['date']
    assert result.data == {
        'id': reply.id,
        'content': reply.content,
        'author': {
            'id': reply.author.id,
            'avatar': reply.author.avatar,
            'is_author': reply.author.is_author,
            'username': reply.author.username,
            'email': reply.author.email,
            'first_name': reply.author.first_name,
            'last_name': reply.author.last_name,
        },
        'comment': reply.comment.pk
    }


@pytest.mark.django_db
def test_get_non_existing_reply(replying_client):
    result = replying_client.get('/replies/999999999999/')
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
        'id': reply.id,
        'content': reply.content,
        'comment': reply.comment.pk,
        'author': {
            'id': reply.author.id,
            'avatar': reply.author.avatar,
            'is_author': reply.author.is_author,
            'username': reply.author.username,
            'email': reply.author.email,
            'first_name': reply.author.first_name,
            'last_name': reply.author.last_name,
        }
    }


@pytest.mark.django_db
def test_reply_on_non_existing_comment(replying_client):
    result = replying_client.post('/replies/', {
        'comment': 9999999999999999,
        'content': 'max'
    })
    assert result.status_code == 400


@pytest.mark.django_db
def test_change_reply(replying_client, reply):
    result = replying_client.patch(f'/replies/{reply.pk}/', {
        'content': 'new content'
    })
    assert result.status_code == 200
    del result.data['date']
    assert result.data == {
        'id': reply.id,
        'comment': reply.comment.pk,
        'content': 'new content',
        'author': {
            'id': reply.author.id,
            'avatar': reply.author.avatar,
            'is_author': reply.author.is_author,
            'username': reply.author.username,
            'email': reply.author.email,
            'first_name': reply.author.first_name,
            'last_name': reply.author.last_name,
        }
    }


@pytest.mark.django_db
def test_change_reply_wrong_user(reply, user_client):
    result = user_client.patch(f'/replies/{reply.pk}/', {
        'content': 'new content'
    })
    assert result.status_code == 403
