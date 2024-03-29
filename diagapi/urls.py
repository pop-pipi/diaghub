from django.urls import include, path
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^jobs/$',views.JobList.as_view()),
    url(r'^drivers/$',views.DriverList.as_view()),
    url(r'^vehicles/$',views.VehicleList.as_view()),
    url(r'^cargo/$',views.CargoList.as_view()),
    url(r'^demo-location-update/(?P<driver_id>\d+)/$', views.DemoLocationUpdateView.as_view()),
    url(r'^demo-get-eta/(?P<job_id>\d+)/$', views.DemoGetETA.as_view()),
    url(r'^demo-get-trip/(?P<job_id>\d+)/$', views.DemoGetTrip.as_view()),
    url(r'^iot-get-location/$', views.IOTLocationUpdateView.as_view()),
]