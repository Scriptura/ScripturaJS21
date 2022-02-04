'use strict'

const express = require('express'),
      router = express.Router(),
      vv = require('../settings/variables')

router.get('/keyword', function(req, res, next) {
  res.render('keyword', {
    _title: 'Keyword | ' + vv.siteName,
    _name: 'Keyword',
    _description: 'Keyword for ' + vv.siteName,
  })
})

module.exports = router
