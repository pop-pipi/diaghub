from django.core import serializers
from . import models

class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Driver

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Job

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Vehicle
