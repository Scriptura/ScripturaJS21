'use strict'

const express = require('express'),
      router = express.Router(),
      { getKeyword } = require('../models/keyword')

router.get('/keyword/lion', async (req, res, next) => {
  const data = await getKeyword()
    .then(data => {
      console.log(data)
      if (data === undefined) throw new Error('Error: the query did not return anything because it did not match with data.')
      res.render('keyword', {data})
    })
    .catch(error => next())
})

module.exports = router
