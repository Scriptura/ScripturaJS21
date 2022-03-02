const shortcodes = (data) => {

  data = data.replace( // Map Leaflet
    /{{name="(.*)" coords=\[(.*)\].*zoom=(\d*)}}/g,
   '<div class="map" id="map" style="height:50vh" data-name="$1" data-coords="[$2]" data-zoom="$3" data-color="#ff654f" data-tileserver="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoib2xpdmllcmMiLCJhIjoiY2s5dnNnZWoyMDIzNDNzb2Y1dmQ4MGNtMCJ9.m4U-wYcS4EPcKe9nVXIbUA" data-attribution="&lt;a href=&quot;//www.openstreetmap.org/&quot;&gt;OSM&lt;/a&gt; | &lt;a href=&quot;//www.mapbox.com/&quot;&gt;Mapbox&lt;/a&gt;"></div>'
  )

  data = data.replace( // Vidéo Youtube
    /{{https:\/\/www.youtube.com\/watch\?v=(.*?)}}/g,
    '<div class="video video-click"><div class="thumbnail-youtube" style="background-image: url(\'https://img.youtube.com/vi/$1/maxresdefault.jpg\')"></div></div>'
  )

  return data

}
  
module.exports = { shortcodes }
