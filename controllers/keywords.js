'use strict'

const express = require('express'),
      router = express.Router(),
      { getKeywords } = require('../models/keywords')

router.get('/keywords', async (req, res, next) => {
  const data = await getKeywords()
    .then(data => {
      console.log(data)
      if (data === undefined) throw new Error('Error: the query did not return anything because it did not match with data.')
      res.render('keywords', {data})
    })
    .catch(error => next())
})

module.exports = router
