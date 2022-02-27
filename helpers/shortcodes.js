const shortcodes = (data) => {
  data = data.replace(/{{https:\/\/www.youtube.com\/watch\?v=(.*?)}}/g, '<div class="video"><iframe src="//www.youtube.com/embed/$1" allowfullscreen=""></iframe></div>')
  return data
}
  
module.exports = { shortcodes }
