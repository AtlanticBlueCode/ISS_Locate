/*
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON#Getting_started
*/

var ISS_Location;
var ISS_URL = 'https://api.wheretheiss.at/v1/satellites/25544';

var PlotInterval = 1*10*1000;
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
var infoWindow;

function init_Map() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: { lat: 0.0, lng: 0.0 },
    mapTypeId: 'terrain'   
  });
}

//initMap();

function plot_Marker() {
  var LatLng_ISS = new google.maps.LatLng(ISS_Location.latitude, ISS_Location.longitude);
  var marker = new google.maps.Marker({
    map: map,   // Indicação do Map ao qual se quer adicionar os Markers (neste caso é o Object "map" que criei acima)
    animation: google.maps.Animation.DROP,
    title: "ISS@" + new Date().toLocaleTimeString(),
    position: LatLng_ISS,
    icon: 'iss-verysmall.png'
  }
  );
}


function plot_Label_1() {
  var LatLng_ISS = new google.maps.LatLng(ISS_Location.latitude, ISS_Location.longitude);
  var infoWindow_1 = new google.maps.InfoWindow({
    map: map,  // Indicação do Map ao qual se quer adicionar os Markers (neste caso é o Object "map" que criei acima)
    content: "ISS@" + new Date().toLocaleTimeString(),
    position: LatLng_ISS
  }
  );
}
  
function plot_Label() {
  var LatLng_ISS = new google.maps.LatLng(ISS_Location.latitude, ISS_Location.longitude);
  infoWindow = new google.maps.InfoWindow({
  map: map,  // Indicação do Map ao qual se quer adicionar os Markers (neste caso é o Object "map" que criei acima)
  content: "ISS@" + new Date().toLocaleTimeString(),
  position: LatLng_ISS
  }
  );

  setInterval(draw_Label, LabelInterval);
}

function update_Label() {
  var LatLng_ISS = new google.maps.LatLng(ISS_Location.latitude, ISS_Location.longitude);
  infoWindow.setPosition(LatLng_ISS);
  infoWindow.setContent("ISS@" + new Date().toLocaleTimeString());
  }

function draw_Marker() {
  request_ISS_Position();
  plot_Marker();
}

setInterval(draw_Marker, PlotInterval);
setTimeout(plot_Marker, 1000)

function draw_Label() {
  request_ISS_Position();
  update_Label();
}

setTimeout(plot_Label_1, 1000);
setTimeout(plot_Label, 1000)