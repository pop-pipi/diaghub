function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    markers = [];
    drivers = [];
    styledMapType = new google.maps.StyledMapType(
        [
            {
                "elementType": "geometry.fill",
                "stylers": [
                {
                    "color": "#ffffff"
                }
                ]
            },
            {
                "elementType": "geometry.stroke",
                "stylers": [
                {
                    "color": "#d3d3d3"
                }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                {
                    "color": "#7c8b8b"
                },
                {
                    "lightness": 15
                }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#555555"
                }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [
                {
                    "color": "#ebebeb"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                {
                    "color": "#9d9d9d"
                }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry.fill",
                "stylers": [
                {
                    "color": "#ffffff"
                }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                {
                    "color": "#B1D2F8"
                }
                ]
            }
        ],
        {name: 'Styled Map'}
    );

    map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControl: false
    });

    directionsDisplay.setMap(map);

    //create empty LatLngBounds object
    map_bounds = new google.maps.LatLngBounds();
    map_infowindow = new google.maps.InfoWindow();

    addDriverMarkers();

    setInterval(function() {
        for (i=1; i <= drivers.length; i++){
            updateDriverMarkerLocation(i);
        }
        updateJobTableETA();
    }, 1000); 
}

function addDriverMarkers(){
    var url = "http://127.0.0.1:8000/api/drivers";

    fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        headers:{
            'Content-Type': 'application/json',
            "Accept": 'application/json',
        }
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        for (i = 0; i < data['results'].length; i++) {  
            drivers.push([data['results'][i]['lat'],data['results'][i]['lng'],(i+1)]);
        }

        var icon = {
            url: "/static/hub/truck_icon.png",
            scaledSize: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0,0),
            anchor: new google.maps.Point(25, 50)
        };

        for (i = 0; i < drivers.length; i++) {  
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(drivers[i][0], drivers[i][1]),
                map: map,
                icon: icon,
                duration: 1000
            });
            updateDriverMarkerLocation(i+1);

            markers.push(marker);

            //extend the bounds to include each marker's position
            map_bounds.extend(marker.position);

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                var description = "Driver ID: ".concat(drivers[i][2])
                return function() {
                    map_infowindow.setContent(description);
                    map_infowindow.open(map, marker);
                }
            })(marker, i));
        }

        //now fit the map to the newly inclusive bounds
        map.fitBounds(map_bounds);
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
    })
    .catch(function (err) {
        console.log(err);
    })
}

function showRoute(job_id) {
    var url = "http://127.0.0.1:8000/api/jobs/?id="+job_id;

    fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        headers:{
            'Content-Type': 'application/json',
            "Accept": 'application/json',
        }
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var jsondata = data['results'][0];
        var driver_id = Number(jsondata['driver']['id']);
        var start = new google.maps.LatLng(markers[driver_id-1].getPosition().lat(), markers[driver_id-1].getPosition().lng());
        var end = new google.maps.LatLng(jsondata['end_lat'], jsondata['end_lng']);
        var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
        };
        directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            directionsDisplay.setOptions({suppressMarkers: true});
            directionsDisplay.setDirections(result);
        }
        });
    })
    .catch(function (err) {
        console.log(err);
    })
}

function updateDriverMarkerLocation(driver_id) {
    var url = "http://127.0.0.1:8000/api/demo-location-update/"+driver_id;

    fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        headers:{
            'Content-Type': 'application/json',
            "Accept": 'application/json',
        }
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        markers[driver_id-1].setPosition(new google.maps.LatLng(data['lat'], data['lng']));
    })
    .catch(function (err) {
        console.log(err);
    })
}

function updateJobTableETA(){
    $('#active-jobs tr').find("a")
}

function displayTripData(data, driver_id){
    document.getElementById("active-display-data").innerHTML = data['lat'];
}

$('#active-jobs tr').on('click', function () {
    var job_id = $(this).find("a").attr("href");
    showRoute(job_id);
    setTimeout(topFunction, 150); 
});