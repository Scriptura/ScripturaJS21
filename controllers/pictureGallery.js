'use strict'

const express = require('express'),
      router = express.Router(),
      vv = require('../settings/variables')

router.get('/pictureGallery', function(req, res, next) {
  res.render('pictureGallery', {
    _title: 'Picture Gallery | ' + vv.siteName,
    _name: 'Picture Gallery',
    _description: 'Picture Gallery for ' + vv.siteName,
  })
})

module.exports = router
