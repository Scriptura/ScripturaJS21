'use strict'

const express = require('express'),
      router = express.Router(),
      vv = require('../settings/variables')

router.get('/imageGallery', function(req, res, next) {
  res.render('imageGallery', {
    _title: 'Image gallery | ' + vv.siteName,
    _name: 'Image gallery',
    _description: 'Image gallery for ' + vv.siteName,
  })
})

module.exports = router
