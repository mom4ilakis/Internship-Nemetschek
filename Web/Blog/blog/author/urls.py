from rest_framework.routers import SimpleRouter

from .views import UserViewSet

router = SimpleRouter()
router.register('authors', UserViewSet)

urlpatterns = router.urls
