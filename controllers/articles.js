'use strict'

const express = require('express'),
      router = express.Router(),
      { getArticles } = require('../models/articles')

router.get('/articles', async (req, res, next) => {
  const data = await getArticles()
    .then(data => {
      if (data === undefined) throw new Error('Error: the query did not return anything because it did not match with data.')
      data._url = req
      res.render('articles', {data})
    })
    .catch(error => next())
})

module.exports = router
