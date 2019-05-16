from hub.models import Driver, Job
from rest_framework import serializers

class DriverSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Driver
        fields = ('id','lat','lng')


class JobSerializer(serializers.HyperlinkedModelSerializer):
    driver = DriverSerializer(required=False)
    
    class Meta:
        model = Job
        fields = ('origin_lat', 'origin_lng','end_lat','end_lng','status','eTA','driver')

class LocationSerializer(serializers.Serializer):
    lat = serializers.DecimalField(max_digits=9, decimal_places=6)
    lng = serializers.DecimalField(max_digits=9, decimal_places=6)