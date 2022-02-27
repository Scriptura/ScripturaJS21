'use strict'

const youtubeVideo = (() => {
  document.querySelectorAll('.video-click').forEach(e => {
    e.addEventListener('click', () => {
      e.innerHTML = e.innerHTML.replace(
        /^.*\/vi\/(.*)\/.*$/,
        '<iframe src="//www.youtube.com/embed/$1" allowfullscreen=""></iframe'
      )
    })
  })
})()
