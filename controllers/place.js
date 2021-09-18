'use strict'

const express = require('express'),
      router = express.Router(),
      { getPlace } = require('../models/place')

router.get('/place/:id([0-9]{1,7})', async (req, res, next) => { // @example '/place/1'
  const data = await getPlace(req.params.id)
  .then(data => {
    //console.log(data)
    if (data === undefined) throw new Error('Error: the query did not return anything because it did not match with data.')
    res.render('place', data)
  })
    .catch(error => next())
})

module.exports = router
