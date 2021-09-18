'use strict'

const express = require('express'),
      router = express.Router(),
      vv = require('../settings/variables'),
      db = require('../database/db'),
      User = require('../models/user'),
      session = require('express-session'),
      flash = require('connect-flash'),
      passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy

router.use(flash()) // @todo

// @documentation :
// @see https://github.com/jwalton/passport-api-docs
// https://stackoverflow.com/questions/51086775/passportjs-and-user-creation-with-postgres
passport.use(new LocalStrategy(
  function(req, username, password, done) {
    User.getUser({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

router.get('/login', (req, res, next) => {
  res.render('login', {
    _title: 'Login | ' + vv.siteName,
    _description: 'Page de connexion',
    _name: 'Connexion',
  })
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false,
    failureFlash: true,
    //failureFlash: 'Identifiant ou mot de passe invalide.' //'Invalid username or password.',
    //successFlash: 'Welcome!',
  })
)

module.exports = router
