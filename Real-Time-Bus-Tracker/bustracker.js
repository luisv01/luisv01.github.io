async function run() {
  // get bus data
  const locations = await getBusLocations();
  // console.log(new Date());
  let busLocations = [];
  locations.forEach((element) => {
    busLocations.push({
      busId: element.id,
      longLat: [element.attributes.longitude, element.attributes.latitude],
      updatedAt: element.attributes.updated_at,
      occupancy_status: element.attributes.occupancy_status,
    });
  });
  await busMarkers(busLocations);
  console.log(busLocations);
  // timer
  setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations() {
  const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
  const response = await fetch(url);
  const json = await response.json();
  return json.data;
}

//   MapBox access token
mapboxgl.accessToken =
  'pk.eyJ1IjoibHVpc3ZpbGxhMDAxIiwiYSI6ImNsZDUybnFnYjBmNzkzcHJ4YXV5NDJ4YmgifQ.fOLxRkjqXU6P2HKa70nIXw';

// This is the map instance with MIT as center
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.365554],
  zoom: 13,
});

//function to create random color for bus marker
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Markers showing busses that are currently running route 1 on map
let markers = [];
function busMarkers(buses) {
  if (markers.length === 0) {
    buses.forEach((bus) => {
      let color = getRandomColor();
      busMarker = new mapboxgl.Marker({ color: color })
        .setLngLat(bus.longLat)
        .addTo(map);
      markers.push(busMarker);
    });
  }
  if (markers.length > 0) {
    buses.forEach((bus, index) => {
      markers[index].setLngLat(bus.longLat);
    });
  }
}

// run();
