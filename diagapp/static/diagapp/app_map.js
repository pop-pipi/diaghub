function initMap() {
    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    markers = [];
    polylines = [];
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

    driver_id = 6;
    job_id = 6;

    addDriverMarkerShowRoute()


    setInterval(function() {
        updateDriverMarkerLocation();
    }, 1000); 
}

function addDriverMarkerShowRoute(){
    deleteMarkers();

    driver['id'] = driver_id;
    var url = "http://127.0.0.1:8000/api/iot-get-location/";

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

        driver['lat'] = data['lat'];
        driver['lng'] = data['lng'];

        var icon = {
            url: "/static/hub/truck_icon.png",
            scaledSize: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0,0),
            anchor: new google.maps.Point(25, 50)
        };

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(driver['lat'], driver['lng']),
            map: map,
            icon: icon,
            duration: 1000
        });

        markers.push(marker);

        google.maps.event.addListener(marker, 'click', (function(marker) {
            var description = "Driver ID: ".concat(driver_id)
            return function() {
                map_infowindow.setContent(description);
                map_infowindow.open(map, marker);
            }
        })(marker));

        showRoute(job_id);

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
        var start = new google.maps.LatLng(driver['lat'], driver['lng']);
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

function updateDriverMarkerLocation() {
    var url = "http://127.0.0.1:8000/api/iot-get-location/";

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
        driver['lat'] = data['lat'];
        driver['lng'] = data['lng'];
        markers[0].setPosition(new google.maps.LatLng(driver['lat'], driver['lng']));
    })
    .catch(function (err) {
        console.log(err);
    })
}

function updateDetails(driver_id, job_id){
    var url = "http://127.0.0.1:8000/api/jobs/?id="+job_id;
    $("#job-title-id").html("JOB ID: "+job_id)
    $("#job-table-driver-id").html(driver_id);

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
        var job = data['results'][0];

        updateJobETA(job_id);
        $("#job-table-contract-end-date").html(job['end_date']);
        updateVehicleDetails(driver_id);
        updateCargoDetails(driver_id);

        switch(job['max_shock_value']) {

            case 1:
                btn_class = 'container btn btn-outline-danger';
                shock_level = "Extreme Shock";
                shock_rating = ">1000 Hz";
                break;
            case 2:
                btn_class = 'container btn btn-danger';
                shock_level = "High Impact Shock";
                shock_rating = "<250 Hz";
                break;
            case 3:
                btn_class = 'container btn btn-warning';
                shock_level = "General Shock";
                shock_rating = "<100Hz";
                break;
            case 4:
                btn_class = 'container btn btn-success';
                shock_level = "General Vibration";
                shock_rating = "~5 Hz";
                break;
            default:
                btn_class = 'container btn btn-success';
                shock_level = "General Vibration";
                shock_rating = "~5 Hz";
        }

        $("#trip-button").attr("class", btn_class);
        $("#trip-shock-level").html(shock_level);
        $("#trip-shock-rating").html(shock_rating);


    })
    .catch(function (err) {
        console.log(err);
    })

}

function updateJobETA(job_id){
    var url = "http://127.0.0.1:8000/api/demo-get-eta/"+job_id;

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
        var eta = data['text'];
        $("#job-table-eta").html(eta);

    })
    .catch(function (err) {
        console.log(err);
    })
}

function updateVehicleDetails(driver_id){
    var url = "http://127.0.0.1:8000/api/vehicles/?id="+driver_id;

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
        var vehicle = data['results'][0];

        $("#vehicle-table-registration").html(vehicle['registration_no']);
        $("#vehicle-table-class").html(vehicle['vehicle_class']);
        $("#vehicle-table-capacity").html(vehicle['capacity']+" kg");

    })
    .catch(function (err) {
        console.log(err);
    })
}

function showTrip(job_id){

    for (i=0;i<polylines.length;i++) {
        polylines[i].setMap(null);
    }
    polylines=[];


    var url = "http://127.0.0.1:8000/api/demo-get-trip/"+job_id;

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

function updateCargoDetails(driver_id){
    var url = "http://127.0.0.1:8000/api/cargo/?id="+driver_id;

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
        var cargo = data['results'][0];

        $("#cargo-table-description").html(cargo['description']);
        $("#cargo-table-fragility").html(cargo['fragility']);
        $("#cargo-table-weight").html(cargo['weight']+" kg");

    })
    .catch(function (err) {
        console.log(err);
    })
}

$('#active-jobs-table tr').on('click', function () {
    var job_id = $(this).find("a").attr("href");
    var driver_id = $(this).find("a:nth-child(1)").attr("href");
    addDriverMarkerShowRoute(driver_id, job_id)
    showTrip(job_id);
    setTimeout(topFunction, 150); 
    updateDetails(driver_id, job_id);
});