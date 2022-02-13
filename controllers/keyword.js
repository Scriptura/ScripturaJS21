'use strict'

const express = require('express'),
      router = express.Router(),
      vv = require('../settings/variables')

router.get('/keyword', function(req, res, next) {
  res.render('keyword', {
    data: {
      _title: 'Keyword Lion | ' + vv.siteName,
      _name: 'Lion <span>keyword</span>',
      _description: 'Keyword Lion for ' + vv.siteName
    }
  })
})

module.exports = router
