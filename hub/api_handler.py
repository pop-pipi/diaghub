from . import models
from . import demo_data
import json
import time
import datetime

def get_demo_data():
    return demo_data.get_demo_data()

# Re-runs 3 minute sample data loop, returns updated location in dict
def simulate_get_driver_demo_location(driver_id):
    jsondata = json.loads(get_demo_data())
    epoch_time = int(time.time())
    time_simulation = epoch_time%180
    sim_end_lat = 0
    sim_end_lng = 0

    # Retrieve location for driver and load sample end_lat/end_lng
    # indicating position after three minutes of driving and following
    # the route (All data follows a straight route for simplicity).
    if (driver_id=='1'):
        sim_start_lat=jsondata['drivers'][0]['lat']
        sim_start_lng=jsondata['drivers'][0]['lng']
        sim_end_lat=-37.8056013
        sim_end_lng=144.9589849

    elif (driver_id=='2'):
        sim_start_lat=jsondata['drivers'][1]['lat']
        sim_start_lng=jsondata['drivers'][1]['lng']
        sim_end_lat=-37.7521037
        sim_end_lng=144.936368

    elif (driver_id=='3'):
        sim_start_lat=jsondata['drivers'][2]['lat']
        sim_start_lng=jsondata['drivers'][2]['lng']
        sim_end_lat=-37.7177046
        sim_end_lng=144.9480767

    elif (driver_id=='4'):
        sim_start_lat=jsondata['drivers'][3]['lat']
        sim_start_lng=jsondata['drivers'][3]['lng']
        sim_end_lat=-37.7670368
        sim_end_lng=144.9620889

    elif (driver_id=='5'):
        sim_start_lat=jsondata['drivers'][4]['lat']
        sim_start_lng=jsondata['drivers'][4]['lng']
        sim_end_lat=-37.7628538
        sim_end_lng=144.8309902

    else:
        return

    # get new lat/lng by rate of change of lat/lng per second
    new_lat=(((sim_end_lat-sim_start_lat)/180)*time_simulation)+sim_start_lat
    new_lng=(((sim_end_lng-sim_start_lng)/180)*time_simulation)+sim_start_lng

    json_data = {
        "lat":format(new_lat, '.6f'),
        "lng":format(new_lng, '.6f')
        #"lat":new_lat,
        #"lng":new_lng
    }
    return json_data
        

def refresh_db():
    jsondata = json.loads(get_demo_data())
    drivers = models.Driver.objects.all()
    jobs = models.Job.objects.all()
    vehicles = models.Vehicle.objects.all()
    cargo = models.Cargo.objects.all()
    
    for driver in jsondata['drivers']:
        if driver['id'] not in [i.id for i in drivers]:
            models.Driver.objects.create(id=driver['id'], lat=driver['lat'], lng=driver['lng'])
    
    for job in jsondata['jobs']:
        if job['id'] not in [i.id for i in jobs]:
            models.Job.objects.create(id=job['id'], driver=models.Driver.objects.get(pk=job['driver_id']),
                status=job['status'], eTA=datetime.datetime.fromtimestamp(int(job['ETA'])).isoformat(), 
                origin_lat=job['origin_lat'], origin_lng=job['origin_lng'], 
                end_lat=job['end_lat'], end_lng=job['end_lng'], end_date=datetime.datetime.fromtimestamp(int(job['end_date'])).isoformat())

    for vehicle in jsondata['vehicles']:
        if vehicle['id'] not in [i.id for i in vehicles]:
            models.Vehicle.objects.create(id=vehicle['id'], driver=models.Driver.objects.get(pk=vehicle['driver_id']),
                vehicle_class=vehicle['vehicle_class'], capacity=vehicle['capacity'], registration_no=vehicle['registration_no'])

    for obj in jsondata['cargo']:
        if obj['id'] not in [i.id for i in cargo]:
            models.Cargo.objects.create(id=obj['id'], description=obj['description'],fragility=obj['fragility'], weight=obj['weight'])