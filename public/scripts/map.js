'use strict'

const getLeaflet = (() => {
  const script = document.createElement('script')
  script.setAttribute('src', '/libraries/leaflet/leaflet.js')
  document.head.appendChild(script)
})()

const getMapStyles = (() => { //
  const styles = document.createElement('link')
  styles.setAttribute('rel', 'stylesheet')
  styles.setAttribute('href', '/libraries/leaflet/leaflet.css')
  document.head.appendChild(styles)
})()

const mapsIdAdd = (() => { // @note Affecter ou réafecter une id pour chaque carte afin d'éviter les conflits.
  let i = 1
  document.querySelectorAll('.map').forEach(function(map) {
    map.id = 'map' + i
    i++
  })
})()

// @note Permet l'animation unique des marqueurs au lancement de la page.
const startPage = (() => {
  const html = document.documentElement,
        c = 'start-map'
  html.classList.add(c)
  window.addEventListener('load', function() {
    setTimeout(() => {
      html.classList.remove(c)
    }, 1500)
  })
})()

const maps = (() => {
  document.querySelectorAll('.map').forEach(function(item) {
    const map = () => {
      const el = document.getElementById(item.id),
            coords = JSON.parse(el.dataset.coords),
            map = L.map(item.id).setView(coords, el.dataset.zoom)
      L.tileLayer(
        el.dataset.tileserver,
        {attribution: el.dataset.attribution}
      ).addTo(map)
      if (el.dataset.name) {
        let icon = L.icon({
          iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 512 512'%3E%3Cpath fill='%23E74C3C' d='M256 14C146 14 57 102 57 211c0 172 199 295 199 295s199-120 199-295c0-109-89-197-199-197zm0 281a94 94 0 110-187 94 94 0 010 187z'/%3E%3Cpath fill='%23C0392B' d='M256 14v94a94 94 0 010 187v211s199-120 199-295c0-109-89-197-199-197z'/%3E%3C/svg%3E", // @see https://codepen.io/tigt/post/optimizing-svgs-in-data-uris @see https://codepen.io/jakob-e/pen/doMoML
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          shadowUrl: '/libraries/leaflet/images/marker-shadow.png',
          shadowSize: [50, 70],
          shadowAnchor: [15, 70],
          popupAnchor: [0, -60]
        })
        const marker = L.marker(coords, {icon: icon})
        marker.bindPopup(el.dataset.name)
        marker.openPopup()
        marker.addTo(map)
      }
      }
    window.addEventListener('load', function() {
      map()
    })
  })
})()
