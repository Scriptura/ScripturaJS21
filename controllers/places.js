'use strict'

const express = require('express'),
      router = express.Router(),
      { getPlaces } = require('../models/places')

router.get('/places', async (req, res, next) => {
  const data = await getPlaces()
    .then(data => {
      //console.log(data)
      if (data === undefined) throw new Error('Error: the query did not return anything because it did not match with data.')
      data._url = req
      res.render('places', {data})
    })
    .catch(error => next())
})

module.exports = router
