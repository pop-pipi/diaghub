from django.shortcuts import render
from . import api_handler
from . import models
import requests
import json

def dashboard(request):
    api_handler.refresh_db()
    drivers = models.Driver.objects.all()
    jobs = models.Job.objects.all()
    data = {
        'drivers': drivers,
        'jobs': jobs
    }
    return render(request, 'hub/dashboard.html', data)

def drivers(request):
    api_handler.refresh_db()
    drivers = models.Driver.objects.all()
    vehicles = models.Vehicle.objects.all()
    jobs = models.Job.objects.all()
    data = {
        'drivers': drivers,
        'vehicles': vehicles,
        'jobs': jobs
    }
    return render(request, 'hub/drivers.html', data)

def jobs(request):
    api_handler.refresh_db()
    drivers = models.Driver.objects.all()
    vehicles = models.Vehicle.objects.all()
    jobs = models.Job.objects.all()
    data = {
        'drivers': drivers,
        'vehicles': vehicles,
        'jobs': jobs
    }
    return render(request, 'hub/jobs.html', data)
