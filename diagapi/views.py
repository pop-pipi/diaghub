from hub.models import Driver, Vehicle, Cargo, Job
from rest_framework import viewsets
from hub import api_handler
from .serializers import DriverSerializer, VehicleSerializer, CargoSerializer, JobSerializer, LocationSerializer
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from . import maps

class DriverList(generics.ListAPIView):
    """
    API endpoint that allows drivers to be viewed
    """
    serializer_class = DriverSerializer

    def get_queryset(self):
        queryset = Driver.objects.all()
        driver = self.request.query_params.get('id')
        if driver is not None:
            queryset = queryset.filter(pk=driver)
        return queryset

class VehicleList(generics.ListAPIView):
    """
    API endpoint that allows drivers to be viewed
    """
    serializer_class = VehicleSerializer

    def get_queryset(self):
        queryset = Vehicle.objects.all()
        vehicle = self.request.query_params.get('id')
        if vehicle is not None:
            queryset = queryset.filter(pk=vehicle)
        return queryset

class CargoList(generics.ListAPIView):
    """
    API endpoint that allows drivers to be viewed
    """
    serializer_class = CargoSerializer

    def get_queryset(self):
        queryset = Cargo.objects.all()
        cargo = self.request.query_params.get('id')
        if cargo is not None:
            queryset = queryset.filter(pk=cargo)
        return queryset

class JobList(generics.ListAPIView):
    """
    API endpoint that allows jobs to be viewed
    """
    serializer_class = JobSerializer

    def get_queryset(self):
        queryset = Job.objects.all()
        job = self.request.query_params.get('id')
        if job is not None:
            queryset = queryset.filter(pk=job)
        return queryset

class DemoLocationUpdateView(APIView):
    def get(self, request, driver_id):
        """
        API endpoint that returns updated demo location of driver
        """
        serializer_class = LocationSerializer(data=api_handler.simulate_get_driver_demo_location(driver_id))
        serializer_class.is_valid(True)
        return Response(data=serializer_class.data)

class IOTLocationUpdateView(APIView):
    def get(self, request):
        """
        API endpoint that returns updated IOT location of unit
        """
        data=api_handler.get_iot_data()
        return Response(data)

class DemoGetETA(APIView):
    def get(self, request, job_id):
        """
        Returns ETA to goal for a given job
        """
        job = Job.objects.get(pk=job_id)
        serializer_class = LocationSerializer(data=api_handler.simulate_get_driver_demo_location(str(job.driver.id)))
        serializer_class.is_valid(True)
        origin = serializer_class.data
        
        destination = {
            "lat" : job.end_lat,
            "lng" : job.end_lng
        }
        return Response(maps.get_ETA(origin, destination))

class DemoGetTrip(APIView):
    def get(self, request, job_id):
        """
        Returns Route dict to goal for a given job with shock values
        """
        job = Job.objects.get(pk=job_id)
        serializer_class = LocationSerializer(data=api_handler.simulate_get_driver_demo_location(str(job.driver.id)))
        serializer_class.is_valid(True)
        destination = serializer_class.data
        
        origin = {
            "lat" : job.origin_lat,
            "lng" : job.origin_lng
        }

        trip = maps.get_Route(origin, destination)
        steps = trip[0]['legs'][0]['steps']
        for step in steps:
            step['shock_value'] = 4
        
        # Filling in demo values for shock experienced
        if(job_id=="2"):
            trip[0]['legs'][0]['steps'][4]['shock_value'] = 3
        elif(job_id=="3"):
            trip[0]['legs'][0]['steps'][4]['shock_value'] = 3
        elif(job_id=="4"):
            trip[0]['legs'][0]['steps'][4]['shock_value'] = 3
        elif(job_id=="5"):
            trip[0]['legs'][0]['steps'][3]['shock_value'] = 2

        max_shock_value = 5
        for step in steps:
            if(step['shock_value'] < max_shock_value):
                max_shock_value=step['shock_value']
        job.max_shock_value = max_shock_value
        job.save()
        return Response(trip)