'use strict'

const express = require('express'),
      router = express.Router(),
      vv = require('../settings/variables')

router.get('/styleGuide', function(req, res, next) {
  res.render('styleGuide', {
    _title: 'Style Guide | ' + vv.siteName,
    _name: 'Style Guide',
    _description: 'Style Guide for ' + vv.siteName,
  })
})

module.exports = router
