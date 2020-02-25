from rest_framework.routers import SimpleRouter

from .views import AuthorViewSet

router = SimpleRouter()
router.register('authors', AuthorViewSet)

urlpatterns = router.urls
