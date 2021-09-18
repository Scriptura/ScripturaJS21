'use strict'

const express = require('express'),
      router = express.Router(),
      { getCalendarMonth } = require('../models/calendar')

router.get('/calendar/:year([0-9]{1,4})/:month(0[1-9]|1[0-2])', async (req, res, next) => { // @modele '/calendar/YYYY/MM'
  const data = await getCalendarMonth(req.params.year, req.params.month)
    .then(data => {
      //console.log(data)
      if (data === undefined) throw new Error('Error: the query did not return anything because it did not match with data.')
      res.render('calendar', data)
    })
    .catch(error => next())
})

module.exports = router
