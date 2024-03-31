// Improved ISS Tracker Code

// Constants
const ISS_URL = 'https://api.wheretheiss.at/v1/satellites/25544';
const PLOT_INTERVAL = 10000; // 2 seconds

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

// Fetch ISS position from the API
async function fetchISSPosition(map) {
  try {
    const response = await fetch(ISS_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch ISS data');
    }
    const ISS_Location = await response.json();
    plotMarker(map, ISS_Location);
  } catch (error) {
    console.error('Error fetching ISS data:', error.message);
  }
}

// Plot ISS marker on the map
function plotMarker(map, ISS_Location) {
  const LatLng_ISS = new google.maps.LatLng(
    ISS_Location.latitude,
    ISS_Location.longitude
  );

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
