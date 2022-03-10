  // @todo À développer : SVG, drop-cap...

const shortcodes = (data) => {

  data = data.replace( // URL d'images internes au site
    /{{\s*\/medias\/images\/(.*?)\.(webp|jpg|jpeg|png|gif)\s*}}/g, // @note Pas de confusion prévue, le nom de domaine n'est pas nécessaire : ce shortcode ne doit fonctioner que pour les images hébergées par le site. Pas de CDN prévu...
    '<figure class="figure-focus-thumbnail"><picture><img src="/medias/images/demo/$1.$2" loading="lazy" alt="$2"></picture></figure>'
  )
  /*
  data = data.replace( // Map Leaflet
    /{{map\s+name="(.*?)"\s+coords=\[(.*?)\]\s+zoom=(\d*?)}}/g,
   '<div class="map" style="height:50vh" data-name="$1" data-coords="[$2]" data-zoom="$3" data-color="#ff654f" data-tileserver="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoib2xpdmllcmMiLCJhIjoiY2s5dnNnZWoyMDIzNDNzb2Y1dmQ4MGNtMCJ9.m4U-wYcS4EPcKe9nVXIbUA" data-attribution="&lt;a href=&quot;//www.openstreetmap.org/&quot;&gt;OSM&lt;/a&gt; | &lt;a href=&quot;//www.mapbox.com/&quot;&gt;Mapbox&lt;/a&gt;"></div>'
  )
  */
 
  data = data.replace( // Map Leaflet
    // /{{map\s+(.+?)?}}/g,
    /{{\s*map\s+(.+?)\s*}}/g,
   '<div class="map" $1 data-color="#ff654f" data-tileserver="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoib2xpdmllcmMiLCJhIjoiY2s5dnNnZWoyMDIzNDNzb2Y1dmQ4MGNtMCJ9.m4U-wYcS4EPcKe9nVXIbUA" data-attribution="&lt;a href=&quot;//www.openstreetmap.org/&quot;&gt;OSM&lt;/a&gt; | &lt;a href=&quot;//www.mapbox.com/&quot;&gt;Mapbox&lt;/a&gt;"></div>'
  )

  data = data.replace( // URL vidéo Youtube
    /{{https?:\/\/www.youtube.com\/watch\?v=(.*?)}}/g,
    '<div class="video video-click"><div class="thumbnail-youtube" style="background-image: url(\'https://img.youtube.com/vi/$1/maxresdefault.jpg\')"></div></div>'
  )

  return data

}

module.exports = { shortcodes }
