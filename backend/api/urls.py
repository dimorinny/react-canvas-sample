from django.conf.urls import url

from .views import CircleView

urlpatterns = [
    url(r'^circle/', CircleView.as_view(), name='circle'),
]
