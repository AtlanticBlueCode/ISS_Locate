/*
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON#Getting_started
*/

var ISS_Location;
var ISS_URL = 'https://api.wheretheiss.at/v1/satellites/25544';

var PlotInterval = 2*1000;
var LabelInterval = PlotInterval;

function request_ISS_Position() {
  var request = new XMLHttpRequest();
  request.open('GET', ISS_URL);
  request.responseType = 'json';
  request.send();
  request.onload = function () {
    ISS_Location = request.response;
    console.log(ISS_Location);
  }
}  

request_ISS_Position();

var map;

function init_Map() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: { lat: 0.0, lng: 0.0 },
    mapTypeId: 'terrain',
    mapId: "DEMO_MAP_ID" // Map ID is required for advanced markers.   
  });
}

function plot_Marker() {
  var LatLng_ISS = new google.maps.LatLng(ISS_Location.latitude, ISS_Location.longitude);
  var marker = new google.maps.Marker({
    map: map,   // Indicação do Map ao qual se quer adicionar os Markers (neste caso é o Object "map" que criei acima)
    //animation: google.maps.Animation.DROP,
    position: LatLng_ISS,
    icon: 'iss-verysmall.png'
  }
  );
}


function draw_Marker() {
  request_ISS_Position();
  plot_Marker();
}

setInterval(draw_Marker, PlotInterval);
