from django.shortcuts import render
from hub.models import Driver, Vehicle, Cargo, Job
import time
import datetime

def index(request):
    data = {
        'user_exists': False
    }
    try:
        Driver.objects.get(pk=6)
        data['user_exists'] = True
    except:
        print("User not yet signed up")
    return render(request, 'diagapp/index.html',data)

def signup(request):
    driver_obj = Driver(pk=6,lat='-37.836636',lng='144.884661',name="IOT")
    job_obj = Job(pk=6, origin_lat = '-37.836636', origin_lng = '144.884661', end_lat = '-37.853362', end_lng = '145.021330', 
    eTA = datetime.datetime.fromtimestamp(1557482245).isoformat(), end_date = datetime.datetime.fromtimestamp(1558105200).isoformat(),
    status = "On Route", driver=driver_obj,max_shock_value=5)
    vehicle_obj = Vehicle(pk=6,driver=driver_obj, vehicle_class="Light Rigid", capacity="5000", registration_no="TJN194")
    cargo_obj = Cargo(pk=6, description="Bananas", fragility=3, weight=500)
    driver_obj.save()
    job_obj.save()
    vehicle_obj.save()
    cargo_obj.save()
    data = {
        'user_exists': True
    }
    return render(request, 'diagapp/index.html',data)