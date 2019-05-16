from hub.models import Driver, Vehicle, Cargo, Job
from rest_framework import serializers

class DriverSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Driver
        fields = ('id','lat','lng')

class VehicleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Vehicle
        fields = ('id','registration_no','vehicle_class','capacity')

class CargoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Cargo
        fields = ('id','description','fragility','weight')

class JobSerializer(serializers.HyperlinkedModelSerializer):
    driver = DriverSerializer(required=False)
    
    class Meta:
        model = Job
        fields = ('origin_lat', 'origin_lng','end_lat','end_lng','status','end_date','eTA','driver','max_shock_value')

class LocationSerializer(serializers.Serializer):
    lat = serializers.DecimalField(max_digits=9, decimal_places=6)
    lng = serializers.DecimalField(max_digits=9, decimal_places=6)