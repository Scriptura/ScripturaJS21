'use strict'

const express = require('express'),
      router = express.Router(),
      { getPerson } = require('../models/person')

router.get('/person/:id([0-9]{1,7})', async (req, res, next) => { // @example '/person/1'
  // @todo '/person/:name([0-9a-zA-Z]{1,20})'
  const data = await getPerson(req.params.id)
    .then(data => {
      //console.log(data)
      if (data === undefined) throw new Error('Error: the query did not return anything because it did not match with data.')
      res.render('person', data)
    })
    .catch(error => next())
})

module.exports = router
