const shortcodes = (data) => {
  //data = data.replace(/{{()}}/g, ' <span style="color:#fff">$1</span> ')
  data = data.replace( // traitement d'une vidéo Youtube
    /{{https:\/\/www.youtube.com\/watch\?v=(.*?)}}/g,
    '<div class="video video-click"><div class="thumbnail-youtube" style="background-image: url(\'https://img.youtube.com/vi/$1/maxresdefault.jpg\')"></div></div>'
    )
  return data
}
  
module.exports = { shortcodes }
