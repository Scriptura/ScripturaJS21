'use strict'

const express = require('express'),
      router = express.Router(),
      { getPersons } = require('../models/persons')

router.get('/persons', async (req, res, next) => {
  const data = await getPersons()
    .then(data => {
      console.log(data)
      if (data === undefined) throw new Error('Error: the query did not return anything because it did not match with data.')
      res.render('persons', {data: data})
    })
    .catch(error => next())
})

module.exports = router
