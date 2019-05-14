from django.urls import include, path
from django.conf.urls import url
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'drivers', views.DriverViewSet)
# router.register(r'jobs', views.JobList)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    url(r'^jobs/$',views.JobList.as_view()),
    url(r'^demo-location-update/(?P<driver_id>\d+)/$', views.DemoLocationUpdateView.as_view()),
]