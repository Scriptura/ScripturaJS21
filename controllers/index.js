'use strict'

const express = require('express'),
      router = express.Router(),
      vv = require('../settings/variables'),
      os = require('os'),
      ip = require('ip')

router.get('/', (req, res, next) => { // GET home page
  res.render('index', {
    _title: vv.siteName,
    _name: vv.siteName,
    _description: vv.siteName + ', page d\'accueil',
    //_site_url: process.env.PORT,
    _node_version: process.version.replace('v', ''),
    _hostname: os.hostname(),
    _ip: ip.address(),
    _arch: os.arch(),
    _totalmem: os.totalmem() / 1024000000, // Go units
    _release: os.release(),
    _type: os.type(),
    _platform: os.platform(),
    _homedir: os.homedir(),
    _tmpdir: os.tmpdir(),
    _user_os: req.useragent.os,
    _user_platform: req.useragent.platform,
    _user_browser: req.useragent.browser,
    _user_version: req.useragent.version,
  })
})

module.exports = router
