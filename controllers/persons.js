'use strict'

const express = require('express'),
      router = express.Router(),
      vv = require('../settings/variables')

router.get('/persons', function(req, res, next) {
  res.render('persons', {
    _title: 'Persons list | ' + vv.siteName,
    _name: 'Persons',
    _description: 'Persons list of ' + vv.siteName,
  })
})

module.exports = router
