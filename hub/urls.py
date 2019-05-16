from django.urls import path

from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('diagnostics', views.diagnostics, name='diagnostics'),
    path('drivers', views.drivers, name='drivers'),
    path('jobs', views.jobs, name="jobs")
]