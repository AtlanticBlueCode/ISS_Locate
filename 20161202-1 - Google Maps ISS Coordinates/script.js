// Improved ISS Tracker Code

// Constants
const ISS_URL = 'http://api.open-notify.org/iss-now.json?key=ZRlcJrbb0wvyApa0QdayeQuweYmeYaSGrafFRePK';
const PLOT_INTERVAL = 2000; // 1 seconds
let firstPlot = true;

var map;

// Called from HTML when API is loaded
// Initialize the map
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: { lat: 0.0, lng: 0.0 },
    mapTypeId: 'terrain',
    mapId: 'DEMO_MAP_ID', // Map ID is required for advanced markers
  });

  // Fetch ISS data and plot marker initially
  fetchISSPosition(map);
}


async function fetchISSPosition(map){
  fetch(ISS_URL)
  .then(response => response.json())
  .then(data => {

    // Extract latitude and longitude to ISS_Location variable
    const ISS_Location = {
      latitude: parseFloat(data.iss_position.latitude), 
      longitude: parseFloat(data.iss_position.longitude)
    };

    // Print the results
    console.log(`ISS current location: Latitude ${ISS_Location.latitude}, Longitude ${ISS_Location.longitude}`);

    // Plot Marker
    plotMarker(map, ISS_Location);

  })
  .catch(error => {
    console.error("Error fetching ISS location:", error);
  });

}


// Plot ISS marker on the map
function plotMarker(map, ISS_Location) {
  // Create a google maps LatLng Object from the ISS_Location Object
  const LatLng_ISS = new google.maps.LatLng(
    ISS_Location.latitude,
    ISS_Location.longitude
  );

  // Center the map on the first time the marker is drawn
  if (firstPlot){
    map.setCenter(LatLng_ISS)
  } 

  // Do not center again
  firstPlot = false

  // Plot new Marker
  new google.maps.Marker({
    map,
    position: LatLng_ISS,
    icon: 'iss-verysmall.png',
  });

}

// Periodically update ISS position
setInterval(() => {
  fetchISSPosition(map);
}, PLOT_INTERVAL);
