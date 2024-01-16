let map;

function initMap() {
  const myLatLng = { lat: -15.682590950535907, lng: -47.89642922232735 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: myLatLng,
  });

  map.addListener("click", (e) => {
    console.log(e.latLng.lat(), e.latLng.lng());
  });

  // Marker
  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Hello World!",
  });
}

const getPointCircle = async () => {
  fetch('http://localhost:3315/services/getPointCircle')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {

      if (map) {

        let coordinates = data.geometry.coordinates[0].map(coords => {
          return { lat: coords[1], lng: coords[0] }
        })

        const polygon = new google.maps.Polygon({
          paths: coordinates,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
        });

        polygon.setMap(map);

      }

      document.getElementById('result').innerHTML = 'Success!!! ';//JSON.stringify(data);


    })
    .catch(error => {
      console.error('Error fetching data:', error);
      document.getElementById('result').innerHTML = 'Error fetching data';
    });
}
const getFilteredRivers = async () => {
  fetch('http://localhost:3315/services/getFilteredRivers')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {

      if (map) {

        data.map(feature => {
          let coordinates = feature.geometry.coordinates.map(coords => {
            return { lat: coords[1], lng: coords[0] }
          })

          // Polyline
          const river = new google.maps.Polyline({
            path: coordinates,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 3.0,
            strokeWeight: 3.0,
          });

          river.setMap(map);

        })

      }
      document.getElementById('result').innerHTML = 'Success!!! ';//JSON.stringify(data);


    })
    .catch(error => {
      document.getElementById('result').innerHTML = 'Error fetching data';
    });
}

const getAllRivers = async () => {
  fetch('http://localhost:3315/services/getAllRivers')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {

      if (map) {

        data.map(feature => {
          let coordinates = feature.geometry.coordinates.map(coords => {
            return { lat: coords[1], lng: coords[0] }
          })

          // Polyline
          const river = new google.maps.Polyline({
            path: coordinates,
            geodesic: true,
            strokeColor: "#0000FF",
            strokeOpacity: 1.0,
            strokeWeight: 2,
          });

          river.setMap(map);

        })

      }

      document.getElementById('result').innerHTML = 'Success!!! ';//JSON.stringify(data);


    })
    .catch(error => {
      console.error('Error fetching data:', error);
      document.getElementById('result').innerHTML = 'Error fetching data';
    });
}


window.initMap = initMap;