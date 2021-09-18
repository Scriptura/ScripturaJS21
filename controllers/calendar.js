'use strict'

const express = require('express'),
      router = express.Router(),
      { getCalendar } = require('../models/calendar')

router.get('/calendar', async (req, res, next) => { // GET '/calendar'
  const data = await getCalendar(req.params.year, req.params.month, req.params.day)
    .then(data => {
      //console.log(data)
      if (data === undefined) throw new Error('Error: the query did not return anything because it did not match with data.')
      res.render('calendar', data)
    })
    .catch(error => next())
})

module.exports = router
