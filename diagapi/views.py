from hub.models import Driver, Job
from rest_framework import viewsets
from hub import api_handler
from .serializers import DriverSerializer, JobSerializer, LocationSerializer
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView
from . import maps

class DriverList(generics.ListAPIView):
    """
    API endpoint that allows drivers to be viewed or edited.
    """
    serializer_class = DriverSerializer

    def get_queryset(self):
        """
        API endpoint that allows jobs to be viewed
        """
        queryset = Driver.objects.all()
        driver = self.request.query_params.get('id')
        if driver is not None:
            queryset = queryset.filter(pk=driver)
        return queryset

class JobList(generics.ListAPIView):
    serializer_class = JobSerializer

    def get_queryset(self):
        """
        API endpoint that allows jobs to be viewed
        """
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