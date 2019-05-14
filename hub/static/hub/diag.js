// function initMap(drivers) {
//     var directionsService = new google.maps.DirectionsService();
//     var directionsDisplay = new google.maps.DirectionsRenderer();
//     var styledMapType = new google.maps.StyledMapType(
//         [
//             {
//                 "elementType": "geometry.fill",
//                 "stylers": [
//                 {
//                     "color": "#ffffff"
//                 }
//                 ]
//             },
//             {
//                 "elementType": "geometry.stroke",
//                 "stylers": [
//                 {
//                     "color": "#d3d3d3"
//                 }
//                 ]
//             },
//             {
//                 "elementType": "labels.icon",
//                 "stylers": [
//                 {
//                     "color": "#7c8b8b"
//                 },
//                 {
//                     "lightness": 15
//                 }
//                 ]
//             },
//             {
//                 "elementType": "labels.text.fill",
//                 "stylers": [
//                 {
//                     "color": "#555555"
//                 }
//                 ]
//             },
//             {
//                 "featureType": "landscape.natural",
//                 "elementType": "geometry.fill",
//                 "stylers": [
//                 {
//                     "color": "#ebebeb"
//                 }
//                 ]
//             },
//             {
//                 "featureType": "road.highway",
//                 "elementType": "geometry.fill",
//                 "stylers": [
//                 {
//                     "color": "#9d9d9d"
//                 }
//                 ]
//             },
//             {
//                 "featureType": "road.local",
//                 "elementType": "geometry.fill",
//                 "stylers": [
//                 {
//                     "color": "#ffffff"
//                 }
//                 ]
//             },
//             {
//                 "featureType": "water",
//                 "elementType": "geometry.fill",
//                 "stylers": [
//                 {
//                     "color": "#B1D2F8"
//                 }
//                 ]
//             }
//         ],
//     {name: 'Styled Map'}
//     );

//     var map = new google.maps.Map(document.getElementById('map'), {
//         mapTypeControl: false
//     });

//     directionsDisplay.setMap(map);

//     //create empty LatLngBounds object
//     var bounds = new google.maps.LatLngBounds();
//     var infowindow = new google.maps.InfoWindow();    

//     var icon = {
//         url: "{% static 'hub/truck_icon.png' %}",
//         scaledSize: new google.maps.Size(50, 50),
//         origin: new google.maps.Point(0,0),
//         anchor: new google.maps.Point(0, 0)
//     };

//     for (i = 0; i < drivers.length; i++) {  
//         var marker = new google.maps.Marker({
//             position: new google.maps.LatLng(drivers[i][0], drivers[i][1]),
//             map: map,
//             icon: icon
//         });

//         //extend the bounds to include each marker's position
//         bounds.extend(marker.position);

//         google.maps.event.addListener(marker, 'click', (function(marker, i) {
//             var description = "Driver ID: ".concat(drivers[i][2])
//             return function() {
//                 infowindow.setContent(description);
//                 infowindow.open(map, marker);
//             }
//         })(marker, i));
//     }

//     //now fit the map to the newly inclusive bounds
//     map.fitBounds(bounds);
//     map.mapTypes.set('styled_map', styledMapType);
//     map.setMapTypeId('styled_map');
// }

// function calcRoute(start_lat, start_lng, end_lat, end_lng) {
//     var start = new google.maps.LatLng(start_lat, start_lng);
//     var end = new google.maps.LatLng(end_lat, end_lng);
//     var request = {
//       origin: start,
//       destination: end,
//       travelMode: 'DRIVING'
//     };
//     map.directionsService.route(request, function(result, status) {
//       if (status == 'OK') {
//         map.directionsDisplay.setDirections(result);
//       }
//     });
// }