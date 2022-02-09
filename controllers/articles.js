'use strict'

const express = require('express'),
      router = express.Router(),
      vv = require('../settings/variables')

router.get('/articles', function(req, res, next) {
  res.render('articles', {
    _title: 'Articles list | ' + vv.siteName,
    _name: 'Articles',
    _description: 'Articles list of ' + vv.siteName,
  })
})

module.exports = router