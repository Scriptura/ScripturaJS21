'use strict'

const express = require('express'),
      router = express.Router(),
      { getAccount } = require('../models/account')

router.get('/account/:username([0-9a-zA-Z]{1,20})', async (req, res, next) => { // @example '/user/username'
  const data = await getAccount(req.params.username)
    .then(data => {
      if (data === undefined) throw new Error('Error: the query did not return anything because it did not match with data.')
      res.render('account', {data})
    })
    .catch(error => next())
})

module.exports = router
