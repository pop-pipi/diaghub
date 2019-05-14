from django.db import models

class Driver(models.Model):
    lat = models.DecimalField(max_digits=9, decimal_places=6)
    lng = models.DecimalField(max_digits=9, decimal_places=6)
    name = models.CharField(max_length=40)

class Job(models.Model):
    origin_lat = models.DecimalField(max_digits=9, decimal_places=6)
    origin_lng = models.DecimalField(max_digits=9, decimal_places=6)
    end_lat = models.DecimalField(max_digits=9, decimal_places=6)
    end_lng = models.DecimalField(max_digits=9, decimal_places=6)
    status = models.CharField(max_length=20)
    eTA = models.DateTimeField()
    driver = models.ForeignKey(Driver, on_delete=models.PROTECT)

class Vehicle(models.Model):
    registration_no = models.CharField(max_length=6)
    vehicle_class = models.CharField(max_length=40)
    capacity = models.IntegerField()
    driver = models.ForeignKey(Driver, on_delete=models.PROTECT)
