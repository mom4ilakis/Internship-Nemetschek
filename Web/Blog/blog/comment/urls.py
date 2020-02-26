from rest_framework.routers import SimpleRouter
from .views import CommentViewSet, ReplyViewSet

router = SimpleRouter()
router.register('comments', CommentViewSet)
router.register('replies', ReplyViewSet)
urlpatterns = router.urls
