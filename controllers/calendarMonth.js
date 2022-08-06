'use strict'

const express = require('express'),
      router = express.Router(),
      { getCalendarDay } = require('../models/calendar'),
      { DateTime } = require('luxon')

router.get('/calendar/:year([0-9]{1,4})/:month(0[1-9]|1[0-2])', async (req, res, next) => { // @example '/calendar/YYYY/MM'
  const daysInMonth = DateTime.fromFormat(req.params.year + req.params.month, 'yyyyMM').daysInMonth
  let dateIteration = {}
  for (let i = 1; i < daysInMonth + 1; i++) {
    dateIteration = getCalendarDay(req.params.year, req.params.month, i)
  }
  const data = await dateIteration
    .then(data => {
      console.log(data)
      if (data === undefined) throw new Error('Error: the query did not return anything because it did not match with data.')
      data._url = req
      data._previousPage = '/calendar/' + DateTime.fromFormat(req.params.year + req.params.month + req.params.day, 'yyyyMMdd').minus({days: 1}).toFormat('yyyy/MM/dd')
      data._previousPageInfo = DateTime.fromFormat(req.params.year + req.params.month + req.params.day, 'yyyyMMdd').minus({days: 1}).toFormat('dd/MM/yyyy')
      data._nextPage = '/calendar/' + DateTime.fromFormat(req.params.year + req.params.month + req.params.day, 'yyyyMMdd').plus({days: 1}).toFormat('yyyy/MM/dd')
      data._nextPageInfo = DateTime.fromFormat(req.params.year + req.params.month + req.params.day, 'yyyyMMdd').plus({days: 1}).toFormat('dd/MM/yyyy')
      res.render('calendarMonth', {data})
    })
    .catch(error => next())
})

module.exports = router
