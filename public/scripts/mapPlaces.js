const map = (() => {
  let markers = [];

  function getIcon(color) {
    return L.icon({
      iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 512 512'%3E%3Cpath fill='%23" + color + "' d='M256 14C146 14 57 102 57 211c0 172 199 295 199 295s199-120 199-295c0-109-89-197-199-197zm0 281a94 94 0 110-187 94 94 0 010 187z'/%3E%3Cpath fill='%23" + color + "' d='M256 14v94a94 94 0 010 187v211s199-120 199-295c0-109-89-197-199-197z'/%3E%3C/svg%3E" // @see https://codepen.io/tigt/post/optimizing-svgs-in-data-uris @see https://codepen.io/jakob-e/pen/doMoML
      , iconSize: [40, 40]
      , iconAnchor: [20, 40]
      , shadowUrl: '/libraries/leaflet/images/marker-shadow.png'
      , shadowSize: [50, 70]
      , shadowAnchor: [15, 70]
      , popupAnchor: [0, -60]
    });
  }

  let map = L.map('map').setView([51, -0.1], zoom);

  L.tileLayer(tileServer, {attribution}).addTo(map);

  for(var i=0;i<locations.length;i++) {
    let marker = L.marker(locations[i].coords, {icon: getIcon(locations[i].color.substring(1))});
    marker.bindPopup(locations[i].name).openPopup();
    marker.addTo(map);
    markers.push(marker);
  }
    const group = new L.featureGroup(markers);
    map.fitBounds(group.getBounds()); // Cenntrage et zoom de la carte en fonction des marqueurs
})();
