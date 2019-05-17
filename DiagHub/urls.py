from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('', include('hub.urls')),
    path('admin/', admin.site.urls),
    path('api/', include('diagapi.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('app/', include('diagapp.urls'))
]
