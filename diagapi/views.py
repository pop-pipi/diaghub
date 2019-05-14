from hub.models import Driver, Job
from rest_framework import viewsets
from hub import api_handler
from .serializers import DriverSerializer, JobSerializer, LocationSerializer
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.views import APIView

class DriverViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows drivers to be viewed or edited.
    """
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer

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