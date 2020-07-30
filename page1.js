/* 
  global createCanvas colorMode HSB background
  google, const, latitude1, 
*/

// function setup() {
//   colorMode(HSB, 360, 100, 100);
// }

let map;


function initMap() {
  
  

  const geocoder = new google.maps.Geocoder();
  document.getElementById("go").addEventListener("click", () => {
    geocodeAddress(geocoder);
    1;
  });
  
  
}
