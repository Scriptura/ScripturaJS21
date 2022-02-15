'use strict'

const express = require('express'),
      router = express.Router(),
      vv = require('../settings/variables'),
      //argon2 = require('argon2'), // @see https://medium.com/analytics-vidhya/password-hashing-pbkdf2-scrypt-bcrypt-and-argon2-e25aaf41598e
      { postAccount } = require('../models/account')

router.get('/register', (req, res, next) => {
  res.render('register', {
    data: {
    _title: 'Inscription | ' + vv.siteName,
    _name: 'Inscription',
    _description: 'Page d\'enregistrement des utilisateurs'
    }
  })
})

router.post('/register', async (req, res, next) => {
  const data = await postAccount(req.body.username,req.body.password)
    .then(data => {
      //res.send({}) ?
    })
    .catch(error => next())
})

module.exports = router
