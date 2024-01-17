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

      console.log(data)

      if (map) {

        data.map(feature => {
          let coordinates = feature.geometry.coordinates.map(coords => {
            return { lat: coords[1], lng: coords[0] }
          })

          let strokeColor = Math.floor(Math.random()*16777215).toString(16);

          // Polyline
          const river = new google.maps.Polyline({
            path: coordinates,
            geodesic: true,
            strokeColor: '#' + strokeColor,
            strokeOpacity: 3.0,
            strokeWeight: 3.0,
          });

          const contentString =
            `
            <h3> Informações do Rio</h3>
            <p>Nome: ${feature.properties.nome}</p>
            <p>Afluente Esquerda: ${feature.properties.aflu_esq}</p>
            <p>Afluente Direita: ${feature.properties.aflu_dir}</p>
            <p>RA: ${feature.properties.ra}</p>
            <p>Extensão: ${feature.properties.extensao}</p>
            <p>Perene: ${feature.properties.perene}</p>
            `;
          const infowindow = new google.maps.InfoWindow({
            content: contentString,
            ariaLabel: "Uluru",
          });

          river.addListener('click', (e) => {
            console.log('clicked', e.latLng)
            infowindow.open({
             map
            });
            infowindow.setPosition(e.latLng);

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

          console.log('feature', feature)

          let coordinates = feature.geometry.coordinates.map(coords => {
            return { lat: coords[1], lng: coords[0] }
          });

          let strokeColor = Math.floor(Math.random()*16777215).toString(16);

          // Polyline
          const river = new google.maps.Polyline({
            path: coordinates,
            geodesic: true,
            strokeColor: '#' + strokeColor,
            strokeOpacity: 1.0,
            strokeWeight: 2,
          });
          const contentString =
            `
            <h3> Informações do Rio</h3>
            <p>Nome: ${feature.properties.nome}</p>
            <p>Afluente Esquerda: ${feature.properties.aflu_esq}</p>
            <p>Afluente Direita: ${feature.properties.aflu_dir}</p>
            <p>RA: ${feature.properties.ra}</p>
            <p>Extensão: ${feature.properties.extensao}</p>
            <p>Perene: ${feature.properties.perene}</p>
            `;
          const infowindow = new google.maps.InfoWindow({
            content: contentString,
            ariaLabel: "Uluru",
          });

          river.addListener('click', (e) => {
            console.log('clicked', e.latLng)
            infowindow.open({
             map
            });
            infowindow.setPosition(e.latLng);

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