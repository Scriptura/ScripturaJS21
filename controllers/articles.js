'use strict'

const express = require('express'),
      router = express.Router(),
      { getArticles } = require('../models/articles')

router.get('/articles', async (req, res, next) => {
  const data = await getArticles()
    .then(data => {
      //console.log(data)
      if (data === undefined) throw new Error('Error: the query did not return anything because it did not match with data.')
      res.render('articles', {data})
    })
    .catch(error => next())
})

module.exports = router

/*
const express = require('express'),
      router = express.Router(),
      vv = require('../settings/variables')

router.get('/articles', function(req, res, next) {
  res.render('articles', {
    data: {
      _title: 'Articles list | ' + vv.siteName,
      _name: 'Articles <span>list</span>',
      _description: 'Articles list of ' + vv.siteName
    }
  })
})

module.exports = router
*/