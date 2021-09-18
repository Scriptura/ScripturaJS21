'use strict'

const express = require('express'),
      router = express.Router(),
      { getCalendarDay } = require('../models/calendar')

router.get('/calendar/:year([0-9]{1,4})/:month(0[1-9]|1[0-2])/:day(0[1-9]|[12][0-9]|[3][01])', async (req, res, next) => { // @example '/calendar/YYYY/MM/DD'
  const data = await getCalendarDay(req.params.year, req.params.month, req.params.day)
    .then(data => {
      //console.log(data)
      if (data === undefined) throw new Error('Error: the query did not return anything because it did not match with data.')
      res.render('calendar', data)
    })
    .catch(error => next())
})

module.exports = router
