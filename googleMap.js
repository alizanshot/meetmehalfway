/* global google */

var avgLatitude;
var avgLongitude;
var mapProp;
var request;
var service;
var markers = [];
var placeLoc;

function myMap() {
  let infoWindow;
  let latitude1;
  let longitude1;
  let latitude2;
  let longitude2;
  let params = new URLSearchParams(window.location.search);
  latitude1 = parseFloat(params.get("1Latitude"));
  longitude1 = parseFloat(params.get("1Longitude"));
  latitude2 = parseFloat(params.get("2Latitude"));
  longitude2 = parseFloat(params.get("2Longitude"));
  avgLatitude = (latitude1 + latitude2) / 2;
  avgLongitude = (longitude1 + longitude2) / 2;
  console.log("ON MAPS  PAGE");
  console.log(params.get("1Longitude"));
  console.log(parseFloat(params.get("1Latitude")));
  console.log(parseFloat(params.get("1Longitude")));
  mapProp = {
    center: new google.maps.LatLng(avgLatitude, avgLongitude),
    zoom: 12
  };
  const map = new google.maps.Map(
    document.getElementById("googleMap"),
    mapProp
  );

  const circle = new google.maps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map,
    center: mapProp.center,
    radius: 5000
  });

  request = {
    location: mapProp.center,
    radius: 5000,
    type: ["restaurant"]
  };

  infowindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);

  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
        console.log(results[i]);
      }
    }
  }
  const newAside = document.createElement("aside");
  function createMarker(place) {
    placeLoc = place.geometry.location;
    marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    const mapContainer = document.querySelector("#mapContainer");

    google.maps.event.addListener(marker, "click", function() {
      infowindow.setContent(
        "<p>" + place.name + "<br />" + place.vicinity + "<br />" + "</p>"
      );
      infowindow.open(map, this);
      newAside.innerHTML = `
              <h2><b>${place.name}</b></h2><br>
              ${place.vicinity}<br>
               Rating:   ${place.rating}/5<br>
               Total User Ratings: ${place.user_ratings_total}<br>
            `;
      mapContainer.appendChild(newAside);
    });
  }
}

google.maps.event.addDomListener(window, "load", myMap);
