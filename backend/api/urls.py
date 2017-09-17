from django.conf.urls import url, include

from api.views import CircleView

urlpatterns = [
    url(r'^circle/', CircleView.as_view()),
]
