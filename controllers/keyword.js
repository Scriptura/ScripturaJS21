'use strict'

const express = require('express'),
      router = express.Router(),
      { getKeyword } = require('../models/keyword')

router.get('/keyword/:slug([a-z\-]{1,50})', async (req, res, next) => {
  const data = await getKeyword(req.params.slug)
    .then(data => {
      if (data === undefined) throw new Error('Error: the query did not return anything because it did not match with data.')
      data._url = req
      res.render('keyword', {data})
    })
    .catch(error => next())
})

module.exports = router
