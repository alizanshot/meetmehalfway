// let map;
// let latitude1 = 34;
// let longitude1 = -118;
// let latitude2 = 50;
// let longitude2 = -70;
// let lat3 = 60;
// let lng3 = -100;

// function initMap(){

// const geocoder = new google.maps.Geocoder();
//   document.getElementById("go").addEventListener("click", () => {
//     geocodeAddress(geocoder);
//     1;
//   });

// function geocodeAddress(geocoder) {
//   let address1 = document.getElementById("address1").value;
//   let report = document.getElementById("coords");
//   let message;
//   geocoder.geocode({ address: address1 }, (results, status) => {
//     if (status == google.maps.GeocoderStatus.OK) {
//       latitude1 = results[0].geometry.location.lat();
//       longitude1 = results[0].geometry.location.lng();
//       console.log(latitude1, longitude1);
//       message = `Lat: ${latitude1} Long: ${longitude1}`;
//     } else {
//       message = `Geocoding failed: ${status}`;
//     }
//     document.querySelector("h1").textContent = message;
//   });

//   let address2 = document.getElementById("address2").value;
//   let message2;
//   geocoder.geocode({ address: address2 }, (results, status) => {
//     if (status == google.maps.GeocoderStatus.OK) {
//       latitude2 = results[0].geometry.location.lat();
//       longitude2 = results[0].geometry.location.lng();
//       console.log(latitude2, longitude2);
//       message2 = `Lat: ${latitude2} Long: ${longitude2}`;
//     } else {
//       message2 = `Geocoding failed: ${status}`;
//     }
//     document.querySelector("footer").textContent = message;
//   });
// }

function geocodeAddress(geocoder, address1, address2) {
  let location1 = {};
  let location2 = {};

  geocoder.geocode({ address: address1 }, (results, status) => {
    if (status == google.maps.GeocoderStatus.OK) {
      location1.lat = results[0].geometry.location.lat();
      location1.lng = results[0].geometry.location.lng();

      loadNextPageIfDone(location1, location2);

      // message = `Lat: ${location1.lat} Long: ${location1.lng}`;
    } else {
      // message = `Geocoding failed: ${status}`;
    }
  });

  geocoder.geocode({ address: address2 }, (results, status) => {
    if (status == google.maps.GeocoderStatus.OK) {
      location2.lat = results[0].geometry.location.lat();
      location2.lng = results[0].geometry.location.lng();

      loadNextPageIfDone(location1, location2);

      // message2 = `Lat: ${location2.lat} Long: ${location2.lng}`;
    } else {
      // message2 = `Geocoding failed: ${status}`;
    }
  });
}

function locationToQueryParamter(location, prefix) {
  // <prefix>Latitude=location.lat&longitude=location.lng
  // lat=latval&lon=lonval
  return (
    "" +
    prefix +
    "Longitude" +
    "=" +
    location.lng +
    "&" +
    prefix +
    "Latitude" +
    "=" +
    location.lat
  );
}

function loadNextPageIfDone(location1, location2) {
  console.log(location1);
  console.log(location2);

  if (
    location1.lat !== undefined &&
    location1.lng !== undefined &&
    location2.lat !== undefined &&
    location2.lng !== undefined
  ) {
    console.log("next page");
    let location1params = locationToQueryParamter(location1, 1);
    let location2params = locationToQueryParamter(location2, 2);

    let destinationUrl =
      "map.html" + "?" + location1params + "&" + location2params;
    console.log(destinationUrl);
    window.location = destinationUrl;
  }
}
