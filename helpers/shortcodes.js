const shortcodes = (data) => {

  data = data.replace( // Map Leaflet
    /{{map[ ]{1}name="(.*?)"[ ]{1}coords=\[(.*?)\][ ]{1}zoom=(\d*?)}}/g,
   '<div class="map" style="height:50vh" data-name="$1" data-coords="[$2]" data-zoom="$3" data-color="#ff654f" data-tileserver="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoib2xpdmllcmMiLCJhIjoiY2s5dnNnZWoyMDIzNDNzb2Y1dmQ4MGNtMCJ9.m4U-wYcS4EPcKe9nVXIbUA" data-attribution="&lt;a href=&quot;//www.openstreetmap.org/&quot;&gt;OSM&lt;/a&gt; | &lt;a href=&quot;//www.mapbox.com/&quot;&gt;Mapbox&lt;/a&gt;"></div>'
  )

  /*
  // La manipulation suivante permet d'entrer les paramètres dans le shortcode dans n'importe quel ordre :
  const mapName = data.replace( /{{map[ ,].*name="(.*?)".*}}/, '$1') // Pas de flag `g` : arrêt à la première occurence, dans la perspective d'une seule carte @todo Pour l'instant.
  const mapCoords = data.replace( /{{map[ ,].*coords=\[(.*?)\].*}}/, '$1')
  const mapZoom = data.replace( /{{map[ ,].*zoom=(\d*?)}}/, '$1')
  data = data.replace(
    /{{map[ ,].*coords=\[(.*?)\].*}}/,
  `<div class="map" style="height:50vh" data-name="${mapName}" data-coords="[${mapCoords}]" data-zoom="${mapZoom}" data-color="#ff654f" data-tileserver="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoib2xpdmllcmMiLCJhIjoiY2s5dnNnZWoyMDIzNDNzb2Y1dmQ4MGNtMCJ9.m4U-wYcS4EPcKe9nVXIbUA"></div>` // data-attribution="&lt;a href=&quot;//www.openstreetmap.org/&quot;&gt;OSM&lt;/a&gt; | &lt;a href=&quot;//www.mapbox.com/&quot;&gt;Mapbox&lt;/a&gt;"
  )
  */

  data = data.replace( // Vidéo Youtube
    /{{https:\/\/www.youtube.com\/watch\?v=(.*?)}}/g,
    '<div class="video video-click"><div class="thumbnail-youtube" style="background-image: url(\'https://img.youtube.com/vi/$1/maxresdefault.jpg\')"></div></div>'
  )

  return data

}
  
module.exports = { shortcodes }
