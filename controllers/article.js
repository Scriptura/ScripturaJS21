'use strict'

const express = require('express'),
      router = express.Router(),
      { getArticle } = require('../models/article')

router.get('/article/:id([0-9]{1,7})', async (req, res, next) => { // @example '/article/1'
  const data = await getArticle(req.params.id)
  .then(data => {
    //console.log(data)
    if (data === undefined) throw new Error('Error: the query did not return anything because it did not match with data.')
    res.render('article', data)
  })
    .catch(error => next())
})

module.exports = router
