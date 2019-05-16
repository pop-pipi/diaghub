from django.contrib import admin
from hub.models import Job, Driver, Vehicle, Cargo

# Register your models here.
admin.site.register(Job)
admin.site.register(Driver)
admin.site.register(Vehicle)
admin.site.register(Cargo)