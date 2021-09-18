'use strict'

const express = require('express'),
      router = express.Router(),
      path = require('path')

router.use(
  '/',
  require(path.join(__dirname, 'index'))
)
router.use(
  '/',
  require(path.join(__dirname, 'article'))
)
router.use(
  '/',
  require(path.join(__dirname, 'person'))
)
router.use(
  '/',
  require(path.join(__dirname, 'user'))
)
router.use(
  '/',
  require(path.join(__dirname, 'place'))
)
router.use(
  '/',
  require(path.join(__dirname, 'login'))
)
router.use(
  '/',
  require(path.join(__dirname, 'register'))
)
router.use(
  '/',
  require(path.join(__dirname, 'calendarMonth'))
)
router.use(
  '/',
  require(path.join(__dirname, 'calendarDay'))
)
router.use(
  '/',
  require(path.join(__dirname, 'calendar'))
)
  router.use(
  '/',
  require(path.join(__dirname, 'styleGuide'))
)

module.exports = router
