'use strict'

const express = require('express'),
      router = express.Router(),
      vv = require('../settings/variables')

router.get('/articles', function(req, res, next) {
  res.render('articles', {
    data: {
      _title: 'Articles list | ' + vv.siteName,
      _name: 'Articles <span>list</span>',
      _description: 'Articles list of ' + vv.siteName
    }
  })
})

module.exports = router
