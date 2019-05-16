function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    markers = [];
    polylines = [];
    drivers = [];
    driver = {
        'id':'',
        'lat':'',
        'lng':''
    };
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
    showTrip([1,2,3,4,5]);

    setInterval(function() {
        for (i=1; i <= drivers.length; i++){
            updateDriverMarkerLocation(i);
        }
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

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

function deleteMarkers() {
    clearMarkers();
    markers = [];
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

function showTrip(job_ids){

    for (i=0;i<polylines.length;i++) {
        polylines[i].setMap(null);
    }
    polylines=[];

    for (i=0;i<job_ids.length;i++) {
        var url = "http://127.0.0.1:8000/api/demo-get-trip/"+job_ids[i];

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

            var steps = data[0].legs[0].steps;
            var polyline = new google.maps.Polyline({
                path: [],
                strokeWeight: 3
            });
            for (i=0;i<steps.length;i++) {
                var line_colour;
                switch(steps[i].shock_value) {

                    case 1:
                        line_colour = '#FF0000';
                        break;
                    case 2:
                        line_colour = '#a02020';
                        break;
                    case 3:
                        line_colour = '#eab146';
                        break;
                    case 4:
                        line_colour = '#3ea542';
                        break;
                    default:
                        line_colour = '#3ea542';
                }
                polyline.setOptions({strokeColor: line_colour});
                var nextset = steps[i].polyline.points;
                var nextlatlngset = google.maps.geometry.encoding.decodePath(nextset);
                for (j=0;j<nextlatlngset.length;j++) {
                    polyline.getPath().push(nextlatlngset[j]);
                }
                if(i+1==steps.length) {
                    polylines.push(polyline);
                    break;
                }
                if(steps[i].shock_value!=steps[i+1].shock_value){
                    polylines.push(polyline);
                    polyline = new google.maps.Polyline({
                        path: [],
                        strokeWeight: 3
                    });
                }
            }

            for (i=0;i<polylines.length;i++) {
                    polylines[i].setMap(map);
                    console.log("")
            }
            

        })
        .catch(function (err) {
            console.log(err);
        })
    }
}