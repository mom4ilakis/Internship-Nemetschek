import pytest
import os

from rest_framework.test import APIClient

@pytest.fixture
def anon_client():
    return APIClient()


def test_no_posts(anon_client):
    result = anon_client.get('/posts/')

    assert result['data'] == []