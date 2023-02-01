async function run() {
  // get bus data
  const locations = await getBusLocations();
  let busLocations = [];
  locations.forEach((element) => {
    busLocations.push({
      busId: element.id,
      longLat: [element.attributes.longitude, element.attributes.latitude],
      updatedAt: element.attributes.updated_at,
      occupancy_status: element.attributes.occupancy_status,
      route: element.relationships.route.data.id,
    });
  });

  await busMarkers(busLocations);
  console.log(busLocations);

  // timer
  setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations() {
  const route = document.getElementById('routes').value;
  if (route === 'Select a Route') {
    alert(`Please select a route from the dropdown menu!!\n
    Then click on "Track Buses"`);
  }
  const url = `https://api-v3.mbta.com/vehicles?filter[route]=${route}&include=trip`;
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
// function getRandomColor() {
//   var letters = '0123456789ABCDEF';
//   var color = '#';
//   for (var i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }

function getColor(routeNumber) {
  let r = `Route${routeNumber}`;

  const colors = {
    Route1: '#9e9672',
    Route4: '#1abd20',
    Route10: '#e8ab27',
    Route16: '#c91818',
    Route18: '#1abd20',
    Route77: '#e8ab27',
    Route117: '#a115d4',
  };
  return colors[r];
}

// Markers showing busses that are currently running on map
let markers = [];

function busMarkers(buses) {
  if (markers.length > 0) {
    markers.forEach((m) => {
      m.remove();
    });
  }

  buses.forEach((bus) => {
    let color = getColor(bus.route);
    busMarker = new mapboxgl.Marker({ color: color })
      .setLngLat(bus.longLat)
      .addTo(map);
    markers.push(busMarker);
  });
}

// run();
