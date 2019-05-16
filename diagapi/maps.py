import googlemaps
from datetime import datetime

gmaps = googlemaps.Client(key='AIzaSyDi35R0_kTAK-ENbDWN23sIYluArooLmDQ')

def get_ETA(origin, destination):
    distance = gmaps.distance_matrix(origin,destination,mode="driving",departure_time=datetime.now())
    return distance['rows'][0]['elements'][0]['duration_in_traffic']

def get_Route(origin, destination):
    route = gmaps.directions(origin,destination,mode="driving",departure_time=datetime.now())

    return route