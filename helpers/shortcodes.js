'use strict'

// @todo À développer : SVG, drop-cap...

const shortcodes = (data) => {

  data = data.replace( // URL d'images internes au site
    /{{\s*\/medias\/images\/demo\/(.*?)\.(webp|jpg|jpeg|png|gif)\s*}}/g, // @note Pas de confusion prévue, le nom de domaine n'est pas nécessaire : ce shortcode ne doit fonctioner que pour les images hébergées par le site. Pas de CDN prévu...
    '<figure class="figure-focus-thumbnail"><picture><img src="/medias/images/demo/$1.$2" loading="lazy" alt="$1"></picture></figure>'
  )


  /*
  const string = data;

  // expression matches case-insensitive "name is"+ any alphabets till period (.)
  // using named capturing groups
  const re = /name\sis\s(?<name>[a-zA-Z]+)\./gi;
  let found = string.matchAll(re);

  for (const match of found){
    console.log(`Found "${match[0]}" at index ${match.index}. Captured name = ${match.groups['name']}`)
  }
  */


  /*
  const shortcodeImages = (...matchs) => {
    //console.log(matchs)
    for (let match of [matchs]) {
      let caption = '',
          keyValue = ''
      if (match[1] === 'caption') caption = `<figcaption>${match[2]}</figcaption>`
      else keyValue = keyValue + match[0]
      return `<figure class="figure-focus-thumbnail"><img${keyValue}>${caption}</figure>`
    }
  }

  const shortcodeAttributes = (...matchs) => matchs[1].replace(/\s+(.+?)="(.*?)"/g, shortcodeImages)

  data = data.replace( // Images
    /{{img(.*?)\s*}}/g,
    shortcodeAttributes
  )
  */

  const shortcodes = (...matchs) => {
    for (let match of [matchs]) {
      console.log(match)
      let caption = `<figcaption>${match.replace(/\s+caption="(.*?)"/g, $1)}</figcaption>`
          //keyValue = ''
      //keyValue = keyValue + match[0]
      return `<figure class="figure-focus-thumbnail"><img${keyValue}>${caption}</figure>`
    }
  }

  const shortcodeAttributes = (...matchs) => matchs[1].replace(/\s+(.+?)="(.*?)"/g, shortcodeImages)

  data = data.replace( // Images
    /{{img(.*?)\s*}}/g,
    shortcodes
  )
 
  data = data.replace( // Map Leaflet
    // /{{map\s+(.+?)?}}/g,
    /{{\s*map\s+(.+?)\s*}}/g,
   '<div class="map" $1 data-color="#ff654f"></div>'
  )

  data = data.replace( // URL vidéo Youtube
    /{{https?:\/\/www.youtube.com\/watch\?v=(.*?)}}/g,
    '<div class="video video-click"><div class="thumbnail-youtube" style="background-image: url(\'https://img.youtube.com/vi/$1/maxresdefault.jpg\')"></div></div>'
  )

  return data

}

module.exports = { shortcodes }
